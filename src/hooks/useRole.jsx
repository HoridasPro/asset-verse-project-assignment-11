import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();

  const { data: role, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  return { role, isLoading };
};

export default useRole;
