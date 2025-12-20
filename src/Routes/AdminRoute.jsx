import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../Loading/Loading";
import useRole from "../hooks/useRole";
import Forbidden from "../Forbidden/Forbidden";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
