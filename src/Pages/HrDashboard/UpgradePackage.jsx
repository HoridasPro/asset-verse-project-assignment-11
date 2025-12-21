import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Loading/Loading";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);

  const { data: packages = [] } = useQuery({
    queryKey: ["packages", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handlePayment = async (pkg) => {
    try {
      const paymentInfo = {
        price: pkg.price,
        employeeLimit: pkg.employeeLimit,
        packageId: pkg._id,
        email: user?.email,
        packageName: pkg.packageName,
      };

      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.replace(res.data.url);
      } else {
        console.error("No URL received from backend");
      }
    } catch (error) {
      console.error("Payment error:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        Upgrade Packages : {packages.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-fixed w-full text-white shadow-2xl rounded-lg overflow-hidden bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-4 py-3 text-center w-1/12">SI NO</th>
              <th className="px-4 py-3 text-left w-2/12">Name</th>
              <th className="px-4 py-3 text-center w-2/12">Employee Limit</th>
              <th className="px-4 py-3 text-center w-2/12">Price</th>
              <th className="px-4 py-3 text-center w-2/12">Payment</th>
              <th className="px-4 py-3 text-center w-3/12">Date</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr
                key={pkg._id}
                className="odd:bg-white/10 even:bg-white/20 hover:scale-105 transform transition-all"
              >
                <th className="px-4 py-3 text-center">{index + 1}</th>
                <td className="px-4 py-3 font-medium text-left">
                  {pkg.packageName}
                </td>
                <td className="px-4 py-3 text-center">{pkg.employeeLimit}</td>
                <td className="px-4 py-3 text-center">${pkg.price}</td>
                <td className="px-4 py-3 text-center">
                  {pkg.paymentStatus === "paid" ? (
                    <span className="px-2 py-1 rounded-full text-white bg-gradient-to-r from-green-400 to-green-600 text-sm font-semibold">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(pkg)}
                      className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold btn-sm hover:scale-105 transition-transform"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(pkg.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpgradePackage;
