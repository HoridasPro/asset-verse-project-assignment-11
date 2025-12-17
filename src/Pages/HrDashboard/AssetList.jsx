// export default AssetList;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AssetList = () => {
  const axiosSecure = useAxios();
  const [page, setPage] = useState(1);
  const limit = 10; // items per page

  const { isLoading, data, refetch, isFetching } = useQuery({
    queryKey: ["assets", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hrAssets/page?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true, // smooth UX while changing page
  });

  if (isLoading)
    return (
      <span className="loading loading-bars loading-xl mx-auto flex mt-72"></span>
    );

  const assets = data?.data || [];

  // Delete handler
  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/hrAssets/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your asset has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto mb-10 mt-5">
      <h1 className="text-center font-bold text-2xl mb-4">
        HR Assets {(page - 1) * limit + 1} -{" "}
        {Math.min(page * limit, data.total)} of {data.total}
      </h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Product Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset._id}>
              <th>{(page - 1) * limit + index + 1}</th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={asset.productURL} alt={asset.productName} />
                  </div>
                </div>
              </td>
              <td>{asset.productName}</td>
              <td>{asset.productType}</td>
              <td>{asset.productQuantity}</td>
              <td>
                {asset.createdAt
                  ? new Date(asset.createdAt).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                <button className="btn btn-square hover:bg-primary relative group rounded mr-2">
                  <FaEdit />
                  <span className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                    Edit
                  </span>
                </button>
                <button
                  onClick={() => handleAssetDelete(asset._id)}
                  className="btn btn-square hover:bg-primary relative group rounded"
                >
                  <FaRegTrashAlt />
                  <span className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                    Delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {data.page} of {data.totalPages}
        </span>

        <button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>

        {isFetching && <span className="ml-2 text-gray-500">Updating...</span>}
      </div>
    </div>
  );
};

export default AssetList;
