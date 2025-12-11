import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const MyAssets = () => {
  const axiosSecure = useAxios();
  const [searchText, setSearchText] = useState("");

  // Filter Type
  const [filterType, setFilterType] = useState("Returnable");

  const { data: employeeAssets = [] } = useQuery({
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center mt-5">
        My Assigned Assets : {employeeAssets.length}
      </h2>

      {/* 🔍 Search + Filter Box */}
      <div className="flex items-center gap-2 mb-5 mx-auto w-[340px]">
        {/* Search */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 flex-1 bg-white shadow-sm">
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
            className="w-full bg-transparent focus:outline-none text-sm"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-full px-3 py-2 text-sm bg-white shadow-sm focus:outline-none "
        >
          <option value="All">All</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Table */}
      <table className="table w-full">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Asset Image</th>
            <th>Asset Name</th>
            <th>Asset Type</th>
            <th>Company Name</th>
            <th>Request Date</th>
            <th>Approval Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employeeAssets.map((employeeAsset, index) => (
            <tr key={employeeAsset._id}>
              <td>{index + 1}</td>
              <td>
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
              <td>{employeeAsset.productName}</td>
              <td>{employeeAsset.productType}</td>
              <td>{employeeAsset.companyName}</td>
              <td>{employeeAsset.requestDate}</td>
              <td>{employeeAsset.approvalDate}</td>
              <td>
                <p
                  className={`${
                    employeeAsset.status === "assigned" ? "text-green-500" : ""
                  }`}
                >
                  {employeeAsset.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssets;
