
import { useMemo } from 'react';
import { useNewReleases } from './useNewReleases';

export interface VideoItem {
  id: number;
  display_title: string;
  unified_date: string;
  poster_url: string | null;
  youtube_url: string | null;
  type: 'movie' | 'tv_series';
  vote_average: number;
}

export type ContentFilter = 'all' | 'movie' | 'tv_series';
export type SortOption = 'date' | 'rate';

export const useListPage = (filter: ContentFilter = 'all', sort: SortOption = 'date') => {
  const { data, isLoading, error } = useNewReleases();

  const items: VideoItem[] = useMemo(() => {
    if (!data) return [];

    const movies = data.movies.map(m => ({
      id: m.id,
      display_title: m.title,
      unified_date: m.release_date,
      poster_url: m.poster_url,
      youtube_url: m.youtube_url,
      type: 'movie' as const,
      vote_average: m.vote_average
    }));

    const series = data.series.map(s => ({
      id: s.id,
      display_title: s.name,
      unified_date: s.first_air_date,
      poster_url: s.poster_url,
      youtube_url: s.youtube_url,
      type: 'tv_series' as const,
      vote_average: s.vote_average
    }));

    return [...movies, ...series];
  }, [data]);

  const filteredAndSortedItems = useMemo(() => {
    let result = items;

    // Filter
    if (filter !== 'all') {
      result = result.filter(item => item.type === filter);
    }

    // Sort
    return result.sort((a, b) => {
      if (sort === 'rate') {
        return b.vote_average - a.vote_average;
      }
      // Default: date descending
      const dateA = new Date(a.unified_date || 0).getTime();
      const dateB = new Date(b.unified_date || 0).getTime();
      return dateB - dateA;
    });
  }, [items, filter, sort]);

  return {
    items: filteredAndSortedItems,
    allCount: items.length,
    isLoading,
    error
  };
};
