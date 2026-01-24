import { FC } from 'react';
import { useNewReleases } from '../../hooks/useNewReleases';
import { Typography } from '@imspdr/ui';
import {
  Container,
  Section,
  SectionHeader,
  Grid,
  Card,
  PosterImage,
  CardContent,
  DateText
} from './styled';

const ListPage: FC = () => {
  const { data, isLoading, error } = useNewReleases();

  if (isLoading) {
    return (
      <Container>
        <Typography variant="body" level={1}>로딩 중...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body" level={1}>데이터를 불러오는 중 오류가 발생했습니다.</Typography>
      </Container>
    );
  }

  const handleCardClick = (url: string | null) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Container>
      <Section>
        <SectionHeader>
          <Typography variant="title" level={1}>최신 영화</Typography>
        </SectionHeader>
        <Grid>
          {data?.movies.map((movie) => (
            <Card key={movie.id} onClick={() => handleCardClick(movie.youtube_url)}>
              <PosterImage
                src={movie.poster_url || 'https://via.placeholder.com/500x750?text=No+Poster'}
                alt={movie.title}
                loading="lazy"
              />
              <CardContent>
                <Typography variant="body" level={1} weight="medium">
                  {movie.title}
                </Typography>
                <DateText>{movie.release_date}</DateText>
                {/* <Typography variant="caption" level={1} color="fg2" style={{lineClamp: 2}}>
                  {movie.overview}
                </Typography> */}
              </CardContent>
            </Card>
          ))}
          {data?.movies.length === 0 && (
            <Typography variant="body" level={1}>표시할 영화가 없습니다.</Typography>
          )}
        </Grid>
      </Section>

      <Section>
        <SectionHeader>
          <Typography variant="title" level={1}>최신 OTT 시리즈</Typography>
        </SectionHeader>
        <Grid>
          {data?.series.map((series) => (
            <Card key={series.id} onClick={() => handleCardClick(series.youtube_url)}>
              <PosterImage
                src={series.poster_url || 'https://via.placeholder.com/500x750?text=No+Poster'}
                alt={series.name}
                loading="lazy"
              />
              <CardContent>
                <Typography variant="body" level={1} weight="medium">
                  {series.name}
                </Typography>
                <DateText>{series.first_air_date}</DateText>
              </CardContent>
            </Card>
          ))}
          {data?.series.length === 0 && (
            <Typography variant="body" level={1}>표시할 시리즈가 없습니다.</Typography>
          )}
        </Grid>
      </Section>
    </Container>
  );
};

export default ListPage;
