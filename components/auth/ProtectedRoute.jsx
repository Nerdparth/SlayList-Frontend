import React from "react";
import { checkLogout } from "../../hooks/auth/logout";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = checkLogout();
  if (accessToken === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
