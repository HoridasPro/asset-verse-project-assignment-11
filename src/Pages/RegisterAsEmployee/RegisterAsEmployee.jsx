import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";

const RegisterAsEmployee = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, userProfileUpdate, loading } = useAuth();
  const axiosSecure = useAxios();

  const handleEmployeeRegister = async (data) => {
    try {
      // 1️⃣ Upload photo
      const imageFile = data.photo[0];
      const photoURL = await photoUpload(imageFile);

      // 2️⃣ Create Firebase Auth user
      const firebaseUser = await registerUser(data.email, data.password);

      // 3️⃣ Update Firebase user profile
      await userProfileUpdate({
        displayName: data.name,
        photoURL: photoURL,
        role: "employee",
      });
      console.log("User profile updated successfully for the employee");

       

      const employeeInfo = {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        photoURL: photoURL,
        role: "employee",
        createdAt: new Date(),
      };

      // 5️⃣ Send employee data to backend
      const res = await axiosSecure.post("/em-users", employeeInfo);
      if (setUser) {
        setUser(res.data);
      }

      console.log("Employee registered successfully:", res.data);
      console.log("Firebase user:", firebaseUser.user);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please check the console for details.");
    }
  };

  return (
    
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Register as Employee</h2>

      <form
        onSubmit={handleSubmit(handleEmployeeRegister)}
        className="space-y-4"
      >
        <div>
          <label className="font-medium">Full Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-medium">Photo</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("photo", { required: true })}
            placeholder="photo"
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium">Date of Birth</label>
          <input
            {...register("dateOfBirth", { required: true })}
            type="date"
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
        >
          {loading ? "Processing..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterAsEmployee;
