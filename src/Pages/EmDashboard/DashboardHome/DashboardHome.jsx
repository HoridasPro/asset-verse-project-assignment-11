import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../Loading/Loading";
import EmployeeDashboardHome from "./EmployeeDashboardHome";

const DashboardHome = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) {
    return <Loading></Loading>;
  }
  if (role === "employee") {
    return <EmployeeDashboardHome></EmployeeDashboardHome>;
  }
};

export default DashboardHome;
