import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const MyAssets = () => {
  const axiosSecure = useAxios();
  const { data: employeeAssets = [] } = useQuery({
    queryKey: ["employeeAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employeeAssets");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Assigned Assets</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Asset Image</th>
            <th>Asset Name</th>
            <th>Asset Type</th>
            <th>Company Name</th>
            <th>Request Date</th>
            <th>Approval Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employeeAssets.map((employeeAsset, index) => (
            <tr key={employeeAsset._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={employeeAsset.productURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              {/* <td>{new Date(asset.assignedDate).toLocaleDateString()}</td> */}
              <td>{employeeAsset.productName}</td>
              <td>{employeeAsset.productType}</td>
              <td>{employeeAsset.companyName}</td>
              <td>{employeeAsset.requestDate}</td>
              <td>{employeeAsset.approvalDate}</td>

              <td>
                {" "}
                <p
                  className={`${
                    employeeAsset.status === "assigned" ? "text-green-500" : ""
                  }`}
                >
                  {employeeAsset.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssets;
