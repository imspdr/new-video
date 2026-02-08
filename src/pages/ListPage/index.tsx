import { FC, useState, useEffect, useRef, useMemo } from "react";
import { useListPage, ContentFilter } from "../../hooks/useListPage";
import { Typography } from "@imspdr/ui";
import VideoCard from "../../components/VideoCard";
import FilterBar from "../../components/FilterBar";
import { Container, Section, GridContainer, CardWrapper } from "./styled";

const ListPage: FC = () => {
  const [filter, setFilter] = useState<ContentFilter>("all");
  const { items, isLoading, error } = useListPage(filter);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isLoading]);

  // Layout calculations
  const layout = useMemo(() => {
    if (containerWidth === 0 || items.length === 0) return { positions: [], totalHeight: 0 };

    const isMobile = window.innerWidth < 768;
    const minCardWidth = isMobile ? 160 : 220;
    const columns = Math.max(1, Math.floor(containerWidth / minCardWidth));
    const cardWidth = containerWidth / columns;
    const cardHeight = (cardWidth * 1.5); // Poster ratio only, no extra bottom height

    const positions = items.map((_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      return {
        top: row * cardHeight,
        left: col * cardWidth,
        width: cardWidth,
        height: cardHeight,
        colIndex: col,
        totalCols: columns,
      };
    });

    const totalRows = Math.ceil(items.length / columns);
    return { positions, totalHeight: totalRows * cardHeight };
  }, [containerWidth, items.length]);

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
        <GridContainer height={layout.totalHeight}>
          {items.map((item, index) => {
            const pos = (layout.positions as any)[index];
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
        {items.length === 0 && (
          <Typography variant="body" level={1}>
            표시할 컨텐츠가 없습니다.
          </Typography>
        )}
      </Section>
    </Container>
  );
};

export default ListPage;
