import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${encodeURIComponent(user.email)}/role`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  return {
    role: data.role,
    isRoleLoading: isLoading,
  };
};

export default useRole;
