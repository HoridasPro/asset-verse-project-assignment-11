import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import SentRequestAsset from "./SentRequestAsset";

const RequestAsset = () => {
  // const {user}=useAuth()
  const axiosSecure = useAxios();
  const orderModalRef = useRef(null);
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requestAssets");
      return res.data;
    },
  });
  const handleRequestAssetModal = () => {
    orderModalRef.current.showModal();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1380px] mx-auto py-10">
      {assets.map((asset) => (
        <div key={asset._id} className="card shadow-sm bg-gray-300">
          <figure className=" ">
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

            <div>
              <button
                onClick={handleRequestAssetModal}
                type="button"
                className="btn text-black bg-amber-100 hover:bg-blue-400 py-1 px-7 font-semibold rounded-sm mt-3 w-full"
              >
                Request
              </button>
              <dialog
                ref={orderModalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box bg-black text-white">
                  <p className="py-4 font-bold text-2xl">Request Asset Page</p>

                  <div className="card-body bg-base-100 shrink-0 bg-black">
                    <SentRequestAsset
                      orderModalRef={orderModalRef}
                    ></SentRequestAsset>
                  </div>

                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestAsset;
