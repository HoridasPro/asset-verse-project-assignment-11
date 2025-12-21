import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const MyEmployeeList = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employee");
      return res.data;
    },
  });

  // Filter only employees
  const employees = users.filter((user) => user.role === "employee");

  // Fetch company info
  const { data: company = {} } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/company/info");
      return res.data;
    },
  });

  // Fetch all employee assigned assets
  const { data: employeeAssets = [] } = useQuery({
    queryKey: ["employeeAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employeeAssets");
      return res.data;
    },
  });

  // Handle Employee Delete
  const handleEmployeeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this employee from team?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`users/employee-team-delete/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Removed!", "Employee has been removed.", "success");
          }
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
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        My Employee List:{" "}
        <span className="text-white/90">
          {employees.length}/{company.employeeLimit || 5} employees used
        </span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-gray-800 shadow-xl rounded-lg overflow-hidden bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-4 py-2">SI NO</th>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Join Date</th>
              <th className="px-4 py-2">Assets Count</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => {
              const assetsCount = employeeAssets.filter(
                (asset) => asset.employeeEmail === employee.email
              ).length;

              return (
                <tr
                  key={employee._id}
                  className="odd:bg-white/10 even:bg-white/20 hover:scale-105 transform transition-all text-white"
                >
                  <th className="px-4 py-3">{index + 1}</th>
                  <td className="px-4 py-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={employee.photoURL}
                          alt={employee.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{employee.name}</td>
                  <td className="px-4 py-3">{employee.email}</td>
                  <td className="px-4 py-3">
                    {new Date(employee.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-indigo-600 text-white rounded-full font-semibold">
                      {assetsCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEmployeeDelete(employee._id)}
                      className="btn btn-square btn-sm bg-gradient-to-r from-red-400 to-red-600 hover:scale-110 transition-transform relative group rounded"
                    >
                      <FaRegTrashAlt />
                      <span className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                        Delete
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
