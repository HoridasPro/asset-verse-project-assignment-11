import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data?.role;
    },
  });
  console.log("in the data", role);

  return {
    role,
    isRoleLoading: isLoading,
  };
};

export default useRole;
