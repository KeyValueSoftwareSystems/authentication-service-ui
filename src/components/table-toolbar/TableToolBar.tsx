import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { FC, useState } from 'react';
import { Avatar } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import { ReactComponent as PlusIcon } from '@/assets/button-icons/plus.svg';
import { ReactComponent as SortIcon } from '@/assets/toolbar-icons/sort.svg';
import { ReactComponent as FilterIcon } from '@/assets/toolbar-icons/filter.svg';
import { sortCountAtom } from '@/states/searchSortFilterStates';
import { useFetchEntities } from '@/hooks/useFetchEntities';
import SearchBar from '@/components/search-bar/SearchBar';
import FilterDropdown from '@/components/filter-dropdown';
import { ADD_FILTER, SORT_BY_NAME } from '@/constants/messages';
import { TableToolBarProps } from './types';
import './styles.css';

const TableToolBar: FC<TableToolBarProps> = ({
  field,
  filterName,
  searchLabel,
  buttonLabel,
  setItemList,
  searchQuery,
  isAddVerified,
  onAdd,
  appliedFilters,
  allFilters,
  checkedFilters,
  setCheckedFilters,
  viewFiltersVerified,
  handleClickFilter
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [filter, setFilter] = useState(0);
  const [count, setCount] = useRecoilState(sortCountAtom);
  const onApply = (count: number) => {
    setFilter(count);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (handleClickFilter) handleClickFilter(event, setAnchorEl);
  };

  const isPortrait = useMediaQuery({ query: '(max-width: 980px)' });

  const { fetch } = useFetchEntities({
    userParams: { setList: setItemList, query: searchQuery, field: field }
  });

  const onSort = () => {
    const countValue = count === 0 ? 1 : count === 1 ? 2 : 0;

    setCount(countValue);
    fetch({ countValue: countValue });
  };

  return (
    <div className='table-toolbar'>
      <div className='search-sort-filter'>
        <SearchBar searchLabel={searchLabel} setItemList={setItemList} searchQuery={searchQuery} />
        <div className={count > 0 ? 'sort-button-enabled' : 'sort-button'} role='button' tabIndex={0} onClick={onSort}>
          <SortIcon id={count > 0 ? 'sort-icon-enabled' : 'sort-filter-icon'} />
          {!isPortrait && SORT_BY_NAME}
        </div>

        {field === 'firstName' && (
          <div
            className={`filter${filter > 0 ? '-count' : '-button'}`}
            role='button'
            tabIndex={0}
            onClick={handleClick}
          >
            <FilterIcon id='sort-filter-icon' />
            {!isPortrait && ADD_FILTER}
            {filter > 0 && (
              <Avatar
                sx={{
                  ml: '10px !important',
                  backgroundColor: '#2653F1',
                  color: 'white',
                  width: '20px !important',
                  height: '20px !important',
                  fontSize: '12px !important'
                }}
              >
                {filter}
              </Avatar>
            )}
          </div>
        )}
      </div>
      {!isAddVerified && (
        <div className='toolbar-button' data-testid='toolbar-button-test-id'>
          <Button
            variant='contained'
            id='add-button'
            onClick={onAdd}
            sx={{ textTransform: 'none' }}
            data-testid='toolbar-button'
          >
            <PlusIcon />
            {buttonLabel}
          </Button>
        </div>
      )}
      {allFilters && (
        <FilterDropdown
          field={field}
          filterQuery={searchQuery}
          setItemList={setItemList}
          open={open}
          anchorEl={anchorEl}
          onApply={onApply}
          filterName={filterName ?? []}
          allFilters={allFilters}
          appliedFilters={appliedFilters ?? []}
          checkedFilters={checkedFilters ?? []}
          setCheckedFilters={setCheckedFilters ?? []}
          viewFiltersVerified={viewFiltersVerified ?? []}
        />
      )}
    </div>
  );
};

export default TableToolBar;
