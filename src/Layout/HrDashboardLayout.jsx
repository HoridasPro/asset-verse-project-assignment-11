import React from "react";
import { BiGitPullRequest } from "react-icons/bi";
import { MdOutlinePayment, MdWebAsset } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { NavLink } from "react-router";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { FaUsers } from "react-icons/fa";
import { GrUpgrade } from "react-icons/gr";
import { FaUsersCog } from "react-icons/fa";
import img from "../assets/react.svg";

const HrDashboardLayout = () => {
  const { role } = useRole();

  return (
    <>
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
            <div className="px-4 text-2xl font-bold">HR Manager Dashboard</div>
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
              {/* List item */}
              <li>
                <Link to="/">
                  <img src={img} alt="" />
                </Link>
              </li>
              <li>
                <Link
                  to="/hr-dashboard"
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

              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Asset List"
                      to="/hr-dashboard/asset-list"
                    >
                      <RiPlayListAddFill className="text-xl"></RiPlayListAddFill>
                      <span className="is-drawer-close:hidden">
                        Asset List (Main Dashboard)
                      </span>
                    </NavLink>
                  </li>
                  {/* List item */}
                  <li>
                    <NavLink
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Add Asset"
                      to="/hr-dashboard/add-asset"
                    >
                      <MdWebAsset className="text-xl"></MdWebAsset>
                      <span className="is-drawer-close:hidden">Add Asset</span>
                    </NavLink>
                  </li>

                  {/* add list */}

                  <li>
                    <NavLink
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="All Requests"
                      to="/hr-dashboard/all-requests"
                    >
                      <BiGitPullRequest className="text-xl"></BiGitPullRequest>
                      <span className="is-drawer-close:hidden">
                        All Requests
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My-Employees"
                      to="/hr-dashboard/My-employee"
                    >
                      <FaUsers className="text-xl"></FaUsers>
                      <span className="is-drawer-close:hidden">
                        My-employees List
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="User Management"
                      to="/hr-dashboard/user-management"
                    >
                      <FaUsersCog className="text-xl"></FaUsersCog>
                      <span className="is-drawer-close:hidden">
                        User Management
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Upgrade-Pakage"
                      to="/hr-dashboard/upgrade-pakage"
                    >
                      <GrUpgrade className="text-xl"></GrUpgrade>
                      <span className="is-drawer-close:hidden">
                        Upgrade Package
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History"
                  to="/hr-dashboard/payment-history"
                >
                  <MdOutlinePayment className="text-xl"></MdOutlinePayment>
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </NavLink>
              </li>

              {/* payment history */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HrDashboardLayout;
