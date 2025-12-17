import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const { role } = useRole();
  const { user, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // const [currentUser, setCurrenctUser] = useState(null);
  // console.log(user);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/registerAsEmployee">Join as Employee</NavLink>
          </li>
          <li>
            <NavLink to="/registerAsHRManager">Join as HR Manager</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOutUser().catch((error) => console.log(error));
    setIsOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">AssetVerse</a>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end">
        {user ? (
          <div className="relative">
            {/* Profile Image */}
            <img
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://i.ibb.co/3pQ9Q6q/default-user.png"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-10">
                <ul>
                  <li className="p-2 text-center font-semibold border-b">
                    {user?.displayName || "User"}
                  </li>

                  {/* Employee Menu */}
                  {role === "employee" && (
                    <>
                      <li className="p-2 hover:bg-gray-200">
                        <Link to="/em-dashboard/my-assets">
                          Employee Dashboard
                        </Link>
                      </li>
                    </>
                  )}

                  {/* HR Manager Menu */}

                  {role === "admin" && (
                    <>
                      <li className="p-2 hover:bg-gray-200">
                        <Link to="/hr-dashboard">HR Dashboard</Link>
                      </li>
                    </>
                  )}

                  {/* Logout */}
                  <li className="p-2 hover:bg-gray-200">
                    <button onClick={handleLogOut} className="w-full text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
