import requests
import json
import os
import time
import re
import firebase_admin
from datetime import datetime, timedelta
from firebase_admin import credentials, firestore

def contains_korean(text):
    if not text:
        return False
    return bool(re.search('[가-힣]', text))

def get_api_key():
    # Check environment variable first (for GitHub Actions)
    if os.environ.get('TMDB_KEY'):
        return os.environ.get('TMDB_KEY')
        
    config_path = os.path.join(os.path.dirname(__file__), 'tmdb_config')
    try:
        with open(config_path, 'r') as f:
            return f.read().strip()
    except FileNotFoundError:
        print(f"Error: Config file not found at {config_path}")
        return None

def fetch_data(api_key, endpoint, params=None):
    if params is None:
        params = {}
    base_url = "https://api.themoviedb.org/3"
    url = f"{base_url}{endpoint}"
    
    default_params = {
        "api_key": api_key,
        "language": "ko-KR",
        "page": 1
    }
    default_params.update(params)
    
    try:
        response = requests.get(url, params=default_params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {endpoint}: {e}")
        return None

def fetch_video(api_key, media_type, media_id):
    endpoint = f"/{media_type}/{media_id}/videos"
    
    # Try fetching with Korean language preference first
    data = fetch_data(api_key, endpoint, params={"language": "ko-KR"})
    results = data.get('results', []) if data else []
    
    # If no results in Korean, try English
    if not results:
         data = fetch_data(api_key, endpoint, params={"language": "en-US"})
         results = data.get('results', []) if data else []

    if not results:
        return None

    # Helper to score videos based on relevance
    def score_video(video):
        score = 0
        if video['site'] != 'YouTube':
            return -100 
        
        # Prefer Korean if we found it (though if we fell back to EN, this check is moot but safe)
        if video.get('iso_639_1') == 'ko':
            score += 10
        elif video.get('iso_639_1') == 'en':
            score += 5
            
        v_type = video.get('type', '')
        if v_type == 'Trailer':
            score += 3
        elif v_type == 'Teaser':
            score += 2
        elif v_type == 'Clip':
            score += 0 # Lowest priority but acceptable
        else:
            score -= 1 # Other types like "Featurette"
            
        return score

    # Filter out non-YouTube candidates basically
    candidates = [v for v in results if v['site'] == 'YouTube']
    if not candidates:
        return None
        
    # Sort by score descending
    candidates.sort(key=score_video, reverse=True)
    
    best_video = candidates[0]
    
    # Construct URL
    return f"https://www.youtube.com/watch?v={best_video['key']}"

def save_to_firestore(data):
    print("Saving data to Firestore...")
    try:
        # Path to service account key
        cred_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
        
        if not os.path.exists(cred_path):
            print(f"Error: serviceAccountKey.json not found at {cred_path}")
            return False

        cred = credentials.Certificate(cred_path)
        
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        
        db = firestore.client()
        
        # Save movies list to a single document
        movies = data.get('movies', [])
        db.collection('new_releases').document('movies').set({'items': movies})

        # Save series list to a single document
        series = data.get('series', [])
        db.collection('new_releases').document('tv_series').set({'items': series})
            
        print(f"Successfully saved {len(movies)} movies and {len(series)} series to Firestore (new_releases collection).")
        return True

    except Exception as e:
        print(f"Error saving to Firestore: {e}")
        return False

def main():
    api_key = get_api_key()
    if not api_key:
        return

    print("Fetching data from TMDB (Korean Locale)...")

    image_base_url = "https://image.tmdb.org/t/p/w500"
    
    # Calculate date range for "Recent" releases (e.g., last 2 months)
    today = datetime.now()
    two_months_ago = today - timedelta(days=60)
    
    date_gte = two_months_ago.strftime('%Y-%m-%d')
    date_lte = today.strftime('%Y-%m-%d')

    print(f"Fetching content available in Korea (Theaters & OTT)...")

    # Fetch movies in theaters in Korea (Now Playing)
    movie_params = {
        "region": "KR",
        "language": "ko-KR"
    }
    
    movies_list = []
    print("Fetching up to 100 movies from theaters...")
    
    for page in range(1, 6):
        movie_params["page"] = page
        movies_data = fetch_data(api_key, "/movie/now_playing", params=movie_params)
        
        if movies_data and 'results' in movies_data:
            print(f"  Processing Movie Page {page}/5 (Found {len(movies_data['results'])} items)...")
            for item in movies_data['results']:
                # STRICT FILTERS:
                # 1. Must have Korean title
                if not contains_korean(item.get('title')):
                    continue
                # 2. Must have Korean overview (description)
                if not contains_korean(item.get('overview')):
                    continue
                # 3. Must have a poster image
                if not item.get('poster_path'):
                    continue

                video_url = fetch_video(api_key, "movie", item['id'])
                # 4. Must have a valid YouTube URL (Trailer/Teaser)
                if not video_url:
                    continue
                
                poster_url = f"{image_base_url}{item['poster_path']}"
                
                movies_list.append({
                    'id': item['id'],
                    'title': item['title'],
                    'release_date': item.get('release_date', 'N/A'),
                    'overview': item['overview'],
                    'type': 'movie',

                    'poster_url': poster_url,
                    'youtube_url': video_url
                })
                time.sleep(0.05) # Rate limiting

    
    # Fetch TV Series available on OTT in Korea (newly released)
    # using discover with watch_region and monetization types
    tv_params = {
        "watch_region": "KR",
        "with_watch_monetization_types": "flatrate", # Stream/Subscription
        "first_air_date.gte": date_gte,
        "first_air_date.lte": date_lte,
        "sort_by": "popularity.desc",
        "language": "ko-KR"
    }

    series_list = []
    print("Fetching up to 100 OTT series in Korea...")

    for page in range(1, 6):
        tv_params["page"] = page
        series_data = fetch_data(api_key, "/discover/tv", params=tv_params)
        
        if series_data and 'results' in series_data:
            print(f"  Processing Series Page {page}/5 (Found {len(series_data['results'])} items)...")
            for item in series_data['results']:
                 # STRICT FILTERS:
                 # 1. Must have Korean name
                 if not contains_korean(item.get('name')):
                    continue
                 # 2. Must have Korean overview
                 if not contains_korean(item.get('overview')):
                    continue
                 # 3. Must have poster
                 if not item.get('poster_path'):
                    continue

                 video_url = fetch_video(api_key, "tv", item['id'])
                 # 4. Must have valid YouTube URL
                 if not video_url:
                    continue

                 poster_url = f"{image_base_url}{item['poster_path']}"

                 series_list.append({
                    'id': item['id'],
                    'name': item['name'],
                    'first_air_date': item.get('first_air_date', 'N/A'),
                    'overview': item['overview'],
                    'type': 'tv_series',

                    'poster_url': poster_url,
                    'youtube_url': video_url
                })
                 time.sleep(0.05) # Rate limiting

    # Combine and save
    all_data = {
        'movies': movies_list,
        'series': series_list
    }
    
    # output_file = os.path.join(os.path.dirname(__file__), 'new_releases.json')
    # try:
    #     with open(output_file, 'w', encoding='utf-8') as f:
    #         json.dump(all_data, f, indent=4, ensure_ascii=False)
    #     print(f"Successfully saved data to {output_file}")
    #     print(f"Collected {len(movies_list)} movies and {len(series_list)} series.")
    # except IOError as e:
    #     print(f"Error saving data to file: {e}")
    #     return

    # Call upload
    save_to_firestore(all_data)

if __name__ == "__main__":
    main()
