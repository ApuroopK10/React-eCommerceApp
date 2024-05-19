import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, path }) => {
  const { user } = useAuth0();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;
