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

      console.log(result.user);
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-center mt-2">
          Login to continue to your dashboard
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/90"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 font-bold">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/90"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
              {errors.password?.type === "required" && (
              <p className="text-red-500 font-bold">Password is required</p>
            )}
          </div>

          <button
            state={location.state}
            type="submit"
            className="w-full mt-4 py-3 rounded-full text-lg font-bold text-white 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
              hover:scale-105 transition-transform shadow-lg cursor-pointer"
          >
            Login
          </button>
          <p className="text-center text-gray-300 text-sm">
            Secure login powered by Firebase
          </p>
          <p className="text-white">
            If you don't an account please register?
            <Link
              to="/registerAsHRManager"
              className="font-bold text-blue-500 ml-2"
            >
              HrRegister
            </Link>
          </p>
          <p className="text-white">
            If you don't an account please register?
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
