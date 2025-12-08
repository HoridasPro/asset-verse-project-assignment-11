// import React from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import { photoUpload } from "../../Utils/UploadPhoto";
// import useAxios from "./../../hooks/useAxios";

// const RegisterAsEmployee = ({ setUser }) => {
//   const { register, handleSubmit } = useForm();
//   const { registerUser, userProfileUpdate } = useAuth();
//   const axiosSecure = useAxios();

//   const handleEmployeeRegister = async (data) => {
//     try {
//       // 1️⃣ Upload photo
//       const imageFile = data.photo[0];
//       const photoURL = await photoUpload(imageFile);

//       // 2️⃣ Create Firebase Auth user
//       const firebaseUser = await registerUser(data.email, data.password);

//       // update user profile
//       const userProfile = {
//         displayName: data.name,
//         photoURL: photoURL,
//       };
//       await userProfileUpdate(userProfile);
//       console.log("user profile update done");

//       // 4️⃣ Create employee object
//       const employeeInfo = {
//         name: data.name,
//         email: data.email,
//         photo: photoURL,
//         role: "employee",
//       };
//       const res = await axiosSecure.post("employees", employeeInfo);
//       if (setUser) {
//         setUser(res.data);
//       }

//       console.log("Employee Info:", employeeInfo);
//       console.log("Firebase User:", firebaseUser.user);
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit(handleEmployeeRegister)}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">
//           Employee Registration
//         </h2>

//         <input
//           type="text"
//           placeholder="Employee Name"
//           className="input input-bordered w-full"
//           {...register("name", { required: true })}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="input input-bordered w-full"
//           {...register("email", { required: true })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="input input-bordered w-full"
//           {...register("password", { required: true })}
//         />

//         <input
//           type="file"
//           accept="image/*"
//           className="file-input file-input-bordered w-full"
//           {...register("photo", { required: true })}
//           placeholder="photo"
//         />

//         <button type="submit" className="btn btn-primary w-full">
//           Register As Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterAsEmployee;

import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";

const RegisterAsEmployee = ({ setUser }) => {
  const { register, handleSubmit } = useForm();
  const { registerUser, userProfileUpdate } = useAuth();
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
      });
      console.log("User profile updated successfully");

      // 4️⃣ Prepare employee object for backend
      const employeeInfo = {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "employee",
      };

      // 5️⃣ Send employee data to backend
      const res = await axiosSecure.post("/employees", employeeInfo);
      if (setUser) setUser(res.data);

      console.log("Employee registered successfully:", res.data);
      console.log("Firebase user:", firebaseUser.user);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please check the console for details.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleEmployeeRegister)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Employee Registration
        </h2>

        <input
          type="text"
          placeholder="Employee Name"
          className="input input-bordered w-full"
          {...register("name", { required: true })}
        />

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", { required: true })}
        />

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          {...register("photo", { required: true })}
        />

        <button type="submit" className="btn btn-primary w-full">
          Register As Employee
        </button>
      </form>
    </div>
  );
};

export default RegisterAsEmployee;
