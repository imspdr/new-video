import { FC, useState } from "react";
import { useListPage, ContentFilter } from "./hooks/useListPage";
import { useGridLayout } from "./hooks/useGridLayout";
import { Typography } from "@imspdr/ui";
import VideoCard from "./components/VideoCard";
import FilterBar from "./components/FilterBar";
import EmptyState from "./components/EmptyState";
import { Container, Section, GridContainer, CardWrapper } from "./styled";

interface ListPageProps {
  searchQuery?: string;
}

const ListPage: FC<ListPageProps> = ({ searchQuery = '' }) => {
  const [filter, setFilter] = useState<ContentFilter>("all");
  const { items, isLoading, error } = useListPage(filter, searchQuery);

  // Use the extracted grid layout logic
  const { containerRef, positions, totalHeight } = useGridLayout(items.length);



  if (isLoading) {
    return (
      <Container>
        <Section>
          <EmptyState type="loading" message="컨텐츠를 불러오는 중입니다..." />
        </Section>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Section>
          <EmptyState type="error" message="데이터를 불러오는 중 오류가 발생했습니다." />
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section ref={containerRef}>
        <FilterBar filter={filter} onFilterChange={setFilter} />
        <GridContainer height={totalHeight}>
          {items.map((item, index) => {
            const pos = positions[index];
            if (!pos) return null;

            return (
              <CardWrapper
                key={`${item.type}-${item.id}`}
                top={pos.top}
                left={pos.left}
                width={pos.width}
                height={pos.height}
              >
                <VideoCard
                  id={item.id}
                  title={item.display_title}
                  date={item.unified_date}
                  posterUrl={item.poster_url}
                  youtubeUrl={item.youtube_url}
                  type={item.type}
                  colIndex={pos.colIndex}
                  totalCols={pos.totalCols}
                />
              </CardWrapper>
            );
          })}
        </GridContainer>
        {items.length === 0 && !isLoading && <EmptyState />}
      </Section>
    </Container>
  );
};

export default ListPage;
