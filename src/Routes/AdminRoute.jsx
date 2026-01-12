import React from "react";
import Loading from "../Loading/Loading";
import useRole from "../hooks/useRole";
import Forbidden from "../Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Loading />;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
