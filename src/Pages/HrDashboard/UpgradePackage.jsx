// import React, { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../hooks/useAxios";
// import useAuth from "../../hooks/useAuth";
// import { Link } from "react-router";

// const UpgradePackage = () => {
//   const { user: user } = useAuth();
//   const axiosSecure = useAxios();

//   // 1️⃣ GET packages from backend
//   const { data: packages = [] } = useQuery({
//     queryKey: ["packages"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/packages");
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (!user?.email) return;

//     const packages = [
//       {
//         name: "Basic",
//         employeeLimit: 5,
//         price: 0,
//         email: user?.email,
//         paymentStatus: "pay",
//       },
//       {
//         name: "Standard",
//         employeeLimit: 15,
//         price: 900,
//         email: user?.email,
//         paymentStatus: "pay",
//       },
//       {
//         name: "Premium",
//         employeeLimit: 30,
//         price: 1900,
//         email: user?.email,
//         paymentStatus: "pay",
//       },
//       {
//         name: "Enterprise",
//         employeeLimit: 999,
//         price: 4900,
//         email: user?.email,
//         paymentStatus: "pay",
//       },
//     ];

//     packages.forEach(async (pkg) => {
//       try {
//         const res = await axiosSecure.post("/packages", pkg);
//         console.log("Package Added:", res.data);
//       } catch (err) {
//         console.error("Error:", err.response?.data || err.message);
//       }
//     });
//   }, [user, axiosSecure]);

//   return (
//     <div className="overflow-x-auto">
//       <table className="table w-full">
//         <thead>
//           <tr>
//             <th>SI NO</th>
//             <th>Name</th>
//             <th>Employee Limit</th>
//             <th>Price</th>
//             <th>Payment</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {packages.map((pkg, index) => (
//             <tr key={pkg._id}>
//               <th>{index + 1}</th>
//               <td>{pkg.name}</td>
//               <td>{pkg.employeeLimit}</td>
//               <td>${pkg.price}</td>
//               <td>
//                 {pkg.paymentStatus === "paid" ? (
//                   <span className="text-green-500">Paid</span>
//                 ) : (
//                   <Link to={`/hr-dashboard/payment/${pkg._id}`}>
//                     <button className="btn bg-green-300 btn-sm text-black font-bold">
//                       Pay
//                     </button>
//                   </Link>
//                 )}
//               </td>
//               <td>{new Date(pkg.createdAt).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UpgradePackage;

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // GET only this user's packages
  const { data: packages = [], refetch } = useQuery({
    queryKey: ["packages", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Insert default packages only once
  useEffect(() => {
    if (!user?.email) return;

    const saveDefaultPackages = async () => {
      try {
        // 1️⃣ Check if user already has packages
        const res = await axiosSecure.get(`/packages?email=${user.email}`);

        if (res.data.length > 0) {
          console.log("Packages already exist!");
          return; // prevent duplicate insert
        }

        // 2️⃣ Default package list
        const defaultPackages = [
          {
            name: "Basic",
            employeeLimit: 5,
            price: 0,
            email: user.email,
            paymentStatus: "pay",
          },
          {
            name: "Standard",
            employeeLimit: 15,
            price: 900,
            email: user.email,
            paymentStatus: "pay",
          },
          {
            name: "Premium",
            employeeLimit: 30,
            price: 1900,
            email: user.email,
            paymentStatus: "pay",
          },
          {
            name: "Enterprise",
            employeeLimit: 999,
            price: 4900,
            email: user.email,
            paymentStatus: "pay",
          },
        ];

        // 3️⃣ Insert one by one
        for (const pkg of defaultPackages) {
          await axiosSecure.post("/packages", pkg);
        }

        console.log("Default packages added!");
        refetch(); // reload table
      } catch (err) {
        console.error("Error saving packages:", err);
      }
    };

    saveDefaultPackages();
  }, [user, axiosSecure, refetch]);

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
              <td>{pkg.name}</td>
              <td>{pkg.employeeLimit}</td>
              <td>${pkg.price}</td>
              <td>
                {pkg.paymentStatus === "paid" ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <Link to={`/hr-dashboard/payment/${pkg._id}`}>
                    <button className="btn bg-green-300 btn-sm text-black font-bold">
                      Pay
                    </button>
                  </Link>
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
