import { Button } from "@mui/material";
import { FC } from "react"

import Sort from "../sort/Sort";
import { TableToolBarProps } from "./types";
import './tabletoolbar.css'
import SearchBar from "../search-bar/SearchBar";

const TableToolBar: FC<TableToolBarProps> = ({
    text,
    searchlabel,
    buttonlabel,
}) => {
    return (
        <div className="table-tool-bar">
            <legend className="legend-title">{text}</legend>
            <div className="sort-search-button">
                <div className="sort">
                    <Sort />
                </div>
                <div className="search">
                    <SearchBar searchlabel={searchlabel} />
                </div>
                <div className="tool-bar-button">
                    <Button
                        variant="outlined"                    >
                        {buttonlabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default TableToolBar;