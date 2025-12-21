import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

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
      console.error("Registration failed:", error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-4 py-10">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Register as HR Manager
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Create your company HR account
        </p>

        <form onSubmit={handleSubmit(handleHrRegister)} className="space-y-4">
          <div>
            <label className="text-white font-semibold">Full Name</label>
            <input
              {...register("name", { required: true })}
              className="input input-bordered w-full bg-white/90"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">Name is required</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Company Name</label>
            <input
              {...register("companyName", { required: true })}
              className="input input-bordered w-full bg-white/90"
            />
          </div>

          <div>
            <label className="text-white font-semibold">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full bg-white/90"
            />
          </div>

          <div>
            <label className="text-white font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white/90"
            />
          </div>

          <div>
            <label className="text-white font-semibold">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full bg-white/90"
            />
          </div>

          <div>
            <label className="text-white font-semibold">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="input input-bordered w-full bg-white/90"
            />
          </div>

          <button
            state={location.state}
            disabled={submitting}
            className={`w-full mt-4 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg ${
              submitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Processing..." : "Register"}
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

export default RegisterAsHRManager;
