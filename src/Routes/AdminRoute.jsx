import React from "react";
// import useAuth from "../hooks/useAuth";
import Loading from "../Loading/Loading";
import useRole from "../hooks/useRole";
import Forbidden from "../Forbidden/Forbidden";
// import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) {
    return <Loading />;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
