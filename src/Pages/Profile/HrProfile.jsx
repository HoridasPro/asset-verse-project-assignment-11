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
