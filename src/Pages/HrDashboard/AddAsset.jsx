import React from "react";
import { useForm } from "react-hook-form";
import { photoUpload } from "../../Utils/UploadPhoto";
import useAuth from "../../hooks/useAuth";

const AddAsset = () => {
  const { register, handleSubmit } = useForm();
  const { userProfileUpdate } = useAuth();

  const handleAddAsset = async (data) => {
    console.log(data);
    try {
      const imageFile = data.photo[0];
      const logoURL = await photoUpload(imageFile);

      await userProfileUpdate({
        displayName: data.name,
        photoURL: logoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10 max-w-11/12 mx-auto">
      <h2 className="text-5xl font-bold text-center">Add Asset</h2>
      <p className="text-2xl font-medium py-3 border-b-2 text-center">
        Enter your asset details
      </p>
      <form onSubmit={handleSubmit(handleAddAsset)} className="mt-12 ">
        <div className="font-medium text-2xl py-2 flex justify-center">
          {/* parcel type*/}
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              value="Returnable"
              className="radio"
              defaultChecked
            />
            Returnable
          </label>

          {/* parcel type*/}
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              value="Non-returnable"
              className="radio"
              defaultChecked
            />
            Non-returnable
          </label>
        </div>
        {/* parcel information: name, weight */}
        <div className="w-[500px] mx-auto bg-amber-50 p-5">
          <fieldset className="fieldset mb-5">
            <label className="label text-xl">Product Name</label>
            <input
              type="text"
              {...register("productName", { required: true })}
              className="input w-full"
              placeholder="product name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-xl">Product Quantity</label>
            <input
              type="number"
              {...register("product-quantity", { required: true })}
              className="input w-full"
              placeholder="product-quantity"
            />
          </fieldset>
          <fieldset className="flex flex-col mt-5">
            <label className="label text-xl">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("photo", { required: true })}
              placeholder="photo"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value="Saves to assets collection"
          className="btn btn-primary mt-5 mx-auto flex text-white"
        />
      </form>
    </div>
  );
};

export default AddAsset;
