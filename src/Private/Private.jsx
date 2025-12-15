// import React from "react";
// import useAuth from "../hooks/useAuth";
// import useAxios from "../hooks/useAxios";
// import Loading from "../Loading/Loading";

// const Private = ({ children }) => {
//   const { loading } = useAuth();
//   const { role, isLoading } = useAxios();
//   if (loading || isLoading) {
//     return <Loading></Loading>;
//   }
//   if (role !== "hr") {
//     return <p>you are not admin</p>;
//   }

//   return children;
// };

// export default Private;
