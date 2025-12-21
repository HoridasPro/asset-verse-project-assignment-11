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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-5">
        <Link
          className="btn bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 text-white font-bold px-6 py-3 rounded-full shadow-lg"
          to="/login"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-5">
      <div className="relative max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 text-center text-white">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={
              user?.photoURL
                ? user.photoURL
                : "https://i.ibb.co/3pQ9Q6q/default-user.png"
            }
            alt="Profile"
            className="w-48 h-48 rounded-full mx-auto border-4 border-emerald-600 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />

          {/* Role Badge */}
          <span className="absolute bottom-3 right-1/2 translate-x-1/2 bg-emerald-600 text-white text-xs px-5 py-1 rounded-full shadow font-semibold">
            {role === "admin" ? "HR Manager" : "Employee"}
          </span>
        </div>

        {/* Name */}
        <h3 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          {user?.displayName || "Unnamed User"}
        </h3>

        {/* Email */}
        <p className="text-white/90 text-sm mt-1">{user?.email}</p>

        {/* Role Info */}
        <p className="mt-2 text-sm font-medium text-emerald-600">
          {role === "admin" ? "Company Administrator" : "Employee"}
        </p>

        <div className="my-8 h-px bg-white/20"></div>

        {/* Dropdown / Options */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-outline btn-success w-full"
        >
          Manage Options
        </button>

        {isOpen && (
          <div className="mt-6 bg-gray-50/20 backdrop-blur-md rounded-xl border shadow-inner">
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
                <>
                  <li className="px-6 py-3 hover:bg-white/20 transition">
                    <Link to="/hr-dashboard">🧑‍💼 HR Dashboard</Link>
                  </li>
                  <li className="px-6 py-3 hover:bg-white/20 transition">
                    <Link to="/hr-dashboard/company-profile">
                      🏢 Company Profile
                    </Link>
                  </li>
                  <li className="px-6 py-3 hover:bg-white/20 transition">
                    <Link to="/hr-dashboard/employees">
                      👥 Manage Employees
                    </Link>
                  </li>
                  <li className="px-6 py-3 hover:bg-white/20 transition">
                    <Link to="/hr-dashboard/assets">📦 Manage Assets</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmProfile;
