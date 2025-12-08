 
import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOutUser } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user ? (
        ""
      ) : (
        <li>
          <NavLink to="/registerAsEmployee">Join as Employee</NavLink>
        </li>
      )}
      {user ? (
        ""
      ) : (
        <li>
          <NavLink to="/registerAsHRManager">Join as HR Manager</NavLink>
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    logOutUser().catch((error) => console.log(error));
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
          <div className="dropdown dropdown-end">
            {/* Profile Image Button */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/3pQ9Q6q/default-user.png"
                  }
                  alt="User"
                />
              </div>
            </label>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Display Name */}
              <li className="font-semibold text-center">
                {user.displayName ? user.displayName : "User"}
              </li>

              {/* EMPLOYEE DROPDOWN */}
              {user.role === "employee" && (
                <>
                  <li>
                    <Link to="/request-asset">Request Asset</Link>
                  </li>
                  <li>
                    <Link to="/my-assets">My Assets</Link>
                  </li>
                  <li>
                    <Link to="/my-team">My Team</Link>
                  </li>
                </>
              )}

              {/* HR MANAGER DROPDOWN */}
              {user.role === "HR Manager" && (
                <>
                  <li>
                    <Link to="/asset-list">Asset List</Link>
                  </li>
                  <li>
                    <Link to="/add-asset">Add Asset</Link>
                  </li>
                  <li>
                    <Link to="/all-requests">All Requests</Link>
                  </li>
                  <li>
                    <Link to="/employee-list">Employee List</Link>
                  </li>
                </>
              )}

              {/* Logout */}
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
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
