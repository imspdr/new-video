
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  type: 'movie';
  poster_url: string | null;
  youtube_url: string | null;
}

export interface TVSeries {
  id: number;
  name: string;
  first_air_date: string;
  overview: string;
  type: 'tv_series';
  poster_url: string | null;
  youtube_url: string | null;
}

export interface NewReleasesData {
  movies: Movie[];
  series: TVSeries[];
}

const STORAGE_URL = "https://firebasestorage.googleapis.com/v0/b/new-video-71a5e.firebasestorage.app/o/new_releases.json?alt=media";

export const useNewReleases = () => {
  return useQuery<NewReleasesData>({
    queryKey: ['newReleases'],
    queryFn: async () => {
      const response = await axios.get(STORAGE_URL);
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
