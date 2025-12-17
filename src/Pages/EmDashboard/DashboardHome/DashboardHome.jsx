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

  return (
    <div>
      <h1>this dasdboard home</h1>
    </div>
  );
};

export default DashboardHome;
