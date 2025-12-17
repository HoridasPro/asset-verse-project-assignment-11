import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../Loading/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } if (role === "user") {
    return <UserDashboardHome></UserDashboardHome>;
  }
  return (
    <div>
      <h1>this is dashboard home</h1>
    </div>
  );
};

export default DashboardHome;
