import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import imgLogo from "../assets/assetLogo.png";

const Navbar = () => {
  const { role } = useRole();
  const { user, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/em-dashboard">Join as Employee</NavLink>
      </li>
      <li>
        <NavLink to="/hr-dashboard">Join as HR Manager</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOutUser();
    setIsOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT */}
      <div className="navbar-start gap-2">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            ☰
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {user?.companyLogo ? (
          <div className="flex items-center gap-2">
            <img
              src={user.companyLogo}
              alt="Company Logo"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <img src={imgLogo} className="w-8 h-8" alt="AssetVerse" />
          </div>
        )}
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <img
              src={
                user?.photoURL || "https://i.ibb.co/3pQ9Q6q/default-user.png"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-20">
                <ul>
                  <li className="p-2 text-center font-semibold border-b">
                    {user?.displayName}
                  </li>

                  {role === "employee" && (
                    <>
                      <li className="p-2 hover:bg-gray-200">
                        <Link to="/em-dashboard">Employee Dashboard</Link>
                      </li>
                      <li className="p-2 hover:bg-gray-200">
                        <Link to="/emProfile">Profile</Link>
                      </li>
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <li className="p-2 hover:bg-gray-200">
                        <Link to="/hr-dashboard">HR Dashboard</Link>
                      </li>
                      <li className="p-2 hover:bg-gray-200">
                        <Link to="/hrProfile">Profile</Link>
                      </li>
                    </>
                  )}

                  <li className="p-2 hover:bg-gray-200">
                    <Link to="/">
                      <button onClick={handleLogOut}>Logout</button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
