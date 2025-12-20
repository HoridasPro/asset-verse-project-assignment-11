// export default AddAsset;
import React from "react";
import { useForm } from "react-hook-form";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const AddAsset = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxios();

  const handleAddAsset = async (data) => {
    try {
      const imageFile = data.photo[0];
      const productURL = await photoUpload(imageFile);

      const hrAssetInfo = {
        productType: data.productType,
        productName: data.productName,
        productQuantity: data.productQuantity,
        productURL: productURL,
        role: "hr",
        createdAt: new Date(),
      };

      await axiosSecure.post("hrAssets", hrAssetInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Asset added successfully",
            showConfirmButton: false,
            timer: 1800,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen py-14 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Add Asset
        </h2>
        <p className="text-lg text-gray-300 mt-3 border-b border-gray-600 pb-4 text-center">
          Enter your asset details
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleAddAsset)}
          className="mt-12 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10"
        >
          {/* Product Type */}
          <div className="flex justify-center gap-8 text-xl font-semibold text-white mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("productType", { required: true })}
                value="Returnable"
                className="radio radio-primary"
                defaultChecked
              />
              Returnable
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("productType", { required: true })}
                value="Non-returnable"
                className="radio radio-primary"
              />
              Non-returnable
            </label>
          </div>

          {/* ✅ Gradient Form Card */}
          <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-8 shadow-xl border border-indigo-200">
            <fieldset className="mb-5">
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Product Name
              </label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter product name"
              />
            </fieldset>

            <fieldset className="mb-5">
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Product Quantity
              </label>
              <input
                type="number"
                {...register("productQuantity", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter quantity"
              />
            </fieldset>

            <fieldset>
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("photo", { required: true })}
              />
            </fieldset>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-10 mx-auto flex px-10 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg cursor-pointer"
          >
            Save to Assets Collection
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
