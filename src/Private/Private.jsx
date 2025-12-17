import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../Loading/Loading";

const Private = ({ children }) => {
  const { loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }

  return children;
};

export default Private;
