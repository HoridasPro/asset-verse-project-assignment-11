import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [setLoading]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-6 px-3 sm:px-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        Payment History ({payments.length})
      </h1>

      {/*Mobile horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-white shadow-xl rounded-lg overflow-hidden bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <tr>
              <th className="px-4 py-3 text-center">SI</th>
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-center">Limit</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Transaction</th>
              <th className="px-4 py-3 text-left">Package ID</th>
              <th className="px-4 py-3 text-center">Paid Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="odd:bg-white/10 even:bg-white/20 hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>

                <td className="px-4 py-3 font-medium text-sm sm:text-base">
                  {payment.packageName}
                </td>

                <td className="px-4 py-3 text-center text-sm sm:text-base">
                  {payment.employeeLimit}
                </td>

                <td className="px-4 py-3 text-center text-sm sm:text-base">
                  ${payment.amount}
                </td>

                <td className="px-4 py-3 text-sm break-all">
                  {payment.hrEmail}
                </td>

                <td className="px-4 py-3 text-sm break-all">
                  {payment.transactionId}
                </td>

                <td className="px-4 py-3 text-sm break-all">
                  {payment.packageId}
                </td>

                <td className="px-4 py-3 text-center text-sm sm:text-base">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
