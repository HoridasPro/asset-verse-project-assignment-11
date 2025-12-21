import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const HrProfile = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-6">
      <div className="relative max-w-md w-full bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
        {/* HR Photo */}
        <div className="relative">
          <img
            src={user?.photoURL || "https://i.ibb.co/3pQ9Q6q/default-user.png"}
            alt="HR Manager"
            className="w-40 h-40 rounded-full mx-auto border-4 border-emerald-500 shadow-lg"
          />
          <span className="absolute bottom-3 right-1/2 translate-x-1/2 bg-emerald-500 text-white text-xs px-5 py-1 rounded-full shadow">
            HR Manager
          </span>
        </div>

        {/* HR Name & Email */}
        <h3 className="mt-6 text-3xl font-extrabold text-white">
          {user?.displayName || "HR Manager"}
        </h3>
        <p className="text-gray-200 mt-1">{user?.email}</p>
        <p className="mt-2 text-sm font-medium text-emerald-400">
          Company Administrator
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-white/30"></div>

        {/* Manage Options Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all"
        >
          Manage Options
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="mt-4 bg-white/30 backdrop-blur-md rounded-xl border border-white/20 shadow-inner">
            <ul className="py-2">
              <li className="px-6 py-3 hover:bg-emerald-50/50 transition">
                <Link
                  to="/hr-dashboard"
                  className="flex items-center gap-2 text-white font-medium"
                >
                  🧑‍💼 HR Dashboard
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-emerald-50/50 transition">
                <Link
                  to="/hr-dashboard/company-profile"
                  className="flex items-center gap-2 text-white font-medium"
                >
                  🏢 Company Profile
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-emerald-50/50 transition">
                <Link
                  to="/hr-dashboard/employees"
                  className="flex items-center gap-2 text-white font-medium"
                >
                  👥 Manage Employees
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-emerald-50/50 transition">
                <Link
                  to="/hr-dashboard/assets"
                  className="flex items-center gap-2 text-white font-medium"
                >
                  📦 Manage Assets
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HrProfile;
