import React from "react";
import useAxios from "../../hooks/useAxios";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxios();
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
      console.log(res.data);

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

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Company Logo</th>
            <th>Name</th>
            <th>Compani Name</th>
            <th>Email</th>
            <th>HR User</th>
            <th>HR Admin</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {hrUsers.map((hrUser, index) => (
            <tr key={hrUser._id}>
              <th>{index + 1}</th>

              <td>
                <div className="flex flex-col items-center gap-2">
                  {hrUser?.role === "admin" && (
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={hrUser?.companyLogo} alt="Company Logo" />
                      </div>
                    </div>
                  )}

                  {hrUser?.role === "employee" && (
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img src={hrUser?.photoURL} alt="Employee Photo" />
                      </div>
                    </div>
                  )}
                </div>
              </td>

              <td>{hrUser.name}</td>
              <td>{hrUser.companyName}</td>
              <td>{hrUser.email}</td>
              <td>{hrUser.role}</td>

              <td>
                {hrUser.role === "admin" ? (
                  <button className="btn bg-red-500">
                    <FiShieldOff></FiShieldOff>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdminUser(hrUser)}
                    className="btn bg-green-300 btn-sm text-black font-bold"
                  >
                    <FaUserShield></FaUserShield>
                  </button>
                )}
              </td>
              <td>{new Date(hrUser.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
