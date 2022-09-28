import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { RoutePaths } from "./RoutePaths";

const NotFound = lazy(() => import( "../components/NotFound"));
const HomePage= lazy(() => import("../containers/home"));
const Login = lazy(() => import("../containers/auth/Login"));
const Users = lazy(() => import("../containers/users"));
const Groups = lazy(() => import("../containers/groups"));
const Roles = lazy(() => import("../containers/roles"));
const Permissions = lazy(() => import("../containers/permissions"));

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
        
         <Route path="/home/*" element={<HomePage />}>
          <Route path={RoutePaths.users} element={<Users />} />
          <Route path="users/:id" element={<Users/>}></Route>
          <Route path={RoutePaths.groups} element={<Groups />} />\
          <Route path="groups/:id" element={<Groups/>}></Route>
          <Route path={RoutePaths.roles} element={<Roles />} />
          <Route path="roles/:id" element={<Roles/>}></Route>
          <Route path={RoutePaths.permissions} element={<Permissions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesLayout;
