import { useNewReleases, Movie, TVSeries } from '../../pages/ListPage/hooks/useNewReleases';
import { useMemo } from 'react';

export const useLatestBanner = () => {
  const { data, isLoading } = useNewReleases();

  const latestItem = useMemo(() => {
    if (!data) return null;

    const allItems = [
      ...data.movies.map(m => ({ ...m, date: m.release_date, displayTitle: m.title })),
      ...data.series.map(s => ({ ...s, date: s.first_air_date, displayTitle: s.name }))
    ];

    if (allItems.length === 0) return null;

    const today = new Date();
    const sorted = allItems
      .filter(item => item.date && new Date(item.date) <= today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return sorted[0] || null;
  }, [data]);

  return {
    latestItem,
    isLoading
  };
};
