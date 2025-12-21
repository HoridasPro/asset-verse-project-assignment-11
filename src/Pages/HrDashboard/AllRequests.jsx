import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const AllRequests = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);

  const { data: allRequests = [], refetch } = useQuery({
    queryKey: ["allRequests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requestAssets");
      return res.data;
    },
  });

  const updateAllRequestStatus = (id, status) => {
    axiosSecure.patch(`/requestAssets/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: status,
          text: `Employee status has been ${status}`,
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
    <div className="py-6 px-3 sm:px-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 min-h-screen">
      <p className="text-2xl sm:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        All Request Assets : {allRequests.length}
      </p>

      {/* Horizontal scroll for mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-white shadow-xl rounded-lg overflow-hidden bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <tr>
              <th className="px-4 py-3 text-center">SI</th>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-center">Asset</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allRequests.map((allRequest, index) => (
              <tr
                key={allRequest._id}
                className="odd:bg-white/10 even:bg-white/20 hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>

                <td className="px-4 py-3 text-sm sm:text-base font-medium">
                  {allRequest.employeeName}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10 sm:w-12 sm:h-12">
                        <img src={allRequest.productURL} alt="Asset" />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-center text-sm sm:text-base">
                  {new Date(allRequest.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                      allRequest.status === "approved"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                  >
                    {allRequest.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <button
                      onClick={() =>
                        updateAllRequestStatus(allRequest._id, "approved")
                      }
                      className="btn btn-square bg-gradient-to-r from-green-400 to-green-600 hover:scale-110 transition-transform"
                    >
                      <FaUserCheck />
                    </button>

                    <button
                      onClick={() =>
                        updateAllRequestStatus(allRequest._id, "rejected")
                      }
                      className="btn btn-square bg-gradient-to-r from-red-400 to-red-600 hover:scale-110 transition-transform"
                    >
                      <IoPersonRemove />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
