import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const AssetList = () => {
  const axiosSecure = useAxios();
  const [page, setPage] = useState(1);
  const limit = 10;

  // Edit modal states
  const [editAsset, setEditAsset] = useState(null);
  const [editProductURL, setEditProductURL] = useState("");
  const [editProductFile, setEditProductFile] = useState(null);
  const [editProductName, setEditProductName] = useState("");
  const [editProductType, setEditProductType] = useState("");
  const [editProductQuantity, setEditProductQuantity] = useState(0);
  const [editCreatedAt, setEditCreatedAt] = useState("");
  const [loading, setLoading] = useState(true);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["assets", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hrAssets/page?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
 
  const assets = data?.data || [];

  // Delete handler
  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/hrAssets/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Your asset has been deleted.", "success");
          }
        });
      }
    });
  };

  // Open edit modal
  const handleEdit = (asset) => {
    setEditAsset(asset);
    setEditProductURL(asset.productURL);
    setEditProductName(asset.productName);
    setEditProductType(asset.productType);
    setEditProductQuantity(asset.productQuantity);
    setEditCreatedAt(
      asset.createdAt
        ? new Date(asset.createdAt).toISOString().substring(0, 10)
        : ""
    );
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editAsset) return;

    let photoURL = editProductURL;

    if (editProductFile) {
      const formData = new FormData();
      formData.append("file", editProductFile);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      photoURL = data.secure_url;
    }

    await axiosSecure.patch(`/hrAssets/${editAsset._id}`, {
      productURL: photoURL,
      productName: editProductName,
      productType: editProductType,
      productQuantity: editProductQuantity,
      createdAt: new Date(editCreatedAt),
    });

    setEditAsset(null);
    setEditProductFile(null);
    refetch();
    Swal.fire("Updated!", "Asset has been updated.", "success");
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
    <div className="overflow-x-auto mb-10 mt-5 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-6 rounded-2xl shadow-2xl">
      <h1 className="text-center font-extrabold text-2xl mb-6 bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        Assets List {(page - 1) * limit + 1} -{" "}
        {Math.min(page * limit, data.total)} of {data.total}
      </h1>

      {/* Table */}
      <table className="table w-full text-gray-200">
        <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
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

        <tbody className="bg-slate-900">
          {assets.map((asset, index) => (
            <tr
              key={asset._id}
              className="hover:bg-gradient-to-r hover:from-slate-800 hover:via-gray-800 hover:to-slate-700 transition duration-300"
            >
              <th>{(page - 1) * limit + index + 1}</th>

              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={asset.productURL} alt={asset.productName} />
                  </div>
                </div>
              </td>

              <td className="font-semibold text-cyan-400">
                {asset.productName}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    asset.productType === "Returnable"
                      ? "bg-emerald-600/20 text-emerald-400"
                      : "bg-rose-600/20 text-rose-400"
                  }`}
                >
                  {asset.productType}
                </span>
              </td>

              <td className="font-bold text-yellow-400">
                {asset.productQuantity}
              </td>

              <td>
                {asset.createdAt
                  ? new Date(asset.createdAt).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <button
                  onClick={() => handleEdit(asset)}
                  className="btn btn-square bg-indigo-600 hover:bg-indigo-500 text-white mr-2 shadow-lg"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleAssetDelete(asset._id)}
                  className="btn btn-square bg-rose-600 hover:bg-rose-500 text-white shadow-lg"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6 text-white">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-1 rounded bg-slate-700 disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {data.page} of {data.totalPages}
        </span>

        <button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-1 rounded bg-slate-700 disabled:opacity-40"
        >
          Next
        </button>

        {isFetching && <span className="ml-2 text-gray-400">Updating...</span>}
      </div>

      {/* Edit Modal */}
      {editAsset && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-slate-900 text-white rounded-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Asset</h2>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="file"
                className="file-input file-input-bordered bg-slate-800"
                onChange={(e) => setEditProductFile(e.target.files[0])}
              />

              <input
                type="text"
                value={editProductName}
                onChange={(e) => setEditProductName(e.target.value)}
                className="input input-bordered bg-slate-800 text-white"
                required
              />

              <select
                value={editProductType}
                onChange={(e) => setEditProductType(e.target.value)}
                className="input input-bordered bg-slate-800 text-white"
              >
                <option>Returnable</option>
                <option>Non-returnable</option>
              </select>

              <input
                type="number"
                value={editProductQuantity}
                onChange={(e) => setEditProductQuantity(Number(e.target.value))}
                className="input input-bordered bg-slate-800 text-white"
                required
              />

              <input
                type="date"
                value={editCreatedAt}
                onChange={(e) => setEditCreatedAt(e.target.value)}
                className="input input-bordered bg-slate-800 text-white"
                required
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditAsset(null)}
                  className="btn btn-outline text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
