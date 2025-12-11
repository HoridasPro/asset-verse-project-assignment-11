import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaEdit, FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
// import Swal from "sweetalert2";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const AllRequests = () => {
  // const {user}=useAuth()
  const axiosSecure = useAxios();
  const { data: allRequests = [], refetch } = useQuery({
    queryKey: ["allRequests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requestAssets");
      return res.data;
    },
  });

  const updateAllRequestStatus = (id, status) => {
    const updateInfo = { status: status };

    axiosSecure.patch(`/requestAssets/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${status}`,
          text: `Employee status has been ${status}`,
          showConfirmButton: false,
          timer: 1800,
        });
      }
    });
  };

  // Request approve
  const handleAproval = (id) => {
    updateAllRequestStatus(id, "approved");
  };
  // Request reject
  const handleRejection = (id) => {
    updateAllRequestStatus(id, "rejected");
  };

  return (
    <div className="overflow-x-auto">
      <p className="text-2xl font-bold">All Request Aeets : {allRequests.length}</p>
      <table className="table">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Employee</th>
            <th>Asset</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allRequests.map((allRequest, index) => (
            <tr key={allRequest._id}>
              <th>{index + 1}</th>
              <td>
                <div>{allRequest.empplyeeName}</div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={allRequest.productURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>{allRequest.createdAt}</div>
              </td>
              <td>
                <div>
                  <p
                    className={`${
                      allRequest.status === "approved"
                        ? "text-green-500"
                        : "text-red-400"
                    }`}
                  >
                    {allRequest.status}
                  </p>
                </div>
              </td>

              <td>
                <button
                  onClick={() => handleAproval(allRequest._id)}
                  className="btn btn-square hover:bg-primary relative group rounded mr-2"
                >
                  <FaUserCheck />
                  <span
                    className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2
                       bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    Approve
                  </span>
                </button>
                <button
                  onClick={() => handleRejection(allRequest._id)}
                  className="btn btn-square hover:bg-primary relative group rounded"
                >
                  <IoPersonRemove />
                  <span
                    className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2
                       bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    Reject
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRequests;

// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxios from "../../hooks/useAxios";
// import useAuth from "../../hooks/useAuth";

// const AllRequests = () => {
// const axiosSecure = useAxios();
// const { user } = useAuth();
// const queryClient = useQueryClient();

// // Fetch all requests
// const { data: allRequests = [], isLoading } = useQuery({
//   queryKey: ["allRequests", user?.email],
//   queryFn: async () => {
//     const res = await axiosSecure.get("/requestAssets");
//     return res.data;
//   },
// });

// // Approve Mutation
// const approveMutation = useMutation({
//   mutationFn: async (id) => axiosSecure.patch(`/requestAssets/${id}`),
//   onSuccess: () => queryClient.invalidateQueries(["allRequests"]),
// });

// // Reject Mutation
// const rejectMutation = useMutation({
//   mutationFn: async (id) => axiosSecure.patch(`/requestAssets/${id}`),
//   onSuccess: () => queryClient.invalidateQueries(["allRequests"]),
// });

// if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="overflow-x-auto p-6">
//       <table className="table w-full border">
//         <thead>
//           <tr>
//             <th>SI NO</th>
//             <th>Employee</th>
//             <th>Photo</th>
//             <th>Asset</th>
//             <th>Type</th>
//             <th>Quantity</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allRequests.map((allRequest, index) => (
//             <tr key={allRequest._id}>
//               <th>{index + 1}</th>
//               <td>{allRequest.productName}</td>
//               <td>
//                 <div className="avatar">
//                   <div className="mask mask-squircle h-12 w-12">
//                     <img
//                       src={allRequest.employeePhoto}
//                       alt={allRequest.employeeName}
//                     />
//                   </div>
//                 </div>
//               </td>
//               <td>{allRequest.assetName}</td>
//               <td>{allRequest.assetType}</td>
//               <td>{allRequest.assetQuantity}</td>
//               <td>{new Date(allRequest.createdAt).toLocaleDateString()}</td>
//               <td>{allRequest.status}</td>
//               <td className="space-x-2">
//                 {allRequest.status === "Pending" && (
//                   <>
//                     <button
//                       onClick={() => approveMutation.mutate(allRequest._id)}
//                       className="btn btn-sm bg-green-500 text-white"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => rejectMutation.mutate(allRequest._id)}
//                       className="btn btn-sm bg-red-500 text-white"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {allRequest.status !== "Pending" && <span>Done</span>}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllRequests;
