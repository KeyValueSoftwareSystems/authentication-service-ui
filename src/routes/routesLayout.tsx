import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Groups from "../containers/Groups";
import { RoutePaths } from "./routePaths";
const NotFound = lazy(() => import( "../components/NotFound"));
const HomePage= lazy(() => import("../containers/Home"));
const Login = lazy(() => import("../containers/Auth/login"));
const Permissions = lazy(() => import("../containers/Permissions"));


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
          <Route path={RoutePaths.groups} element={<Groups />} />
          {/* <Route
              path="/user/:id"
              element={<UserDetails />}
            /> */}

          <Route path={RoutePaths.permissions} element={<Permissions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesLayout;
