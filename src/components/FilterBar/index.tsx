
import { FC } from 'react';
import { ContentFilter, SortOption } from '../../hooks/useListPage';
import { Container, Group, Button, Separator } from './styled';

interface FilterBarProps {
  filter: ContentFilter;
  onFilterChange: (filter: ContentFilter) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const FilterBar: FC<FilterBarProps> = ({ filter, onFilterChange, sort, onSortChange }) => {
  return (
    <Container>
      <Group>
        <Button active={filter === 'all'} onClick={() => onFilterChange('all')}>
          전체
        </Button>
        <Button active={filter === 'movie'} onClick={() => onFilterChange('movie')}>
          영화
        </Button>
        <Button active={filter === 'tv_series'} onClick={() => onFilterChange('tv_series')}>
          시리즈
        </Button>
      </Group>

      <Separator />

      <Group>
        <Button active={sort === 'date'} onClick={() => onSortChange('date')}>
          최신순
        </Button>
        <Button active={sort === 'rate'} onClick={() => onSortChange('rate')}>
          인기순
        </Button>
      </Group>
    </Container>
  );
};

export default FilterBar;
