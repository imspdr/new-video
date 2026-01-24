import requests
import json
import os
import time
import re
import firebase_admin
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

def fetch_data(api_key, endpoint, language="ko-KR"):
    base_url = "https://api.themoviedb.org/3"
    url = f"{base_url}{endpoint}"
    params = {
        "api_key": api_key,
        "language": language,
        "page": 1
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {endpoint}: {e}")
        return None

def fetch_video(api_key, media_type, media_id):
    endpoint = f"/{media_type}/{media_id}/videos"
    
    # Try fetching with Korean language preference first
    data = fetch_data(api_key, endpoint, language="ko-KR")
    results = data.get('results', []) if data else []
    
    # If no results in Korean, try English
    if not results:
         data = fetch_data(api_key, endpoint, language="en-US")
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

    # Fetch newly released movies (Now Playing)
    movies_data = fetch_data(api_key, "/movie/now_playing", language="ko-KR")
    movies_list = []
    if movies_data and 'results' in movies_data:
        print(f"Found {len(movies_data['results'])} movies. Processing details...")
        for item in movies_data['results']:
            if not contains_korean(item.get('title')) or not contains_korean(item.get('overview')):
                continue

            video_url = fetch_video(api_key, "movie", item['id'])
            poster_url = f"{image_base_url}{item['poster_path']}" if item.get('poster_path') else None
            
            movies_list.append({
                'id': item['id'],
                'title': item['title'],
                'release_date': item['release_date'],
                'overview': item['overview'],
                'type': 'movie',
                'poster_url': poster_url,
                'youtube_url': video_url
            })
            # Be nice to the API rate limit if necessary, though TMDB is generous.
            # time.sleep(0.1) 
    
    # Fetch OTT series (On The Air)
    series_data = fetch_data(api_key, "/tv/on_the_air", language="ko-KR")
    series_list = []
    if series_data and 'results' in series_data:
        print(f"Found {len(series_data['results'])} series. Processing details...")
        for item in series_data['results']:
             if not contains_korean(item.get('name')) or not contains_korean(item.get('overview')):
                continue

             video_url = fetch_video(api_key, "tv", item['id'])
             poster_url = f"{image_base_url}{item['poster_path']}" if item.get('poster_path') else None

             series_list.append({
                'id': item['id'],
                'name': item['name'],
                'first_air_date': item.get('first_air_date', 'N/A'),
                'overview': item['overview'],
                'type': 'tv_series',
                'poster_url': poster_url,
                'youtube_url': video_url
            })

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
