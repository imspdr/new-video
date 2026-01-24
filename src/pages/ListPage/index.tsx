import { FC } from 'react';
import { useListPage } from '../../hooks/useListPage';
import { Typography } from '@imspdr/ui';
import VideoCard from '../../components/VideoCard';
import {
  Container,
  Section,
  SectionHeader,
  Grid
} from './styled';

const ListPage: FC = () => {
  const { items, isLoading, error } = useListPage();

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

  return (
    <Container>
      <Section>
        <SectionHeader>
          <Typography variant="title" level={1}>최신작</Typography>
        </SectionHeader>
        <Grid>
          {items.map((item) => (
            <VideoCard
              key={`${item.type}-${item.id}`}
              id={item.id}
              title={item.display_title}
              date={item.unified_date}
              posterUrl={item.poster_url}
              youtubeUrl={item.youtube_url}
              type={item.type}
            />
          ))}
          {items.length === 0 && (
            <Typography variant="body" level={1}>표시할 컨텐츠가 없습니다.</Typography>
          )}
        </Grid>
      </Section>
    </Container>
  );
};

export default ListPage;
