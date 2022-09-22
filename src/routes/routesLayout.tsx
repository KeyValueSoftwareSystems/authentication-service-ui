import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import HomePage from "../container/Home";


import { RoutePaths } from "./routePaths";
const Login = lazy(() => import("../container/Auth/login"));
const Users = lazy(() => import("../container/Users"));
const Groups = lazy(() => import("../container/Groups"));
const Roles = lazy(() => import("../container/Roles"));
const Permissions = lazy(() => import("../container/Permissions"));

const RoutesLayout: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path={RoutePaths.default}
          element={<Navigate replace to={RoutePaths.login} />}
        />
        <Route path={RoutePaths.login} element={<Login />} />
        {/* <Route
          path={RoutePaths.signup}
          element={<Login type={LoginType.SignUp} />}
        /> */}

        <Route path="/home/*" element={<HomePage />}>
          <Route path={RoutePaths.users} element={<Users />} />
          <Route path={RoutePaths.groups} element={<Groups />} />
          {/* <Route
              path="/user/:id"
              element={<UserDetails />}
            /> */}

          <Route path={RoutePaths.roles} element={<Roles />} />
          <Route path={RoutePaths.permissions} element={<Permissions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesLayout;
