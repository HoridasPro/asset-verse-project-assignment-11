import React, { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const HrProfile = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-10 text-center">
      {/* Company / HR Logo */}
      <div className="relative">
        <img
          src={user?.photoURL || "https://i.ibb.co/3pQ9Q6q/default-user.png"}
          alt="HR Manager"
          className="w-48 h-48 rounded-full mx-auto border-4
          border-emerald-600 shadow-lg"
        />

        {/* HR Badge */}
        <span
          className="absolute bottom-3 right-1/2 translate-x-1/2
        bg-emerald-600 text-white text-xs px-5 py-1 rounded-full shadow"
        >
          HR Manager
        </span>
      </div>

      {/* HR Name */}
      <h3 className="mt-6 text-3xl font-bold text-gray-800">
        {user?.displayName || "HR Manager"}
      </h3>

      {/* Email */}
      <p className="text-gray-500 mt-1">{user?.email}</p>

      {/* Role Info */}
      <p className="mt-2 text-sm font-medium text-emerald-600">
        Company Administrator
      </p>

      {/* Divider */}
      <div className="my-8 h-px bg-gray-200"></div>

      {/* Actions */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-outline btn-success w-full"
      >
        Manage Options
      </button>

      {/* HR Menu */}
      {isOpen && (
        <div className="mt-6 bg-gray-50 rounded-xl border shadow-inner">
          <ul className="py-2">
            <li className="px-6 py-3 hover:bg-emerald-50 transition">
              <Link to="/hr-dashboard">🧑‍💼 HR Dashboard</Link>
            </li>
            <li className="px-6 py-3 hover:bg-emerald-50 transition">
              <Link to="/hr-dashboard/company-profile">🏢 Company Profile</Link>
            </li>
            <li className="px-6 py-3 hover:bg-emerald-50 transition">
              <Link to="/hr-dashboard/employees">👥 Manage Employees</Link>
            </li>
            <li className="px-6 py-3 hover:bg-emerald-50 transition">
              <Link to="/hr-dashboard/assets">📦 Manage Assets</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HrProfile;

// import React, { useState } from "react";
// import { Link } from "react-router";
// import useAuth from "../../hooks/useAuth";

// const HrProfile = () => {
//   const { user } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 py-10">
//       <div className="w-full max-w-lg bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
//         {/* Profile Picture */}
//         <div className="relative">
//           <img
//             src={user?.photoURL || "https://i.ibb.co/3pQ9Q6q/default-user.png"}
//             alt="HR Manager"
//             className="w-40 h-40 rounded-full mx-auto border-4 border-emerald-500 shadow-lg"
//           />
//           <span className="absolute bottom-2 right-1/2 translate-x-1/2 bg-emerald-500 text-white text-xs px-4 py-1 rounded-full shadow">
//             HR Manager
//           </span>
//         </div>

//         {/* Name & Email */}
//         <h3 className="mt-6 text-3xl font-extrabold text-white text-center">
//           {user?.displayName || "HR Manager"}
//         </h3>
//         <p className="text-gray-200 text-center mt-1">{user?.email}</p>
//         <p className="mt-2 text-sm font-semibold text-emerald-400 text-center">
//           Company Administrator
//         </p>

//         {/* Divider */}
//         <div className="my-6 h-px bg-white/30"></div>

//         {/* Manage Options Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105 transition-transform shadow-lg cursor-pointer"
//         >
//           Manage Options
//         </button>

//         {/* HR Menu */}
//         {isOpen && (
//           <div className="mt-5 bg-white/20 backdrop-blur-md rounded-xl shadow-inner p-2">
//             <ul className="space-y-2">
//               <li className="px-4 py-2 rounded hover:bg-white/30 transition">
//                 <Link to="/hr-dashboard" className="text-white font-medium">
//                   🧑‍💼 HR Dashboard
//                 </Link>
//               </li>
//               <li className="px-4 py-2 rounded hover:bg-white/30 transition">
//                 <Link
//                   to="/hr-dashboard/company-profile"
//                   className="text-white font-medium"
//                 >
//                   🏢 Company Profile
//                 </Link>
//               </li>
//               <li className="px-4 py-2 rounded hover:bg-white/30 transition">
//                 <Link
//                   to="/hr-dashboard/employees"
//                   className="text-white font-medium"
//                 >
//                   👥 Manage Employees
//                 </Link>
//               </li>
//               <li className="px-4 py-2 rounded hover:bg-white/30 transition">
//                 <Link
//                   to="/hr-dashboard/assets"
//                   className="text-white font-medium"
//                 >
//                   📦 Manage Assets
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HrProfile;
