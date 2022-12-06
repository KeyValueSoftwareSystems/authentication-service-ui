import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useRecoilState } from "recoil";
import React, { FC } from "react";

import { TableToolBarProps } from "./types";
import "./styles.css";
import SearchBar from "../search-bar/SearchBar";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as SortIcon } from "../../assets/sort.svg";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/arrow-left.svg";
import { groupListAtom } from "../../states/groupStates";

const TableToolBar: FC<TableToolBarProps> = ({
  text,
  searchLabel,
  buttonLabel,
  setItemList,
  searchQuery,
  isAddVerified,
  onAdd,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewStatusFilter, setStatusFilter] = React.useState(true);
  const [viewGroupFilter, setGroupFilter] = React.useState(false);
  const open = Boolean(anchorEl);
  const status = ["Active", "Inactive", "Invited"];
  const [groupList] = useRecoilState(groupListAtom);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setCurrentCheckedStatus(checkedStatus);
    setCurrentCheckedGroups(checkedGroups);
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleCancel();
  };
  const [checkedStatus, setCheckedStatus] = React.useState([]);
  const [checkedGroups, setCheckedGroups] = React.useState([]);
  const [currentCheckedStatus, setCurrentCheckedStatus] = React.useState([]);
  const [currentCheckedGroups, setCurrentCheckedGroups] = React.useState([]);

  const onStatusChange = (name: any, e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedStatus(checkedStatus.concat(name));
    } else {
      setCheckedStatus(checkedStatus.filter((x) => x !== name));
    }
  };
  const onGroupChange = (name: any, e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedGroups(checkedGroups.concat(name));
    } else {
      setCheckedGroups(checkedGroups.filter((x) => x !== name));
    }
  };

  const handleStatusCheck = (a: string) => {
    let flag = 0;
    checkedStatus.map((item: any) => {
      if (a === item) {
        flag = 1;
      }
    });
    if (flag === 0) return false;
    else return true;
  };

  const handleGroupsCheck = (a: string) => {
    let flag = 0;
    checkedGroups.map((item: any) => {
      if (a === item) {
        flag = 1;
      }
    });
    if (flag === 0) return false;
    else return true;
  };

  const handleClearAll = () => {
    setCheckedGroups([]);
    setCheckedStatus([]);
  };

  const handleCancel = () => {
    setCheckedStatus(currentCheckedStatus);
    setCheckedGroups(currentCheckedGroups);
    handleClose();
  };

  const handleSave = () =>{
    setAnchorEl(null);
  }

  return (
    <div className="table-toolbar">
      <div className="search-sort-filter">
        <SearchBar
          searchLabel={searchLabel}
          setItemList={setItemList}
          searchQuery={searchQuery}
        />
        <div className="sort-button">
          <SortIcon id="sort-filter-icon" />
          Sort by
        </div>

        <div
          className="filter-button"
          onClick={(e: React.MouseEvent) => handleClick(e)}
        >
          <FilterIcon id="sort-filter-icon" />
          Add Filter
        </div>
      </div>
      {!isAddVerified && (
        <div className="toolbar-button">
          <Button
            variant="contained"
            id="add-button"
            onClick={onAdd}
            sx={{ textTransform: "none" }}
          >
            <PlusIcon />
            {buttonLabel}
          </Button>
        </div>
      )}
      <ClickAwayListener
        onClickAway={() => {
          if (open !== true) {
            console.log("hi");
          }
        }}
      >
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          sx={{ minHeight: "100%" }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              width: "675px",
              height: "436px",
              borderRadius: "6px",
              "&:before": {
                display: "none",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          // onKeyDown={onKeyDown}
        >
          <div className="filter">
            <div className="filter-by">
              <div>
                <MenuItem
                  id="heading-clear-all"
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      cursor: "default",
                    },
                  }}
                >
                  <div id="filter-heading">Filters</div>
                  <div id="clear-all" onClick={() => handleClearAll()}>
                    Clear All
                  </div>
                </MenuItem>
                <MenuItem
                  id="filter-by-options"
                  onClick={() => {
                    setStatusFilter(true);
                    setGroupFilter(false);
                  }}
                >
                  <div>Status</div>
                  <div id="avatar-arrow">
                    <Avatar
                      sx={{
                        mr: "12px !important",
                        backgroundColor: "#2653F1",
                        color: "white",
                        width: "24px !important",
                        height: "24px !important",
                        fontSize: "14px !important",
                      }}
                    >
                      {checkedStatus.length}
                    </Avatar>
                    <LeftArrowIcon />
                  </div>
                </MenuItem>
                <MenuItem
                  id="filter-by-options"
                  onClick={() => {
                    setStatusFilter(false);
                    setGroupFilter(true);
                  }}
                >
                  <div>Groups</div>
                  <div id="avatar-arrow">
                    <Avatar
                      sx={{
                        mr: "12px !important",
                        backgroundColor: "#2653F1",
                        color: "white",
                        width: "24px !important",
                        height: "24px !important",
                        fontSize: "14px !important",
                      }}
                    >
                      {checkedGroups.length}
                    </Avatar>
                    <LeftArrowIcon />
                  </div>
                </MenuItem>
              </div>
              <div>
                <MenuItem>
                  <Button
                    id="filter-button"
                    sx={{
                      color: "#2653F1",
                      border: "1px solid #2653F1",
                      mr: "8px",
                      "&:hover": {
                        border: "1px solid #2653F1",
                        color: "#2653F1",
                      },
                    }}
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </Button>
                  <Button
                    id="filter-button"
                    sx={{
                      backgroundColor: "#2653F1",
                      color: "white",
                      ml: "8px",
                      "&:hover": {
                        backgroundColor: "#2653F1",
                        color: "white",
                      },
                    }}
                    onClick={()=>handleSave()}
                  >
                    Apply
                  </Button>
                </MenuItem>
              </div>
            </div>
            {viewStatusFilter && (
              <div className="options">
                <FormGroup>
                  {status.map((a) => (
                    <FormControlLabel
                      label={a}
                      name={a}
                      control={
                        <Checkbox
                          sx={{ color: "#7E818D" }}
                          onChange={onStatusChange.bind(undefined, a)}
                          defaultChecked={false}
                          checked={handleStatusCheck(a)}
                          className={
                            handleStatusCheck(a) === true
                              ? "checked"
                              : "unchecked"
                          }
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            )}
            {viewGroupFilter && (
              <div className="options">
                <FormGroup>
                  {groupList.map((a: any) => (
                    <FormControlLabel
                      label={a.name}
                      name={a.name}
                      control={
                        <Checkbox
                          sx={{ color: "#7E818D" }}
                          onChange={onGroupChange.bind(undefined, a.name)}
                          checked={handleGroupsCheck(a.name)}
                          className={
                            handleGroupsCheck(a.name) === true
                              ? "checked"
                              : "unchecked"
                          }
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            )}
          </div>
        </Menu>
      </ClickAwayListener>
    </div>
  );
};
export default TableToolBar;
