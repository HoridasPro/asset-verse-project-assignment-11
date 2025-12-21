import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DownloadAssignedList from "../../Components/DownloadAssignedList/DownloadAssignedList";
import Loading from "../../Loading/Loading";

const MyAssets = () => {
  const axiosSecure = useAxios();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // Filter Type
  const [filterType, setFilterType] = useState("All");

  const { data: employeeAssets = [], refetch } = useQuery({
    queryKey: ["employeeAssets", searchText, filterType],
    queryFn: async () => {
      let url = `/employeeAssets`;
      const params = [];

      if (searchText) params.push(`searchText=${searchText}`);
      if (filterType !== "All") params.push(`type=${filterType}`);

      if (params.length) url += `?${params.join("&")}`;

      const res = await axiosSecure.get(url);

      return res.data;
    },
  });

  // Return button
  const handleReturn = async (asset) => {
    Swal.fire({
      title: "Return Asset?",
      text: `Are you sure you want to return ${asset.productType}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Return",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/employeeAssets/return/${asset._id}`
        );

        if (res.data.modifiedCount > 0 || res.data.success) {
          refetch();
          Swal.fire("Returned!", "Your asset has been returned.", "success");
        }
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        My Assigned Assets : {employeeAssets.length}
      </h2>

      <div className="flex items-center gap-2 mb-6 mx-auto w-[340px]">
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 flex-1 bg-white/20 backdrop-blur-md shadow-sm">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            type="search"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by product name"
            className="w-full bg-transparent focus:outline-none text-sm text-white placeholder-gray-300"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-full px-3 py-2 text-sm backdrop-blur-md shadow-sm focus:outline-none text-white"
        >
          <option value="All" className="text-black">
            All
          </option>
          <option value="Returnable" className="text-black">
            Returnable
          </option>
          <option value="Non-returnable" className="text-black">
            Non-returnable
          </option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-white rounded-lg overflow-hidden bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md shadow-2xl">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-4 py-2">SI NO</th>
              <th className="px-4 py-2">Asset Image</th>
              <th className="px-4 py-2">Asset Name</th>
              <th className="px-4 py-2">Asset Type</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Request Date</th>
              <th className="px-4 py-2">Approval Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeAssets.map((employeeAsset, index) => (
              <tr
                key={employeeAsset._id}
                className="odd:bg-white/10 even:bg-white/20 hover:scale-105 transform transition-all"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={employeeAsset.productURL}
                          alt={employeeAsset.productName}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{employeeAsset.productName}</td>
                <td className="px-4 py-3">{employeeAsset.productType}</td>
                <td className="px-4 py-3">{employeeAsset.companyName}</td>
                <td className="px-4 py-3">{employeeAsset.createdAt}</td>
                <td className="px-4 py-3">{employeeAsset.approvalDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-bold px-2 py-1 rounded-full ${
                      employeeAsset.status?.toLowerCase() === "approved"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                  >
                    {employeeAsset.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {employeeAsset.status?.toLowerCase() === "approved" &&
                    employeeAsset.productType?.toLowerCase() ===
                      "returnable" && (
                      <button
                        onClick={() => handleReturn(employeeAsset)}
                        className="btn btn-sm text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform"
                      >
                        Return
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {employeeAssets.length === 0 ? (
        ""
      ) : (
        <DownloadAssignedList></DownloadAssignedList>
      )}
    </div>
  );
};

export default MyAssets;
