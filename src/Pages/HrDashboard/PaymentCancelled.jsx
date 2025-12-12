import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h1 className="text-red-500 font-bold text-4xl text-center">
        Payment is cancelled. Please try again
      </h1>
      <Link to="/hr-dashboard/upgrade-pakage">
        <button className="btn bg-green-300 btn-sm text-black font-bold mx-auto flex text-[20px] mt-10 p-4">
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
