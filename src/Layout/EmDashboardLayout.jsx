import React from "react";
import { MdOutlinePayment, MdWebAsset } from "react-icons/md";
import { RiPlayListAddFill, RiTeamFill } from "react-icons/ri";
import { NavLink } from "react-router";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { AiFillProfile } from "react-icons/ai";
import { IoGitPullRequest } from "react-icons/io5";
import img from "../assets/react.svg";

const EmDashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-2xl font-bold">Employee Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <Link to="/">
                <img src={img} alt="" />
              </Link>
            </li>
            {/* List item */}
            <li>
              <Link
                to="/em-dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home Page"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* List item */}
            {role === "employee" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My-Assets"
                    to="/em-dashboard/my-assets"
                  >
                    <MdWebAsset className="text-xl"></MdWebAsset>
                    <span className="is-drawer-close:hidden">My-assets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Request-Asset"
                    to="/em-dashboard/request-asset"
                  >
                    <IoGitPullRequest
                      IoGitPullRequest
                      className="text-xl"
                    ></IoGitPullRequest>
                    <span className="is-drawer-close:hidden">
                      Request Assets
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My-Team"
                    to="/em-dashboard/my-team"
                  >
                    <RiTeamFill className="text-xl"></RiTeamFill>
                    <span className="is-drawer-close:hidden">My-Team</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Profile-Page"
                    to="/em-dashboard/profile-page"
                  >
                    <AiFillProfile className="text-xl"></AiFillProfile>
                    <span className="is-drawer-close:hidden">
                      Profile Page (Shared)
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmDashboardLayout;
