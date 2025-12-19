// import React, { useState } from "react";
// import useAxios from "../../hooks/useAxios";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// const MyAssets = () => {
//   const axiosSecure = useAxios();
//   const [searchText, setSearchText] = useState("");

//   // Filter Type
//   const [filterType, setFilterType] = useState("All");

//   const { data: employeeAssets = [], refetch } = useQuery({
//     queryKey: ["employeeAssets", searchText, filterType],
//     queryFn: async () => {
//       let url = `/employeeAssets`;
//       const params = [];

//       if (searchText) params.push(`searchText=${searchText}`);
//       if (filterType !== "All") params.push(`type=${filterType}`);

//       if (params.length) url += `?${params.join("&")}`;

//       const res = await axiosSecure.get(url);

//       return res.data;
//     },
//   });

//   // retun button
//   const handleReturn = async (asset) => {
//     Swal.fire({
//       title: "Return Asset?",
//       text: `Are you sure you want to return ${asset.productType}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Return",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const res = await axiosSecure.patch(
//           `/employeeAssets/return/${asset._id}`
//         );

//         if (res.data.modifiedCount > 0 || res.data.success) {
//           refetch(); // update UI
//           Swal.fire("Returned!", "Your asset has been returned.", "success");
//         }
//       }
//     });
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-center mt-5">
//         My Assigned Assets : {employeeAssets.length}
//       </h2>

//       {/* 🔍 Search + Filter Box */}
//       <div className="flex items-center gap-2 mb-5 mx-auto w-[340px]">
//         {/* Search */}
//         <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 flex-1 bg-white shadow-sm">
//           <svg
//             className="h-5 w-5 opacity-50"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//           >
//             <g
//               strokeLinejoin="round"
//               strokeLinecap="round"
//               strokeWidth="2.5"
//               fill="none"
//               stroke="currentColor"
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <path d="m21 21-4.3-4.3"></path>
//             </g>
//           </svg>

//           <input
//             type="search"
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder="Search by product name"
//             className="w-full bg-transparent focus:outline-none text-sm"
//           />
//         </div>

//         {/* Filter Dropdown */}
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="border border-gray-300 rounded-full px-3 py-2 text-sm bg-white shadow-sm focus:outline-none "
//         >
//           <option value="All">All</option>
//           <option value="Returnable">Returnable</option>
//           <option value="Non-returnable">Non-returnable</option>
//         </select>
//       </div>

//       {/* Table */}
//       <table className="table w-full">
//         <thead>
//           <tr>
//             <th>SI NO</th>
//             <th>Asset Image</th>
//             <th>Asset Name</th>
//             <th>Asset Type</th>
//             <th>Company Name</th>
//             <th>Request Date</th>
//             <th>Approval Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employeeAssets.map((employeeAsset, index) => (
//             <tr key={employeeAsset._id}>
//               <td>{index + 1}</td>
//               <td>
//                 <div className="flex items-center gap-3">
//                   <div className="avatar">
//                     <div className="mask mask-squircle h-12 w-12">
//                       <img
//                         src={employeeAsset.productURL}
//                         alt={employeeAsset.productName}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </td>
//               <td>{employeeAsset.productName}</td>
//               <td>{employeeAsset.productType}</td>
//               <td>{employeeAsset.companyName}</td>
//               <td>{employeeAsset.createdAt}</td>
//               <td>{employeeAsset.approvalDate}</td>
//               <td>
//                 <p
//                   className={`${
//                     employeeAsset.status === "Approved" ? "text-green-500" : ""
//                   }`}
//                 >
//                   {employeeAsset.status}
//                 </p>
//               </td>
//               {/* retun button */}
//               <td>
//                 {employeeAsset.status === "Approved" &&
//                   employeeAsset.productType === "Returnable" && (
//                     <button
//                       onClick={() => handleReturn(employeeAsset)}
//                       className="btn btn-sm btn-warning"
//                     >
//                       Return
//                     </button>
//                   )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyAssets;

import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyAssets = () => {
  const axiosSecure = useAxios();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");

  const { data: employeeAssets = [], refetch } = useQuery({
    queryKey: ["employeeAssets", searchText, filterType],
    queryFn: async () => {
      let url = "/employeeAssets";
      const params = [];

      if (searchText) params.push(`searchText=${searchText}`);
      if (filterType !== "All") params.push(`type=${filterType.toLowerCase()}`);

      if (params.length) url += `?${params.join("&")}`;

      const res = await axiosSecure.get(url);
      return res.data;
    },
  });
  console.log(employeeAssets);

  // ✅ Return Asset
  const handleReturn = async (asset) => {
    Swal.fire({
      title: "Return Asset?",
      text: `Are you sure you want to return ${asset.productName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Return",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/employeeAssets/return/${asset._id}`
          );

          if (res.data.modifiedCount > 0 || res.data.success) {
            refetch();
            Swal.fire("Returned!", "Your asset has been returned.", "success");
          } else {
            Swal.fire("Failed", "Asset not returned", "error");
          }
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center mt-5">
        My Assigned Assets : {employeeAssets.length}
      </h2>

      {/* 🔍 Search + Filter */}
      <div className="flex items-center gap-2 mb-5 mx-auto w-[340px]">
        <input
          type="search"
          placeholder="Search by product name"
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full rounded-full"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select select-bordered rounded-full"
        >
          <option value="All">All</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* 📋 Table */}
      <table className="table w-full">
        <thead>
          <tr>
            <th>SI</th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Company</th>
            <th>Request</th>
            <th>Approval</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employeeAssets.map((asset, index) => (
            <tr key={asset._id}>
              <td>{index + 1}</td>

              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={asset.productURL} alt={asset.productName} />
                  </div>
                </div>
              </td>

              <td>{asset.productName}</td>

              <td className="capitalize">{asset.productType}</td>

              <td>{asset.companyName}</td>

              <td>
                {asset.createdAt
                  ? new Date(asset.createdAt).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                {asset.approvalDate
                  ? new Date(asset.approvalDate).toLocaleDateString()
                  : "-"}
              </td>

              <td
                className={`${
                  asset.status?.toLowerCase() === "approved"
                    ? "text-green-500"
                    : ""
                }`}
              >
                {asset.status}
              </td>

              {/* ✅ FIXED BUTTON CONDITION */}
              <td>
                {asset.status?.toLowerCase() === "approved" &&
                  asset.productType?.toLowerCase() === "returnable" && (
                    <button
                      onClick={() => handleReturn(asset)}
                      className="btn btn-sm btn-warning"
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
  );
};

export default MyAssets;
