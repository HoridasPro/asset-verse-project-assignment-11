import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);

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

      await axiosSecure.post("/hrAssets", hrAssetInfo).then((res) => {
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [setLoading]);

  if (loading) {
    return <Loading />;
  }

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
          {errors.productType && (
            <p className="text-red-500 font-bold text-center mb-5">
              Please select a product type
            </p>
          )}

          {/* Gradient Form Card */}
          <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-8 shadow-xl border border-indigo-200">
            {/* Product Name */}
            <fieldset className="mb-5">
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Product Name
              </label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="input border border-gray-300 w-full bg-[#DBE5FF] text-black rounded-xl
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-4 py-2"
                placeholder="Enter product name"
              />
              {errors.productName && (
                <p className="text-red-500 font-bold mt-1">
                  Product name is required
                </p>
              )}
            </fieldset>

            {/* Product Quantity */}
            <fieldset className="mb-5">
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Product Quantity
              </label>
              <input
                type="number"
                {...register("productQuantity", { required: true })}
                className="input border border-gray-300 w-full bg-[#DBE5FF] text-black rounded-xl
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-4 py-2"
                placeholder="Enter quantity"
              />
              {errors.productQuantity && (
                <p className="text-red-500 font-bold mt-1">
                  Product quantity is required
                </p>
              )}
            </fieldset>

            {/* Product Image */}
            <fieldset>
              <label className="block text-lg font-semibold mb-1 text-gray-800">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: true })}
                className="w-full border border-gray-300 rounded-lg bg-[#DBE5FF] text-black
                file:bg-[#DBE5FF] file:text-black file:border-0 file:px-4 file:py-2 file:mr-4
                focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              />
              {errors.photo && (
                <p className="text-red-500 font-bold mt-1">
                  Product image is required
                </p>
              )}
            </fieldset>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-10 mx-auto flex px-10 py-3 rounded-full text-lg font-bold text-white border border-blue-700 text-blue-700 hover:scale-105 transition-transform shadow-lg cursor-pointer"
          >
            Save to Assets Collection
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
