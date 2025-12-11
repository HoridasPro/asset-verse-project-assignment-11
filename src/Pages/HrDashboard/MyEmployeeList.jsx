import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const axiosSecure = useAxios();

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employee"); // backend: all users
      return res.data;
    },
  });

  // Filter only employees
  const employees = users.filter((user) => user.role === "employee");

  // Fetch all employee assigned assets
  const { data: employeeAssets = [] } = useQuery({
    queryKey: ["employeeAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employeeAssets");
      return res.data;
    },
  });

  // // // Handle Employee Delete
  const handleEmployeeDelete = (id) => {
    console.log(id);
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center mt-5">
        My Employee List: {employees.length} employees
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>SI NO</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => {
              const assetsCount = employeeAssets.filter(
                (asset) => asset.employeeEmail === employee.email
              ).length;

              return (
                <tr key={employee._id}>
                  <th>{index + 1}</th>
                  <td>
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
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td>{assetsCount}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEmployeeDelete(employee._id)}
                      className="btn btn-square btn-sm hover:bg-red-500 relative group rounded"
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
