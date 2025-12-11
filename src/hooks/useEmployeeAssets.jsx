import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useEmployeeAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["employee-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employeeAssets/${user.email}`);
      return res.data;
    },
  });

  return { assets, isLoading };
};

export default useEmployeeAssets;
