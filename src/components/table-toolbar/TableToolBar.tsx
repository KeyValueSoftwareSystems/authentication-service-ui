import { Button } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { TableToolBarProps } from "./types";
import "./styles.css";
import SearchBar from "../search-bar/SearchBar";
import { UserPermissionsAtom } from "../../states/permissionsStates";

const TableToolBar: FC<TableToolBarProps> = ({
  text,
  searchLabel,
  buttonLabel,
  addPermission,
  onAdd,
}) => {
  const navigate = useNavigate();

  const [isAddVerified, setAddVerified] = React.useState(false);
  const [userPermissions, setUserPermissions] =
    useRecoilState(UserPermissionsAtom);

  useEffect(() => {
    userPermissions.map((item: any) => {
      if (item?.name.includes(addPermission)) {
        setAddVerified(true);
      }
    });
  }, []);

  return (
    <div className="table-toolbar">
      <legend className="legend-title">{text}</legend>
      <div className="search-button">
        <div className="search">
          <SearchBar searchLabel={searchLabel} />
        </div>
        <div className="toolbar-button">
          <Button
            variant="contained"
            id="add-button"
            onClick={onAdd}
            disabled={isAddVerified}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TableToolBar;
