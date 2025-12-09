// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAxios from "../../hooks/useAxios";
// import { useNavigate } from "react-router";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../../firebase/firebase.config";
// import axios from "axios";

// const HrRegister = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const axiosPublic = useAxios();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       // 1️⃣ Company Logo Upload to imgbb
//       const logoFile = { image: data.companyLogo[0] };
//       const res = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         logoFile,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const logoURL = res.data.data.url;

//       // 2️⃣ Create Firebase User
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );

//       await updateProfile(auth.currentUser, {
     
//         displayName: data.name,
//         photoURL: logoURL,
//       });

//       // 3️⃣ Save HR data to Database
//       const hrData = {
//         name: data.name,
//         companyName: data.companyName,
//         companyLogo: logoURL,
//         email: data.email,
//         dateOfBirth: data.dateOfBirth,
//         role: "hr",
//         password: data.password,
//         packageLimit: 5,
//         currentEmployees: 0,
//         subscription: "basic",
//         createdAt: new Date(),
//       };

//       await axiosPublic.post("/users", hrData);

//       setLoading(false);
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Register as HR Manager</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
//           <label className="font-medium">Company Name</label>
//           <input
//             {...register("companyName", { required: true })}
//             type="text"
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Company Logo</label>
//           <input
//             {...register("companyLogo", { required: true })}
//             type="file"
//             className="w-full"
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
//           className="w-full bg-blue-600 text-white py-2 rounded"
//         >
//           {loading ? "Processing..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default HrRegister;
