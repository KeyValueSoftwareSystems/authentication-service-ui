import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button } from "@mui/material";

import { LOGO_URL } from "../../config";
import CustomerAuth from "../../services/auth";
import "./styles.css";
import { LOGOUT } from "../auth/services/mutations";


const HomePage = () => {
  const navigate = useNavigate();

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      CustomerAuth.clearTokens();
      navigate("/login");
    },
  });

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
          <div className="logout">
            <Button
              variant="outlined"
              onClick={onLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="body">
          <div className="sideBar">
            <nav>
              <div className="sideBarContainer">
                <Link to="/home/users" className="text-link">
                  <PeopleAltOutlinedIcon className="icon" />
                  USERS
                </Link>

                <Link to="/home/groups" className="text-link">
                  <Diversity3OutlinedIcon className="icon" />
                  GROUPS
                </Link>

                <Link to="/home/roles" className="text-link">
                  <WorkOutlineOutlinedIcon className="icon" />
                  ROLES
                </Link>

                <Link to="/home/permissions" className="text-link">
                  <LockOutlinedIcon className="icon" />
                  PERMISSIONS
                </Link>
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
