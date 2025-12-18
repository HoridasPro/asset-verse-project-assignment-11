// import React, { useState } from "react";
// import { Link, NavLink } from "react-router";
// import useAuth from "../hooks/useAuth";
// import useRole from "../hooks/useRole";
// // import logoImg from "../assets/assetLogojpg.png";
// import imgLogo from "../assets/assetLogo.png";

// const Navbar = () => {
//   const { role } = useRole();
//   const { user, logOutUser } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   // const [currentUser, setCurrenctUser] = useState(null);
//   // console.log(user);

//   const links = (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {!user && (
//         <>
//           <li>
//             <NavLink to="/registerAsEmployee">Join as Employee</NavLink>
//           </li>
//           <li>
//             <NavLink to="/registerAsHRManager">Join as HR Manager</NavLink>
//           </li>
//         </>
//       )}
//     </>
//   );

//   const handleLogOut = () => {
//     logOutUser().catch((error) => console.log(error));
//     setIsOpen(false);
//   };

//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       {/* Left */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex="-1"
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
//           >
//             {links}
//           </ul>
//         </div>
//         {/* <figure className="">
//           <img className="rounded-full w-10 h-10" src={imgLogo} alt="" />
//         </figure> */}
//         <a className="btn btn-ghost text-xl">AssetVerse</a>
//       </div>

//       {/* Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>

//       {/* Right */}
//       <div className="navbar-end">
//         {role === "employee" || role === "admin" || role === "user" ? (
//           <div className="relative">
//             {/* Profile Image */}
//             <img
//               src={
//                 user?.photoURL
//                   ? user.photoURL
//                   : "https://i.ibb.co/3pQ9Q6q/default-user.png"
//               }
//               alt="Profile"
//               className="w-10 h-10 rounded-full cursor-pointer"
//               onClick={() => setIsOpen(!isOpen)}
//             />

//             {/* Dropdown Menu */}
//             {isOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-10">
//                 <ul>
//                   <li className="p-2 text-center font-semibold border-b">
//                     {user?.displayName || "User"}
//                   </li>

//                   {/* Employee Menu */}
//                   {role === "employee" && (
//                     <>
//                       <li className="p-2 hover:bg-gray-200">
//                         <Link to="/em-dashboard/my-assets">
//                           Employee Dashboard
//                         </Link>
//                       </li>
//                       <li className="p-2 hover:bg-gray-200">
//                         <Link to="/profile">Profile</Link>
//                       </li>
//                     </>
//                   )}

//                   {/* HR Manager Menu */}

//                   {role === "user" && (
//                     <>
//                       <li className="p-2 hover:bg-gray-200">
//                         <Link to="/hrProfile">Profile</Link>
//                       </li>
//                     </>
//                   )}
//                   {role === "user" && (
//                     <>
//                       <li className="p-2 hover:bg-gray-200">
//                         <Link to="/hr-dashboard">HR Dashboard</Link>
//                       </li>
//                       <li className="p-2 hover:bg-gray-200">
//                         <Link to="/hrProfile">Profile</Link>
//                       </li>
//                     </>
//                   )}

//                   {/* Logout */}
//                   <li className="p-2 hover:bg-gray-200">
//                     <button onClick={handleLogOut} className="w-full text-left">
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link to="/login" className="btn">
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
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

        {/* HR হলে Company Logo */}
        {user?.companyLogo ? (
          <div className="flex items-center gap-2">
            <img
              src={user.companyLogo}
              alt="Company Logo"
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-semibold text-lg">AssetVerse</span>
          </div>
        ) : (
          // Default App Logo
          <div className="flex items-center gap-2">
            <img src={imgLogo} className="w-8 h-8" alt="AssetVerse" />
            <span className="font-semibold text-lg">AssetVerse</span>
          </div>
        )}
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT */}
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
                        <Link to="/em-dashboard/my-assets">
                          Employee Dashboard
                        </Link>
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
