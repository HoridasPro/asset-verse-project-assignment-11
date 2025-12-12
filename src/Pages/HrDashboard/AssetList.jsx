import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AssetList = () => {
  // const {user}=useAuth()
  const axiosSecure = useAxios();
  const {
    isLoading,
    data: assets = [],
    refetch,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hrAssets");
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <span className="loading loading-bars loading-xl mx-auto flex mt-72"></span>
    );
  }

  // asset delete
  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axiosSecure.delete(`/hrAssets/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your asset request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
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
            <tr>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={asset.productURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>{asset.productName}</div>
              </td>
              <td>
                <div>{asset.productType}</div>
              </td>
              <td>
                <div>{asset.productQuantity}</div>
              </td>
              <td>
                <div>{asset.createdAt}</div>
              </td>
              <td>
                <button className="btn btn-square hover:bg-primary relative group rounded mr-2">
                  <FaEdit />
                  <span
                    className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2
                       bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    Edit
                  </span>
                </button>
                <button
                  onClick={() => handleAssetDelete(asset._id)}
                  className="btn btn-square hover:bg-primary relative group rounded"
                >
                  <FaRegTrashAlt />
                  <span
                    className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2
                       bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    Delete
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

export default AssetList;
