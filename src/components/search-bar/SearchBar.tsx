import { InputBase} from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { FC } from "react";

import { SearchBarProps } from "./types";
import './searchbar.css';


const SearchBar: FC<SearchBarProps> = ({
    searchlabel,
}) => {
    return (
        <div className="search">
            <div className="search-bar">
                <InputBase
                    placeholder={searchlabel}                    
                />
            </div>
            <div className="search-icon">
                <GridSearchIcon />
            </div>
        </div>

    )
}
export default SearchBar;