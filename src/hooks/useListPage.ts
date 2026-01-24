
import { useMemo } from 'react';
import { useNewReleases } from './useNewReleases';

export interface VideoItem {
  id: number;
  display_title: string;
  unified_date: string;
  poster_url: string | null;
  youtube_url: string | null;
  type: 'movie' | 'tv_series';
}

export const useListPage = () => {
  const { data, isLoading, error } = useNewReleases();

  const items: VideoItem[] = useMemo(() => {
    if (!data) return [];

    const movies = data.movies.map(m => ({
      id: m.id,
      display_title: m.title,
      unified_date: m.release_date,
      poster_url: m.poster_url,
      youtube_url: m.youtube_url,
      type: 'movie' as const
    }));

    const series = data.series.map(s => ({
      id: s.id,
      display_title: s.name,
      unified_date: s.first_air_date,
      poster_url: s.poster_url,
      youtube_url: s.youtube_url,
      type: 'tv_series' as const
    }));

    return [...movies, ...series].sort((a, b) => {
      const dateA = new Date(a.unified_date || 0).getTime();
      const dateB = new Date(b.unified_date || 0).getTime();
      return dateB - dateA;
    });
  }, [data]);

  return {
    items,
    isLoading,
    error
  };
};
