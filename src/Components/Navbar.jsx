import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import imgLogo from "../assets/assetLogo.png";
import { BiMoon, BiSun } from "react-icons/bi";

const Navbar = () => {
  const { role } = useRole();
  const { user, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogOut = () => {
    logOutUser();
    setIsOpen(false);
  };

  // ✅ Main Links + Additional Pages
  const links = (
    <>
      <li>
        <NavLink to="/" className="hover:text-indigo-200">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs" className="hover:text-indigo-200">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="hover:text-indigo-200">
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className="hover:text-indigo-200">
          Blog
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/em-dashboard" className="hover:text-indigo-200">
              Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hr-dashboard/asset-list"
              className="hover:text-indigo-200"
            >
              Join as HR Manager
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar shadow-md px-4 bg-gradient-to-r from-[#2B3C6A] via-[#3D4F80] to-[#5B6FA6] text-white sticky top-0 z-50">
      <div className="navbar-start gap-2">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost text-white">
            ☰
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#3D4F80] rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={imgLogo}
            alt="Company Logo"
            className="w-10 h-10 rounded-full border"
          />
          <h2 className="font-bold text-xl">Asset Verse</h2>
        </div>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          {theme === "dark" ? (
            <BiSun className="text-yellow-400" size={22} />
          ) : (
            <BiMoon className="text-white" size={22} />
          )}
        </button>

        {user ? (
          <div className="relative">
            <img
              src={
                user?.photoURL || "https://i.ibb.co/3pQ9Q6q/default-user.png"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#3D4F80] text-white shadow-lg rounded z-20">
                <ul>
                  <li className="p-2 text-center font-semibold border-b border-white/20">
                    {user?.displayName}
                  </li>

                  {role === "employee" && (
                    <>
                      <li className="p-2 hover:bg-indigo-500">
                        <Link to="/em-dashboard">Employee Dashboard</Link>
                      </li>
                      <li className="p-2 hover:bg-indigo-500">
                        <Link to="/emProfile">Profile</Link>
                      </li>
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <li className="p-2 hover:bg-indigo-500">
                        <Link to="/hr-dashboard">Admin Dashboard</Link>
                      </li>
                      <li className="p-2 hover:bg-indigo-500">
                        <Link to="/hrProfile">Profile</Link>
                      </li>
                    </>
                  )}

                  {role === "hr" && (
                    <>
                      <li className="p-2 hover:bg-indigo-500">
                        <Link to="/hr-dashboard/asset-list">HR Dashboard</Link>
                      </li>
                      <li className="p-2 hover:bg-indigo-500">
                        <Link to="/hrProfile">Profile</Link>
                      </li>
                    </>
                  )}

                  <li className="p-2 hover:bg-indigo-500">
                    <button onClick={handleLogOut} className="w-full text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
