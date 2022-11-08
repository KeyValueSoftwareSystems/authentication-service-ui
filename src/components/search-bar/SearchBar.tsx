import { InputBase } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SearchBarProps } from "./types";
import "./styles.css";

const SearchBar: FC<SearchBarProps> = ({
  searchLabel,
  setItemList,
  searchQuery,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const [searchItemQuery] = useLazyQuery(searchQuery, {
    variables: {
      value: searchValue,
    },
    onCompleted: (data) => {
      setItemList(data);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const delayDebounceFn = setTimeout(() => {
      setSearchValue(e.target.value);
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  };

  useEffect(() => {
    searchItemQuery();
  }, [searchValue]);

  return (
    <div className="search">
      <div className="search-bar">
        <InputBase
          placeholder={searchLabel}
          onChange={(e) => {
            handleChange(e);
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
