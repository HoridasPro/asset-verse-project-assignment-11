// import React from "react";
// import useAuth from "../hooks/useAuth";
// import Loading from "../Loading/Loading";
// import useRole from "../hooks/useRole";
// import Forbidden from "../Forbidden/Forbidden";

// const AdminRoute = ({ children }) => {
//   const { loading } = useAuth();
//   const { role, isRoleLoading } = useRole();
//   if (loading || isRoleLoading) {
//     return <Loading></Loading>;
//   }
//   if (role !== "admin") {
//     return <Forbidden></Forbidden>;
//   }
//   return children;
// };

// export default AdminRoute;

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

  // 🔐 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ not admin
  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
