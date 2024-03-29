import { DocumentNode } from '@apollo/client';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { FilterConditions, SortDirection } from '@/services/constants';
import { PAGE_SIZE } from '@/constants/table';
import {
  groupFilterAtom,
  searchAtom,
  sortCountAtom,
  statusFilterAtom,
  paginationAtom
} from '@/states/searchSortFilterStates';
import { useCustomLazyQuery } from './useLazyQuery';

interface userParamsProps {
  setList: SetterOrUpdater<never[]>;
  query: DocumentNode;
  field?: string;
}

interface usersFetchProps {
  userParams: userParamsProps;
}

interface ApiParams {
  searchText?: string | null;
  countValue?: number;
  page?: number | null;
}
export const useFetchEntities = (usersFetchProps: usersFetchProps) => {
  const [searchValue] = useRecoilState(searchAtom);
  const [checkedStatus] = useRecoilState(statusFilterAtom);
  const [checkedGroups] = useRecoilState(groupFilterAtom);
  const [count] = useRecoilState(sortCountAtom);
  const setCurrentPage = useSetRecoilState(paginationAtom);

  const onCompleted = (data: any) => {
    usersFetchProps.userParams.setList(data);
  };

  const { lazyQuery: filterQuery, loading } = useCustomLazyQuery(usersFetchProps.userParams.query, onCompleted);

  const fetchEntities = ({ searchText = null, countValue = 0, page = null }: ApiParams) => {
    let search = {};

    if ((searchValue && searchValue.length !== 0) || (searchText && searchText?.length !== 0)) {
      const searchParams = searchText ?? searchValue;

      if (usersFetchProps.userParams.field === 'name') search = { or: { name: { contains: searchParams } } };
      else
        search = {
          or: {
            firstName: { contains: searchParams },
            middleName: { contains: searchParams },
            lastName: { contains: searchParams },
            email: { contains: searchParams }
          }
        };
    }
    let sort = {};

    if (countValue !== 0) {
      const countParams = countValue !== 0 ? countValue : count;
      const direction = {
        field: usersFetchProps.userParams.field,
        direction: countParams === 1 ? SortDirection.DESC : SortDirection.ASC
      };

      sort = { ...sort, ...direction };
    }

    const operands: Array<{
      condition: FilterConditions;
      field: string;
      value: string[];
    }> = [];

    if (checkedStatus.length > 0) {
      const status = {
        condition: FilterConditions.IN,
        field: 'status',
        value: checkedStatus
      };

      operands.push(status);
    }
    if (checkedGroups.length > 0) {
      const groups = {
        condition: FilterConditions.IN,
        field: 'group',
        value: checkedGroups
      };

      operands.push(groups);
    }

    let variables = {};

    if (Object.keys(sort).length > 0) variables = { sort: sort };

    if (Object.keys(operands).length > 0) variables = { ...variables, filter: { operands: operands } };

    if (Object.keys(search).length > 0) variables = { ...variables, search: search };

    if (page === null) setCurrentPage(1);
    variables = {
      ...variables,
      pagination: { offset: page ? page * PAGE_SIZE : 0, limit: PAGE_SIZE }
    };

    filterQuery({ variables: variables });
  };

  return {
    fetch: fetchEntities,
    loading: loading
  };
};
