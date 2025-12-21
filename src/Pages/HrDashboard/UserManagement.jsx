import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const UserManagement = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const { data: hrUsers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

  const handleAdminUser = (hrUser) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/hr-user/${hrUser._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${hrUser.name} marked as admin`,
          showConfirmButton: false,
          timer: 1800,
        });
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [setLoading]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-8 px-4">
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent mb-6">
        User Management : {hrUsers.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-gray-800 shadow-2xl rounded-lg overflow-hidden bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md text-white">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-4 py-2">SI NO</th>
              <th className="px-4 py-2">Company Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">HR User</th>
              <th className="px-4 py-2">HR Admin</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {hrUsers.map((hrUser, index) => (
              <tr
                key={hrUser._id}
                className="odd:bg-white/10 even:bg-white/20 hover:scale-105 transform transition-all"
              >
                <th className="px-4 py-3">{index + 1}</th>

                <td className="px-4 py-3 flex justify-center">
                  {hrUser.role === "admin" ? (
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={hrUser.companyLogo} alt="Company Logo" />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img src={hrUser.photoURL} alt="Employee Photo" />
                      </div>
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 font-medium">{hrUser.name}</td>
                <td className="px-4 py-3">{hrUser.companyName}</td>
                <td className="px-4 py-3">{hrUser.email}</td>
                <td className="px-4 py-3 font-semibold text-white">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      hrUser.role === "admin"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "bg-gradient-to-r from-blue-400 to-indigo-600"
                    }`}
                  >
                    {hrUser.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {hrUser.role === "admin" ? (
                    <button className="btn bg-red-500 hover:from-red-400 hover:to-red-600 text-white">
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdminUser(hrUser)}
                      className="btn bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 transition-transform text-white"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>

                <td className="px-4 py-3">
                  {new Date(hrUser.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
