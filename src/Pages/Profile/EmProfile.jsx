// import React, { useState } from "react";

// import useAuth from "../../hooks/useAuth";
// import useRole from "../../hooks/useRole";
// import { Link } from "react-router";

// const EmProfile = () => {
//   const { role } = useRole();
//   const { user } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   if (!user) {
//     return (
//       <Link to="/login" className="btn btn-primary">
//         Login
//       </Link>
//     );
//   }

//   return (
//     <div className="relative max-w-sm mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
//       {/* Profile Image */}
//       <div className="relative">
//         <img
//           src={
//             user?.photoURL
//               ? user.photoURL
//               : "https://i.ibb.co/3pQ9Q6q/default-user.png"
//           }
//           alt="Profile"
//           className="w-44 h-44 rounded-full mx-auto cursor-pointer border-4 border-indigo-500 shadow-lg hover:scale-105 transition"
//           onClick={() => setIsOpen(!isOpen)}
//         />

//         {/* Role Badge */}
//         <span className="absolute bottom-3 right-1/2 translate-x-1/2 bg-indigo-600 text-white text-xs px-4 py-1 rounded-full shadow">
//           {role === "admin" ? "HR Manager" : "Employee"}
//         </span>
//       </div>

//       {/* Name */}
//       <h3 className="mt-6 text-2xl font-bold text-gray-800">
//         {user?.displayName || "Unnamed User"}
//       </h3>

//       {/* Email */}
//       <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

//       {/* Divider */}
//       <div className="my-6 h-px bg-gray-200"></div>

//       {/* Dropdown Menu */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="btn btn-outline btn-primary w-full"
//       >
//         View Options
//       </button>

//       {isOpen && (
//         <div className="mt-4 bg-gray-50 border rounded-xl shadow-inner">
//           <ul className="py-2">
//             {role === "employee" && (
//               <>
//                 <li className="px-6 py-3 hover:bg-indigo-50 transition">
//                   <Link to="/em-dashboard/my-assets">
//                     📁 Employee Dashboard
//                   </Link>
//                 </li>
//                 <li className="px-6 py-3 hover:bg-indigo-50 transition">
//                   <Link to="/em-dashboard/profile">👤 My Profile</Link>
//                 </li>
//               </>
//             )}

//             {role === "admin" && (
//               <li className="px-6 py-3 hover:bg-indigo-50 transition">
//                 <Link to="/hr-dashboard">🧑‍💼 HR Dashboard</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmProfile;

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Link } from "react-router";

const EmProfile = () => {
  const { role } = useRole();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        <Link className="btn btn-gradient w-full max-w-xs" to="/login">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-5">
      <div className="relative max-w-sm w-full bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-500 rounded-2xl shadow-2xl p-8 text-center text-white">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={
              user?.photoURL
                ? user.photoURL
                : "https://i.ibb.co/3pQ9Q6q/default-user.png"
            }
            alt="Profile"
            className="w-44 h-44 rounded-full mx-auto cursor-pointer border-4 border-gradient-to-r from-yellow-400 via-red-400 to-pink-400 shadow-lg hover:scale-105 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          />

          {/* Role Badge */}
          <span className="absolute bottom-3 right-1/2 translate-x-1/2 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 text-black text-xs px-4 py-1 rounded-full shadow font-semibold">
            {role === "admin" ? "HR Manager" : "Employee"}
          </span>
        </div>

        {/* Name */}
        <h3 className="mt-6 text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
          {user?.displayName || "Unnamed User"}
        </h3>

        {/* Email */}
        <p className="text-white/90 text-sm mt-1">{user?.email}</p>

        {/* Divider */}
        <div className="my-6 h-px bg-white/30"></div>

        {/* Dropdown Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn w-full bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 hover:scale-105 transition-transform text-black font-bold"
        >
          View Options
        </button>

        {isOpen && (
          <div className="mt-4 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 border rounded-xl shadow-inner">
            <ul className="py-2">
              {role === "employee" && (
                <>
                  <li className="px-6 py-3 hover:bg-white/20 transition">
                    <Link to="/em-dashboard/my-assets">
                      📁 Employee Dashboard
                    </Link>
                  </li>
                  <li className="px-6 py-3 hover:bg-white/20 transition">
                    <Link to="/em-dashboard/profile">👤 My Profile</Link>
                  </li>
                </>
              )}

              {role === "admin" && (
                <li className="px-6 py-3 hover:bg-white/20 transition">
                  <Link to="/hr-dashboard">🧑‍💼 HR Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmProfile;
