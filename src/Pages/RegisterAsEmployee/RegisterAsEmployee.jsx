import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // ✅ Eye Icons

const RegisterAsEmployee = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { registerUser, userProfileUpdate } = useAuth();
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // ✅ Show/Hide password

  const handleEmployeeRegister = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.photo[0];
      const photoURL = await photoUpload(imageFile);

      await registerUser(data.email, data.password);
      navigate(location?.state || "/");

      await userProfileUpdate({
        displayName: data.name,
        photoURL,
        role: "employee",
      });

      const employeeInfo = {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        photoURL,
        role: "employee",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/em-users", employeeInfo);
      if (setUser) setUser(res.data);

      Swal.fire({
        icon: "success",
        title: "Employee Registered 🎉",
        text: `Welcome ${data.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate(location?.state || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error?.response?.data?.message || error.message || "Try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(handleEmployeeRegister)}
          className="mt-10 bg-[#DBE5FF] backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-5"
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Register as Employee
          </h2>
          <p className="text-black text-center">
            Fill your details to create an account
          </p>

          {/* Name */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input border border-gray-300 w-full bg-[#DBE5FF] text-black focus:outline-none focus:ring-0"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 font-bold">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="block font-semibold text-black mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="w-full border border-gray-300 rounded-lg bg-[#DBE5FF] text-black
              file:bg-[#DBE5FF] file:text-black file:border-0
              file:px-4 file:py-2 file:mr-4
              focus:outline-none focus:ring-0 cursor-pointer"
            />
            {errors.photo && (
              <p className="text-red-500 font-bold">Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-black mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input border border-gray-300 w-full bg-[#DBE5FF] text-black focus:outline-none focus:ring-0"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 font-bold">Email is required</p>
            )}
          </div>

          {/* Password with Eye Icon */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                })}
                className="input border border-gray-300 w-full bg-[#DBE5FF] text-black focus:outline-none focus:ring-0"
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer select-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 font-bold">Password is required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 font-bold">
                Password must be minimum 6 characters and include a letter, a
                number, and a special character.
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="input border border-gray-300 w-full bg-[#DBE5FF] text-black focus:outline-none focus:ring-0"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="border border-blue-700 text-blue-700 hover:bg-[#CCE1FF] w-full mt-4 py-3 rounded-full text-lg font-bold
            hover:scale-105 transition-transform cursor-pointer disabled:opacity-60"
          >
            {loading ? "Processing..." : "Register"}
          </button>

          <p className="text-black text-center">
            Already have an account?
            <Link to="/login" className="text-blue-500 font-bold ml-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterAsEmployee;
