import {
  useQuery,
  ApolloError,
  useLazyQuery,
  DocumentNode,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { GET_USERS } from "../containers/users/services/queries";
import { FilterConditions, SortDirection } from "../services/constants";
import { apiRequestAtom, toastMessageAtom } from "../states/apiRequestState";
import {
  filterApplyAtom,
  groupFilterAtom,
  searchAtom,
  sortCountAtom,
  statusFilterAtom,
} from "../states/searchSortFilterStates";
import { userListAtom } from "../states/userStates";

interface userParamsProps {
  setList: SetterOrUpdater<never[]>;
  query: DocumentNode;
  field?: string;
}

interface usersFetchProps {
  userParams: userParamsProps;
}

export const useUsersFetch = (usersFetchProps: usersFetchProps) => {
  const [searchValue, setSearchValue] = useRecoilState(searchAtom);
  const [checkedStatus] = useRecoilState(statusFilterAtom);
  const [checkedGroups] = useRecoilState(groupFilterAtom);
  const [count] = useRecoilState(sortCountAtom);
  const [filterQuery] = useLazyQuery(usersFetchProps.userParams.query, {
    onCompleted: (data) => {
      usersFetchProps.userParams.setList(data);
    },
  });
  const fetchUsers = (usersFetch: usersFetchProps) => {
    let search = {};
    if (searchValue.length !== 0) {
      if (usersFetch.userParams.field === "name")
        search = { or: { name: { contains: searchValue } } };
      else {
        search = {
          or: {
            firstName: { contains: searchValue },
            middleName: { contains: searchValue },
            lastName: { contains: searchValue },
            email: { contains: searchValue },
          },
        };
      }
    }
    let sort = {};
    if (count === 1) {
      let direction = {
        field: usersFetch.userParams.field,
        direction: SortDirection.ASC,
      };
      sort = { ...sort, ...direction };
    } else if (count === 2) {
      let direction = {
        field: usersFetch.userParams.field,
        direction: SortDirection.DESC,
      };
      sort = { ...sort, ...direction };
    }
    let operands = [];
    if (checkedStatus.length > 0) {
      let status = {
        condition: FilterConditions.EQUALS,
        field: "status",
        value: checkedStatus,
      };
      operands.push(status);
    }
    if (checkedGroups.length > 0) {
      let groups = {
        condition: FilterConditions.EQUALS,
        field: "group",
        value: checkedGroups,
      };
      operands.push(groups);
    }

    let variables = {};
    if (Object.keys(sort).length > 0) {
      variables = { sort: sort };
    }
    if (Object.keys(operands).length > 0) {
      variables = { ...variables, filter: { operands: operands } };
    }
    if (Object.keys(search).length > 0) {
      variables = { ...variables, search: search };
    }
    console.log(variables);
    filterQuery({ variables: variables });
  };

  return fetchUsers;
};
