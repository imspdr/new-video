import { FC, useState } from "react";
import { useListPage, ContentFilter, SortOption } from "../../hooks/useListPage";
import { Typography } from "@imspdr/ui";
import VideoCard from "../../components/VideoCard";
import FilterBar from "../../components/FilterBar";
import { Container, Section, Grid } from "./styled";

const ListPage: FC = () => {
  const [filter, setFilter] = useState<ContentFilter>('all');
  const [sort, setSort] = useState<SortOption>('date');
  const { items, isLoading, error } = useListPage(filter, sort);

  if (isLoading) {
    return (
      <Container>
        <Typography variant="body" level={1}>
          로딩 중...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body" level={1}>
          데이터를 불러오는 중 오류가 발생했습니다.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Section>
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
        />
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
              rating={item.vote_average}
            />
          ))}
          {items.length === 0 && (
            <Typography variant="body" level={1}>
              표시할 컨텐츠가 없습니다.
            </Typography>
          )}
        </Grid>
      </Section>
    </Container>
  );
};

export default ListPage;
