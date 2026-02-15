import { FC, useState } from "react";
import { useListPage, ContentFilter } from "./hooks/useListPage";
import { useGridLayout } from "../../hooks/useGridLayout";
import { Typography } from "@imspdr/ui";
import VideoCard from "./components/VideoCard";
import FilterBar from "./components/FilterBar";
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
          {items.length === 0 && !isLoading && (
            <Typography variant="body" level={1}>
              표시할 컨텐츠가 없습니다.
            </Typography>
          )}
        </GridContainer>
      </Section>
    </Container>
  );
};

export default ListPage;
