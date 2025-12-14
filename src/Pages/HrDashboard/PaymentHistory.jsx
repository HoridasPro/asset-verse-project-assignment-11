import React from "react";

import useAxios from "./../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  return (
    <div className="overflow-x-auto">
      <h1>this is payment history : {payments.length}</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Package Name</th>
            <th>Employee Limit</th>
            <th>Price</th>
            <th>Email</th>
            <th>Transaction Id</th>
            <th>Package Id</th>
            <th>Paid Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.packageName}</td>
              <td>{payment.employeeLimit}</td>
              <td>${payment.amount}</td>
              <td>{payment.hrEmail}</td>
              <td>{payment.transactionId}</td>
              <td>{payment.packageId}</td>
              <td> {payment.paidAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
