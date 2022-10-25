import { useMutation } from "@apollo/client";
import { Outlet, Navigate, useNavigate, NavLink } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import React from "react";
import { useRecoilState } from "recoil";

import { LOGO_URL } from "../../config";
import CustomerAuth from "../../services/auth";
import "./styles.css";
import { LOGOUT } from "../auth/services/mutations";
import { currentUserAtom } from "../../states/loginStates";
import { stringAvatar } from "../../utils/table";

const HomePage = () => {
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
  });

  let fullName = currentUserDetails.firstName.concat(
    " ",
    currentUserDetails.lastName
  );

  const onLogout = () => {
    logout();
  };
  return (
    <>
      <div className="wrapperContainer">
        <div className="navBar">
          <div className="navLogo">
            <img alt="logo" src={LOGO_URL} />
          </div>
          <div className="userdetails-logout">
            <Tooltip title="Account Details">
              <IconButton className="navbar-avatar" onClick={handleClick}>
                <Avatar {...stringAvatar(fullName)} className="navbar-avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              className="menu-styles"
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar sx={{ backgroundColor: "#7e6b6b" }} />
                {fullName}
              </MenuItem>
              <MenuItem>
                <EmailIcon className="dropdown-icon" />
                {currentUserDetails.email}
              </MenuItem>
              <MenuItem>
                <CallIcon className="dropdown-icon" />
                {currentUserDetails.phone}
              </MenuItem>
            </Menu>
            <div className="logout">
              <Button
                variant="outlined"
                onClick={onLogout}
                sx={{ textTransform: "none", marginLeft: "10px" }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="sideBar">
            <nav>
              <div className="sideBarContainer">
                <NavLink
                  to="/home/users"
                  className={({ isActive }) =>
                    isActive ? "active-text-link" : "text-link"
                  }
                >
                  <PeopleAltOutlinedIcon className="icon" />
                  USERS
                </NavLink>
                <NavLink
                  to="/home/groups"
                  className={({ isActive }) =>
                    isActive ? "active-text-link" : "text-link"
                  }
                >
                  <Diversity3OutlinedIcon className="icon" />
                  GROUPS
                </NavLink>

                <NavLink
                  to="/home/roles"
                  className={({ isActive }) =>
                    isActive ? "active-text-link" : "text-link"
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
