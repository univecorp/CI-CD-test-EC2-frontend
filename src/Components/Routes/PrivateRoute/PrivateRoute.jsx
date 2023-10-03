import React from "react";
import { useSelector } from "react-redux";

import { useLocation, Navigate } from "react-router-dom";
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
  let location = useLocation();

  if (user?.email) {
    return children;
  }
  return <Navigate to="/registration" state={{ from: location }} />;
};

export default PrivateRoute;
