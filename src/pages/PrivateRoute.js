import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, path }) => {
  const { myUser } = useUserContext();
  if (!myUser) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;
