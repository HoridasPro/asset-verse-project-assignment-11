// import React from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import { photoUpload } from "../../Utils/UploadPhoto";
// import useAxios from "../../hooks/useAxios";

// const RegisterAsEmployee = ({ setUser }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { registerUser, userProfileUpdate, loading } = useAuth();
//   const axiosSecure = useAxios();

//   const handleEmployeeRegister = async (data) => {
//     try {
//       // 1️⃣ Upload photo
//       const imageFile = data.photo[0];
//       const photoURL = await photoUpload(imageFile);

//       // 2️⃣ Create Firebase Auth user
//       const firebaseUser = await registerUser(data.email, data.password);

//       // 3️⃣ Update Firebase user profile
//       await userProfileUpdate({
//         displayName: data.name,
//         photoURL: photoURL,
//         role: "employee",
//       });
//       console.log("User profile updated successfully for the employee");

//       const employeeInfo = {
//         name: data.name,
//         email: data.email,
//         dateOfBirth: data.dateOfBirth,
//         photoURL: photoURL,
//         role: "employee",
//         createdAt: new Date(),
//       };

//       // 5️⃣ Send employee data to backend
//       const res = await axiosSecure.post("/em-users", employeeInfo);
//       if (setUser) {
//         setUser(res.data);
//       }

//       console.log("Employee registered successfully:", res.data);
//       console.log("Firebase user:", firebaseUser.user);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("Registration failed. Please check the console for details.");
//     }
//   };

//   return (

//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Register as Employee</h2>

//       <form
//         onSubmit={handleSubmit(handleEmployeeRegister)}
//         className="space-y-4"
//       >
//         <div>
//           <label className="font-medium">Full Name</label>
//           <input
//             {...register("name", { required: true })}
//             type="text"
//             className="w-full border p-2 rounded"
//           />
//           {errors.name && <p className="text-red-500 text-sm">Required</p>}
//         </div>

//         <div>
//           <label className="font-medium">Photo</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="file-input file-input-bordered w-full"
//             {...register("photo", { required: true })}
//             placeholder="photo"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Email</label>
//           <input
//             {...register("email", { required: true })}
//             type="email"
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Password</label>
//           <input
//             {...register("password", { required: true, minLength: 6 })}
//             type="password"
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Date of Birth</label>
//           <input
//             {...register("dateOfBirth", { required: true })}
//             type="date"
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <button
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
//         >
//           {loading ? "Processing..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterAsEmployee;
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
      navigate(location?.state || "/");

      reset();
      console.log("Employee registered:", res.data);
      // console.log("Firebase user:", firebaseUser.user);
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
              {...register("name", { required: "Full Name is required" })}
              type="text"
              className="input input-bordered w-full bg-white/90"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className="file-input file-input-bordered w-full bg-white/90"
            />
            {errors.photo && (
              <p className="text-red-400 text-sm">{errors.photo.message}</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full bg-white/90"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 chars" },
              })}
              className="input input-bordered w-full bg-white/90"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              className="input input-bordered w-full bg-white/90"
            />
            {errors.dateOfBirth && (
              <p className="text-red-400 text-sm">
                {errors.dateOfBirth.message}
              </p>
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
