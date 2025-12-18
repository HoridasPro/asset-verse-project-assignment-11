import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../Loading/Loading";
// import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import AdminDashboardHome from "./AdminDashboardHome";

const DashboardHome = ({ children }) => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
  if (role === "user") {
    return <UserDashboardHome></UserDashboardHome>;
  }
  return children;
};

export default DashboardHome;
