import { InputBase } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

import { SearchBarProps } from "./types";
import "./styles.css";
import { useRecoilState } from "recoil";
import {
  groupFilterAtom,
  searchAtom,
  sortCountAtom,
  statusFilterAtom,
} from "../../states/searchSortFilterStates";
import { searchFilterSort } from "../../utils/searchFilterSort";
import { GET_USERS } from "../../containers/users/services/queries";

const SearchBar: FC<SearchBarProps> = ({
  searchLabel,
  setItemList,
  searchQuery,
  customSearchStyle,
  customBarStyle,
  customIconStyle,
}) => {
  const [searchValue, setSearchValue] = useRecoilState(searchAtom);
  const [checkedStatus] = useRecoilState(statusFilterAtom);
  const [checkedGroups] = useRecoilState(groupFilterAtom);
  const [count] = useRecoilState(sortCountAtom);
  const [filterQuery] = useLazyQuery(GET_USERS, {
    onCompleted: (data) => {
      setItemList(data?.getUsers);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const delayDebounce = setTimeout(() => {
      setSearchValue(e.target.value);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  };

  useEffect(() => {
    if (searchValue.length !== 0)
      searchFilterSort(
        count,
        checkedGroups,
        checkedStatus,
        filterQuery,
        searchValue
      ); // eslint-disable-next-line
  }, [searchValue]);

  return (
    <div className="search" style={customSearchStyle}>
      <div className="search-bar" style={customBarStyle}>
        <InputBase
          placeholder={searchLabel}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <div className="search-icon" style={customIconStyle}>
        <SearchIcon />
      </div>
    </div>
  );
};
export default SearchBar;
