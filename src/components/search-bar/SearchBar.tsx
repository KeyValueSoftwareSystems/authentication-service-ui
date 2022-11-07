import { InputBase } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { useQuery } from "@apollo/client";

import { SearchBarProps } from "./types";
import "./styles.css";

const SearchBar: FC<SearchBarProps> = ({
  searchLabel,
  setItemList,
  searchQuery,
}) => {
  const [searchValue, setSearchValue] = useState("");
  useQuery(searchQuery, {
    variables: {
      value: searchValue,
    },
    onCompleted: (data) => {
      setItemList(data);
    },
  });
  return (
    <div className="search">
      <div className="search-bar">
        <InputBase
          placeholder={searchLabel}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <div className="search-icon">
        <GridSearchIcon />
      </div>
    </div>
  );
};
export default SearchBar;
