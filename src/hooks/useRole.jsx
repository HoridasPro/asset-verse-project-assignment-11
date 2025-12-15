import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { isRoleLoading, data = { role: "user" } } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      if (!user?.email) return { role: "user" };
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
    enabled: !!user?.email, // run query only if user.email exists
  });

  return { role: data.role, isRoleLoading: isRoleLoading };
};

export default useRole;
