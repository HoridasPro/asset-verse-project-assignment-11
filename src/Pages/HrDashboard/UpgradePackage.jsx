import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // GET only this user's packagess
  const { isLoading, data: packages = [] } = useQuery({
    queryKey: ["packages", user?.email],
    queryFn: async () => {
      // const res = await axiosSecure.get(`/packages?email=${user?.email}`);
      const res = await axiosSecure.get(`/packages`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(packages);

  const handlePayment = async (pkg) => {
    try {
      const paymentInfo = {
        price: pkg.price,
        packageId: pkg._id,
        email: user?.email,
        packageName: pkg.packageName, // ✅ FIXED
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

  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Name</th>
            <th>Employee Limit</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg._id}>
              <th>{index + 1}</th>
              <td>{pkg.packageName}</td>
              <td>{pkg.employeeLimit}</td>
              <td>${pkg.price}</td>
              <td>
                {pkg.paymentStatus === "paid" ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  // <Link to={`/hr-dashboard/payment/${pkg._id}`}>
                  <button
                    onClick={() => handlePayment(pkg)}
                    className="btn bg-green-300 btn-sm text-black font-bold"
                  >
                    Pay
                  </button>
                  // </Link>
                )}
              </td>
              <td>{new Date(pkg.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpgradePackage;
