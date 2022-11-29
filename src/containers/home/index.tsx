import { ApolloError, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Outlet, Navigate, useNavigate, NavLink } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSetRecoilState } from "recoil";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRecoilState } from "recoil";

import { LOGO_URL } from "../../config";
import CustomerAuth from "../../services/auth";
import "./styles.css";
import { LOGOUT } from "../auth/services/mutations";
import { currentUserAtom } from "../../states/loginStates";
import { stringAvatar, stringToColor } from "../../utils/table";
import Toast from "../../components/toast";
import { apiRequestAtom, toastMessageAtom } from "../../states/apiRequestState";
import { viewTableAtom } from "../../states/tableStates";

const HomePage = () => {
  const setApiSuccess = useSetRecoilState(apiRequestAtom);
  const [toastMessage, setToastMessage] = useRecoilState(toastMessageAtom);
  const [isViewVerified, setViewVerified] = useRecoilState(viewTableAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const [currentUserDetails] = useRecoilState(currentUserAtom);

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      CustomerAuth.clearTokens();
      navigate("/login");
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
  });

  const onLogout = () => {
    logout();
  };

  const onCloseToast = () => {
    setToastMessage("");
  };

  return (
    <>
      <div className="wrapperContainer">
        <div className="navBar">
          <div className="navLogo">
            <img alt="logo" src={LOGO_URL} />
          </div>
          <div className="userdetails">
            <Avatar
              {...stringAvatar(
                `${currentUserDetails.firstName} ${currentUserDetails.lastName}`?.toUpperCase()
              )}
            />
            <Tooltip title="Account Details">
              <IconButton className="navbar-avatar" onClick={handleClick}>
                <ArrowDropDownOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              className="menu-styles"
              PaperProps={
                isViewVerified
                  ? {
                      elevation: 0,
                    }
                  : {
                      elevation: 0,
                      sx: { backgroundColor: "#808080e0 !important" },
                    }
              }
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar
                  {...stringAvatar(
                    `${currentUserDetails.firstName} ${currentUserDetails.lastName}`?.toUpperCase()
                  )}
                  sx={{
                    marginLeft: "0px !important",
                    bgcolor: stringToColor(
                      `${currentUserDetails.firstName} ${currentUserDetails.lastName}`?.toUpperCase()
                    ),
                  }}
                  className={`${!isViewVerified && "denied-avatar"}`}
                />
                <div>
                  <div className="user-name">{`${currentUserDetails.firstName} ${currentUserDetails.lastName}`}</div>
                  <div className={`${!isViewVerified && "denied-"}user-email`}>
                    {currentUserDetails.email}
                  </div>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  setViewVerified(true);
                  navigate(`./users/${currentUserDetails.id}`);
                }}
                sx={{ color: "#6d6d6d" }}
                className={`${!isViewVerified && "denied-menu-item"}`}
              >
                <AccountCircleOutlinedIcon
                  className={
                    isViewVerified ? "details-icon" : "denied-details-icon"
                  }
                />
                View Profile
              </MenuItem>
              <MenuItem
                onClick={onLogout}
                sx={{ color: "#6d6d6d" }}
                className={`${!isViewVerified && "denied-menu-item"}`}
              >
                <LogoutOutlinedIcon
                  className={
                    isViewVerified ? "details-icon" : "denied-details-icon"
                  }
                />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="body">
          <div className={isViewVerified ? "sideBar" : "denied-sideBar"}>
            <nav>
              <div className="sideBarContainer">
                <NavLink
                  to="/home/users"
                  className={({ isActive }) =>
                    isActive
                      ? isViewVerified
                        ? "active-text-link"
                        : "denied-active-text-link"
                      : isViewVerified
                      ? "text-link"
                      : "denied-text-link"
                  }
                >
                  <PeopleAltOutlinedIcon className="icon" />
                  USERS
                </NavLink>
                <NavLink
                  to="/home/groups"
                  className={({ isActive }) =>
                    isActive
                      ? isViewVerified
                        ? "active-text-link"
                        : "denied-active-text-link"
                      : isViewVerified
                      ? "text-link"
                      : "denied-text-link"
                  }
                >
                  <Diversity3OutlinedIcon className="icon" />
                  GROUPS
                </NavLink>

                <NavLink
                  to="/home/roles"
                  className={({ isActive }) =>
                    isActive
                      ? isViewVerified
                        ? "active-text-link"
                        : "denied-active-text-link"
                      : isViewVerified
                      ? "text-link"
                      : "denied-text-link"
                  }
                >
                  <WorkOutlineOutlinedIcon className="icon" />
                  ROLES
                </NavLink>

                <NavLink
                  to="/home/permissions"
                  className={({ isActive }) =>
                    isActive ? "active-text-link" : "text-link"
                  }
                >
                  <LockOutlinedIcon className="icon" />
                  PERMISSIONS
                </NavLink>
              </div>
            </nav>
          </div>

          <div className="outlet">
            {CustomerAuth?.isAuthenticated ? (
              <Outlet />
            ) : (
              <Navigate replace to="/login" />
            )}
          </div>
          <Toast
            message={toastMessage}
            isOpen={Boolean(toastMessage)}
            handleClose={onCloseToast}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
