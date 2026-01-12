import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../Loading/Loading";
import UserDashboardHome from "./UserDashboardHome";
import AdminDashboardHome from "./AdminDashboardHome";

const HrDashboardHome = ({ children }) => {
  const { role,isLoading  } = useRole();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
  if (role === "hr") {
    return <UserDashboardHome></UserDashboardHome>;
  }
  return children;
};

export default HrDashboardHome;
