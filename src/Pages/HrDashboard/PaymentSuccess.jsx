import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxios();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [axiosSecure, sessionId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-400 via-green-500 to-cyan-400 bg-clip-text text-transparent">
        Payment Successful 🎉
      </h1>
      <p className="text-lg text-gray-200 mt-4 text-center">
        Thank you! Your payment has been processed successfully.
      </p>
      <Link to="/hr-dashboard/upgrade-pakage">
        <button className="mt-10 px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 transition-transform shadow-lg cursor-pointer">
          Back to Packages
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
