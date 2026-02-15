
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  type: 'movie';
  vote_average: number;
  poster_url: string | null;
  youtube_url: string | null;
}

export interface TVSeries {
  id: number;
  name: string;
  first_air_date: string;
  overview: string;
  type: 'tv_series';
  vote_average: number;
  poster_url: string | null;
  youtube_url: string | null;
}

export interface NewReleasesData {
  movies: Movie[];
  series: TVSeries[];
}

const fetchList = async (docId: string) => {
  const docRef = doc(db, 'new_releases', docId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? (snapshot.data().items as any[]) : [];
};

export const useNewReleases = () => {
  return useQuery<NewReleasesData>({
    queryKey: ['newReleases'],
    queryFn: async () => {
      const [movies, series] = await Promise.all([
        fetchList('movies'),
        fetchList('tv_series')
      ]);

      return {
        movies: movies as Movie[],
        series: series as TVSeries[]
      };
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
