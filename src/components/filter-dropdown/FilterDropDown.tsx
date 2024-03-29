import { FC, useState } from 'react';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SetterOrUpdater } from 'recoil';
import { Avatar } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import Filter from '@/components/filter/Filter';
import { ReactComponent as LeftArrowIcon } from '@/assets/toolbar-icons/arrow-left.svg';
import { useFetchEntities } from '@/hooks/useFetchEntities';
import './styles.css';
import { FilterDropdownProps } from './types';

const FilterDropdown: FC<FilterDropdownProps> = ({
  filterQuery,
  setItemList,
  field,
  open,
  anchorEl,
  onApply,
  filterName,
  appliedFilters,
  allFilters,
  checkedFilters,
  setCheckedFilters,
  viewFiltersVerified
}) => {
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const [viewFilter, setViewFilter] = useState<number>(0);

  const handleClose = () => {
    onApply(appliedFilters.reduce((sum, allFilters) => sum + allFilters.length, 0));
    setViewFilter(0);
  };

  const onAddFilter = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
    checkedItems: string[],
    setCheckedItems: SetterOrUpdater<string[]>
  ) => {
    const isChecked = e.target.checked;

    if (isChecked) setCheckedItems(checkedItems.concat(name));
    else setCheckedItems(checkedItems.filter((x) => x !== name));
  };

  const { fetch } = useFetchEntities({
    userParams: { setList: setItemList, query: filterQuery, field: field }
  });

  const handleCheckedItems = (item: string, checkedItems: string[]) => {
    if (checkedItems.includes(item)) return true;
    else return false;
  };

  const handleClearAll = () => {
    if (noFiltersApplied) return;
    if (setCheckedFilters)
      setCheckedFilters.forEach((setFilter: SetterOrUpdater<string[]>) => {
        setFilter([]);
      });
  };

  const handleCancel = () => {
    if (setCheckedFilters)
      setCheckedFilters.forEach((setFilter: SetterOrUpdater<string[]>, index: number) => {
        setFilter(appliedFilters[index]);
      });

    handleClose();
  };

  const getFilterCount = () => {
    return checkedFilters.reduce((sum, filter) => sum + filter.length, 0);
  };

  const handleSave = () => {
    onApply(getFilterCount());
    fetch({});
    setViewFilter(0);
  };

  const noFiltersApplied = getFilterCount() === 0;

  return (
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={handleClose}
      sx={{ minHeight: '100%' }}
      PaperProps={{
        elevation: 0,
        sx: {
          '&:before': {
            visibility: isPortrait ? 'hidden' : 'visible'
          },
          marginTop: '10px'
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <div className='filter'>
        <div className='filter-by'>
          <div style={{ position: 'fixed' }}>
            <MenuItem id='heading-clear-all' disableRipple>
              <div id='filter-heading'>Filters</div>
              <Avatar
                id='filter-avatar'
                sx={{
                  ml: '10px !important',
                  mr: '112px'
                }}
              >
                {getFilterCount()}
              </Avatar>
              <div
                id='clear-all'
                role='button'
                tabIndex={0}
                onClick={handleClearAll}
                className={noFiltersApplied ? 'disabled' : ''}
              >
                Clear All
              </div>
            </MenuItem>
            {filterName.map(
              (filter: string, index: number) =>
                viewFiltersVerified[index] && (
                  <MenuItem
                    key={filter}
                    id='filter-by-options'
                    onClick={() => {
                      setViewFilter(index);
                    }}
                  >
                    <div>{filterName[index]}</div>
                    <div id='avatar-arrow'>
                      <Avatar
                        id='filter-avatar'
                        sx={{
                          mr: '12px !important'
                        }}
                      >
                        {(checkedFilters[index] as unknown as never[]).length}
                      </Avatar>
                      <LeftArrowIcon />
                    </div>
                  </MenuItem>
                )
            )}
          </div>
          <div style={{ position: 'fixed', top: '382px' }}>
            <MenuItem disableRipple id='filter-buttons'>
              <Button id='filter-button-cancel' onClick={handleCancel}>
                Cancel
              </Button>
              <Button disabled={getFilterCount() === 0} id='filter-button-apply' onClick={handleSave}>
                Apply
              </Button>
            </MenuItem>
          </div>
        </div>
        <div id='filter-items'>
          <Filter
            itemList={allFilters[viewFilter]}
            checkedItems={checkedFilters[viewFilter]}
            handleCheckedItems={handleCheckedItems}
            setCheckedItems={setCheckedFilters[viewFilter]}
            onAddFilter={onAddFilter}
          />
        </div>
      </div>
    </Menu>
  );
};

export default FilterDropdown;
