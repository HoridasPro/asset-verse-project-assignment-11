import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // ✅ Eye Icons

const RegisterAsHRManager = ({ setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { registerUser, userProfileUpdate } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleHrRegister = async (data) => {
    setSubmitting(true);
    try {
      const imageFile = data.photo[0];
      const logoURL = await photoUpload(imageFile);

      await registerUser(data.email, data.password);
      navigate(location?.state || "/");

      await userProfileUpdate({
        displayName: data.name,
        photoURL: logoURL,
      });

      const managerInfo = {
        name: data.name,
        companyName: data.companyName,
        companyLogo: logoURL,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/users", managerInfo);

      if (res.data?.insertedId || res.data?._id) {
        if (setUser) setUser(res.data);

        Swal.fire({
          icon: "success",
          title: "Registration Successful 🎉",
          text: "HR Manager account created successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit(handleHrRegister)}
          className="mt-10 bg-[#DBE5FF] backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-5"
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Register as HR Manager
          </h2>
          <p className="text-black text-center">
            Create your company HR account
          </p>

          {/* Full Name */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              className="input border border-gray-300 w-full bg-[#DBE5FF] text-black focus:outline-none focus:ring-0"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 font-bold">Name is required</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Company Name
            </label>
            <input
              {...register("companyName", { required: true })}
              className="input border border-gray-300 w-full bg-[#DBE5FF] text-black focus:outline-none focus:ring-0"
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="text-red-500 font-bold">Company name is required</p>
            )}
          </div>

          {/* Company Logo */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="w-full border border-gray-300 rounded-lg bg-[#DBE5FF] text-black
              file:bg-[#DBE5FF] file:text-black file:border-0 file:px-4 file:py-2 file:mr-4
              focus:outline-none focus:ring-0 cursor-pointer"
            />
            {errors.photo && (
              <p className="text-red-500 font-bold">Logo is required</p>
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
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 font-bold">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 font-bold">
                Password must be minimum 6 characters and include a letter, a
                number, and a special character.
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="input border border-gray-300 w-full bg-[#DBE5FF] text-black focus:outline-none focus:ring-0"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 font-bold">
                Date of birth is required
              </p>
            )}
          </div>

          <button
            disabled={submitting}
            className="border border-blue-700 text-blue-700 hover:bg-[#CCE1FF] w-full mt-4 py-3 rounded-full text-lg font-bold hover:scale-105 transition-transform cursor-pointer disabled:opacity-60"
          >
            {submitting ? "Processing..." : "Register"}
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

export default RegisterAsHRManager;
