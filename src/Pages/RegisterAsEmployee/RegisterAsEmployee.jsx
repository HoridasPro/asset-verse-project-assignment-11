import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";

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

  const handleEmployeeRegister = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.photo[0];
      const photoURL = await photoUpload(imageFile);

      await registerUser(data.email, data.password);
      // navigate(location?.state || "/");

      await userProfileUpdate({
        displayName: data.name,
        photoURL: photoURL,
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

      await Swal.fire({
        icon: "success",
        title: "Employee Registered",
        text: `Welcome ${data.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate(location?.state || "/");
      console.log("Employee registered:", res.data);
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error?.response?.data?.message || error.message || "Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Register as Employee
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Fill your details to create an account
        </p>

        <form
          onSubmit={handleSubmit(handleEmployeeRegister)}
          className="space-y-4"
        >
          <div>
            <label className="text-white font-semibold">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input input-bordered w-full bg-white/90"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 font-bold">Name is required</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full bg-white/90"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 font-bold">Photo is required</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white/90"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 font-bold">Email is required</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
              })}
              className="input input-bordered w-full bg-white/90"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-bold">password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 font-bold">
                Password must be 6 cheracters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 font-bold">
                Password bust be includes at least one charecter, at least one
                number and at least one speacial character
              </p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: true,
              })}
              className="input input-bordered w-full bg-white/90"
            />
            {errors.dateOfBirth?.type === "required" && (
              <p className="text-red-500 font-bold">DateOfBirth is required</p>
            )}
          </div>

          <button
            state={location.state}
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full py-3 rounded-full text-white text-lg font-bold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform"
            }`}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>
        <p className="text-white text-center mt-3">
          If you have an account ? please
          <Link to="/login" className="text-blue-500 font-bold ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterAsEmployee;
