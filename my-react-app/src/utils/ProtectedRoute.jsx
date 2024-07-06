import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Landing from "../pages/Landing";

function ProtectedRoute() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return isAuthenticated ? <Home /> : <Outlet />;
}

export default ProtectedRoute;
