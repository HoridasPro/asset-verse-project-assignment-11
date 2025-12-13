import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const SentRequestAsset = ({ orderModalRef, selectedAsset }) => {
  const axiosSecure = useAxios();
  const [note, setNote] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAsset) {
      alert("No asset selected!");
      return;
    }

    // Ensure productURL has extension
    let productURL = selectedAsset.productURL || "";
    if (!productURL.includes(".")) {
      productURL += ".jpg"; // default to jpg if extension missing
    }

    const RequestAssetInfo = {
      employeeName: user.displayName,
      productType: selectedAsset.productType,
      productName: selectedAsset.productName,
      productQuantity: selectedAsset.productQuantity,
      productURL: productURL, // full URL with extension
      note: note,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/requestAssets", RequestAssetInfo);

      if (res.data.insertedId) {
        alert("Request Sent Successfully!");
        setNote(""); // clear textarea
        orderModalRef.current.close();
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="textarea textarea-bordered w-full text-white bg-black"
        placeholder="Write a note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        type="submit"
        className="btn bg-amber-300 text-black w-full hover:bg-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

export default SentRequestAsset;
