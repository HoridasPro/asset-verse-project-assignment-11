import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import SentRequestAsset from "./SentRequestAsset";
import Loading from "../../Loading/Loading";

const RequestAsset = () => {
  const axiosSecure = useAxios();
  const orderModalRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hrAssets");
      return res.data;
    },
  });

  const handleRequestAssetModal = (asset) => {
    setSelectedAsset(asset);
    orderModalRef.current.showModal();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1380px] mx-auto py-10">
      {assets.map((asset) => (
        <div key={asset._id} className="card shadow-sm bg-gray-300">
          <figure>
            <img
              src={asset.productURL}
              alt={asset.productName}
              className="w-full h-48 object-cover"
            />
          </figure>

          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title text-black">{asset.productName}</h2>
              <h2 className="card-title text-black">{asset.productType}</h2>
            </div>

            <p className="text-black">
              <span className="font-bold">Available Quantity : </span>
              {asset.productQuantity}
            </p>

            <button
              onClick={() => handleRequestAssetModal(asset)}
              className="border border-blue-700 text-blue-700 hover:bg-[#CCE1FF] w-full mt-3 py-3 rounded-full font-semibold text-lg transition-transform hover:scale-105 cursor-pointer"
            >
              Request
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      <dialog
        ref={orderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-black text-white">
          <p className="py-4 font-bold text-2xl">Request Asset Page</p>

          <div className="card-body bg-black">
            <SentRequestAsset
              orderModalRef={orderModalRef}
              selectedAsset={selectedAsset}
            />
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="border border-blue-700 text-blue-700 hover:bg-[#CCE1FF] px-4 py-2 rounded-full font-semibold text-lg">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
