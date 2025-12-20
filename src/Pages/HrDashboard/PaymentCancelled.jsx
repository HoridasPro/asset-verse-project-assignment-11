import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
        Payment Cancelled
      </h1>
      <p className="text-lg text-gray-200 mt-4 text-center">
        Your payment was not successful. Please try again.
      </p>
      <Link to="/hr-dashboard/upgrade-pakage">
        <button className="mt-10 px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 transition-transform shadow-lg cursor-pointer">
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
