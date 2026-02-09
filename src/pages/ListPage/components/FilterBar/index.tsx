import { FC } from "react";
import { ContentFilter } from "../../../../hooks/useListPage";
import { Button } from "@imspdr/ui";
import { Container } from "./styled";

interface FilterBarProps {
  filter: ContentFilter;
  onFilterChange: (filter: ContentFilter) => void;
}

const FilterBar: FC<FilterBarProps> = ({ filter, onFilterChange }) => {
  return (
    <Container>
      <Button
        variant={filter === "all" ? "contained" : "outlined"}
        color="primary.1"
        onClick={() => onFilterChange("all")}
        size="sm"
        shape="rounded"
      >
        전체
      </Button>
      <Button
        variant={filter === "movie" ? "contained" : "outlined"}
        color="primary.1"
        onClick={() => onFilterChange("movie")}
        size="sm"
        shape="rounded"
      >
        영화
      </Button>
      <Button
        variant={filter === "tv_series" ? "contained" : "outlined"}
        color="primary.1"
        onClick={() => onFilterChange("tv_series")}
        size="sm"
        shape="rounded"
      >
        시리즈
      </Button>
    </Container>
  );
};

export default FilterBar;
