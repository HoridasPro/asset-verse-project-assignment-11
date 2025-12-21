// import React from "react";
// import useAuth from "../hooks/useAuth";
// import Loading from "../Loading/Loading";
// import { Navigate, useLocation } from "react-router";

// const Private = ({ children }) => {
//   const { loading, user } = useAuth();
//   const location = useLocation();
//   console.log(location);
//   if (loading) {
//     return <Loading></Loading>;
//   }
//   if (!user) {
//     return <Navigate to="/login" state={location.pathname} replace />;
//   }
//   return children;
// };

// export default Private;
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../Loading/Loading";

const Private = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return children;
};

export default Private;
