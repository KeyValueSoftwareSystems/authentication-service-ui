import { Button } from "@mui/material";
import { FC } from "react"
import Sort from "../sort/Sort";
import { TableToolBarProps } from "./types";
import './tabletoolbar.css'
import SearchBar1 from "../search-bar/SearchBar";

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
                    <SearchBar1 searchlabel={searchlabel} />
                </div>
                <div className="tool-bar-button">
                    <Button
                        variant="outlined"
                        sx={{
                            boxShadow: 1,
                            border: 1,
                            borderBlockColor: "grey",
                            color: "#636363",
                            borderRadius: 10,
                            height: 40,
                            marginTop: "11px",
                            marginRight: "17px",
                        }}
                    >
                        {buttonlabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default TableToolBar;