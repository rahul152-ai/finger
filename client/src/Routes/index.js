import React from "react";
import { Routes, Route } from "react-router-dom";

import { authProtectedRoutes, publicRoutes } from "./routes";
import LoginRouteGuard from "../components/auth/LoginRouteGaurd";
import ProtectedRoutes from "../components/auth/ProctedRouteGaurd";
import Error404 from "../pages/utils/Error404Page";
import Error505 from "../pages/utils/Error505Page";
const Index = () => {
  return (
    <Routes>
      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<LoginRouteGuard>{route.component}</LoginRouteGuard>}
            key={idx}
            exact={true}
          />
        ))}
      </Route>

      <Route path="*" element={<Error404 />}></Route>
      <Route path="505" element={<Error505 />}></Route>

      <Route>
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<ProtectedRoutes>{route.component}</ProtectedRoutes>}
            key={idx}
            exact={true}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Index;
