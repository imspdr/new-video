import { FC } from "react";
import { ContentFilter } from "../../hooks/useListPage";
import { Container, Button } from "./styled";

interface FilterBarProps {
  filter: ContentFilter;
  onFilterChange: (filter: ContentFilter) => void;
}

const FilterBar: FC<FilterBarProps> = ({ filter, onFilterChange }) => {
  return (
    <Container>
      <Button active={filter === "all"} onClick={() => onFilterChange("all")}>
        전체
      </Button>
      <Button active={filter === "movie"} onClick={() => onFilterChange("movie")}>
        영화
      </Button>
      <Button active={filter === "tv_series"} onClick={() => onFilterChange("tv_series")}>
        시리즈
      </Button>
    </Container>
  );
};

export default FilterBar;
