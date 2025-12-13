import React, { useEffect } from "react";
// import { useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxios();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
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
    <div>
      <h1 className="text-4xl font-bold text-green-500 text-center">
        Payment is successful 🎉
      </h1>
      <Link to="/hr-dashboard/upgrade-pakage">
        <button className="text-black btn bg-green-400 mt-5 mx-auto flex">Back</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
