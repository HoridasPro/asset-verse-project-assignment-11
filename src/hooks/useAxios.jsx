import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // backend running port
});

const useAxios = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // req interceptors
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user?.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    // res interceptors
    const resInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOutUser().then(() => {
            navigate("/login");
          });
        }
        (error) => Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptors);
    };
  }, [user, logOutUser, navigate]);

  return axiosSecure;
};
export default useAxios;
