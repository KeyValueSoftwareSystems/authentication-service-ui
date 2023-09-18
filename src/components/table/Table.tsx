import { DataGrid } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';

import { UserPermissionsAtom } from '@/states/permissionsStates';
import { TableProps } from './types';
import TableToolBar from '../table-toolbar/TableToolBar';
import './styles.css';
import DisplayMessage from '../display-message';
import { sortCountAtom, searchAtom, paginationAtom } from '@/states/searchSortFilterStates';
import { useFetchEntities } from '@/hooks/useFetchEntities';
import { PAGE_SIZE, ROWS_PER_PAGE_OPTION } from '@/constants/table';
import { ACCESS_DENIED_DESCRIPTION, ACCESS_DENIED_MESSAGE } from '@/constants/messages';
import CustomPagination from '@/components/custom-pagination';
import { getFinalColumns } from '@/utils/table';
import { Permission } from '@/types/permission';
import DataContext from './DataContext';

const TableList: FC<TableProps> = ({
  field,
  rows,
  columns,
  count,
  filterName,
  setItemList,
  onAdd,
  onEdit,
  buttonLabel,
  searchLabel,
  deleteMutation,
  refetchQuery,
  editPermission,
  deletePermission,
  isViewVerified,
  isAddVerified,
  handleRowClick,
  appliedFilters,
  allFilters,
  checkedFilters,
  setCheckedFilters,
  viewFiltersVerified,
  handleClickFilter
}) => {
  const [isEditVerified, setEditVerified] = useState(false);
  const [isDeleteVerified, setDeleteVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userPermissions] = useRecoilState(UserPermissionsAtom);
  const setCount = useSetRecoilState(sortCountAtom);
  const setSearchValue = useSetRecoilState(searchAtom);

  const setCurrentPage = useSetRecoilState(paginationAtom);

  const { fetch } = useFetchEntities({
    userParams: { setList: setItemList, query: refetchQuery, field: field }
  });

  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  useEffect(() => {
    if (userPermissions)
      userPermissions.forEach((item: Permission) => {
        if (editPermission && item?.name.includes(editPermission)) setEditVerified(true);

        if (deletePermission && item?.name.includes(deletePermission)) setDeleteVerified(true);
      });
  }, [editPermission, deletePermission, userPermissions]);

  useEffect(() => {
    return () => {
      setCurrentPage(1);
      setCount(0);
      setSearchValue('');
    }; // eslint-disable-next-line
  }, []);

  return (
    <DataContext.Provider value={{ setLoading }}>
      <div className='table-component'>
        {isViewVerified ? (
          <>
            <TableToolBar
              buttonLabel={buttonLabel}
              searchLabel={searchLabel}
              setItemList={setItemList}
              searchQuery={refetchQuery}
              isAddVerified={isAddVerified}
              onAdd={onAdd}
              field={field}
              filterName={filterName}
              handleClickFilter={handleClickFilter}
              appliedFilters={appliedFilters}
              allFilters={allFilters}
              checkedFilters={checkedFilters}
              setCheckedFilters={setCheckedFilters}
              viewFiltersVerified={viewFiltersVerified}
            />
            <DataGrid
              columnVisibilityModel={{
                groups: isPortrait ? false : true
              }}
              rows={rows}
              columns={getFinalColumns(
                field,
                columns,
                deleteMutation,
                buttonLabel,
                isDeleteVerified,
                isEditVerified,
                onEdit,
                refetchQuery,
                fetch
              )}
              sx={{
                borderRadius: '0px 0px 5px 5px',
                cursor: field === 'name' ? 'default' : 'pointer'
              }}
              disableSelectionOnClick
              onRowClick={handleRowClick}
              disableColumnMenu
              pageSize={PAGE_SIZE}
              loading={loading}
              rowsPerPageOptions={ROWS_PER_PAGE_OPTION}
              components={{
                Pagination: () => <CustomPagination fetchEntities={fetch} count={count} />,
                NoRowsOverlay: () => (
                  <Stack height='100%' alignItems='center' justifyContent='center'>
                    No {buttonLabel.slice(3, buttonLabel.length).toLowerCase()}s to show
                  </Stack>
                ),
                LoadingOverlay: () => (
                  <CircularProgress
                    sx={{
                      top: '30%',
                      left: '50%',
                      zIndex: 9999
                    }}
                  />
                )
              }}
            />
          </>
        ) : (
          <DisplayMessage
            altMessage={ACCESS_DENIED_MESSAGE}
            image='./assets/access-denied.png'
            heading={ACCESS_DENIED_MESSAGE}
            description={ACCESS_DENIED_DESCRIPTION}
          />
        )}
      </div>
    </DataContext.Provider>
  );
};

export default TableList;
