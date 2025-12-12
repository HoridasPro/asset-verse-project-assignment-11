// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import { useParams } from "react-router";
// import useAxios from "../../hooks/useAxios";

// const Payment = () => {
//   const { employeeId } = useParams();
//   const axiosSecure = useAxios();
//   const { isLoading, data: employee } = useQuery({
//     queryKey: ["employee", employeeId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/employee-package/${employeeId}`);
//       return res.data;
//     },
//   });
//   // Handle Payment
//   const handlePayment = async () => {
//     const paymentInfo = {
//       price: employee.price,
//       employeeId: employee._id,
//       hr_manager_email: employee.email,
//       packageName: employee.packageName,
//     };
//     const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
//     console.log(res.data);
//   };
//   if (isLoading) {
//     return (
//       <span className="loading loading-bars loading-xl text-center"></span>
//     );
//   }
//   return (
//     <div>
//       <h1>
//         this is payment ${employee.price} : {employee.name}
//       </h1>
//       <button
//         onClick={handlePayment}
//         className="btn bg-green-300 btn-sm text-black font-bold"
//       >
//         Pay
//       </button>
//     </div>
//   );
// };

// export default Payment;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const Payment = () => {
  const { employeeId } = useParams();
  const axiosSecure = useAxios();

  const { isLoading, data: employee } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-package/${employeeId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    if (!employee) return alert("Employee package not found!");

    const paymentInfo = {
      price: employee.price,
      employeeId: employee._id,
      hr_manager_email: employee.email,
      packageName: employee.packageName || employee.name, // fallback
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    // If Stripe:

    console.log("Payment Start:", res.data);
    window.location.replace(res.data.url);
  };

  if (isLoading) {
    return (
      <span className="loading loading-bars loading-xl text-center"></span>
    );
  }

  if (!employee) {
    return <p className="text-center text-red-500">Package not found!</p>;
  }

  return (
    <div className="mt-5">
      <h1 className="text-4xl text-center font-bold">
        This {employee.name} package price ${employee.price} :
      </h1>

      <button
        onClick={handlePayment}
        className="btn bg-green-300 btn-sm text-black font-bold flex mx-auto mt-5 text-[20px]"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
