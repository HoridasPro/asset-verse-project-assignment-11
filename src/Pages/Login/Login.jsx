import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await userLogin(data.email, data.password);

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${result.user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location?.state || "/");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-10 bg-[#DBE5FF] backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-5"
        >
          {/* Heading */}
          <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-black text-center">
            Login to continue to your dashboard
          </p>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-black">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input border border-gray-300 w-full bg-[#DBE5FF] placeholder:text-black text-black
                         focus:outline-none focus:ring-0"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 font-bold">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-black font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-[#DBE5FF] placeholder:text-black text-black border border-gray-300
                         focus:outline-none focus:ring-0"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-bold">Password is required</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="border border-blue-700 text-blue-700 hover:bg-[#CCE1FF] w-full mt-4 py-3 rounded-full text-lg font-bold
                       hover:scale-105 transition-transform cursor-pointer"
          >
            Login
          </button>

          <p className="text-black text-center text-sm">
            Secure login powered by Firebase
          </p>

          <p className="text-black">
            If you don't have an account?
            <Link
              to="/registerAsHRManager"
              className="font-bold text-blue-500 ml-2"
            >
              HrRegister
            </Link>
          </p>

          <p className="text-black">
            If you don't have an account?
            <Link
              to="/registerAsEmployee"
              className="font-bold text-blue-500 ml-2"
            >
              EmRegister
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
