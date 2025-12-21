import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const DownloadAssignedList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // Fetch assigned assets using react-query
  const {
    data: assignedAssets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employeeAssets", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/employeeAssets?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDownloadPDF = () => {
    if (!assignedAssets.length) {
      alert("No assets to download");
      return;
    }

    const doc = new jsPDF();

    doc.text("My Assigned Assets Report", 14, 20);
    doc.text(`User: ${user?.email || "N/A"}`, 14, 28);

    const head = [
      [
        "SI",
        "Asset Image",
        "Asset Name",
        "Asset Type",
        "Request Date",
        "Approval Date",
        "Status",
      ],
    ];

    const body = assignedAssets.map((asset, index) => [
      index + 1,
      "", // image placeholder
      asset?.productName,
      asset?.productType,
      asset?.createdAt,
      asset?.approvalDate,
      asset?.status,
    ]);

    autoTable(doc, {
      startY: 34,
      head: head,
      body: body,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [22, 160, 133] },
      theme: "grid",
      didDrawCell: (data) => {
        // Add image in the "Asset Image" column (index 1)
        if (data.column.index === 1 && data.cell.section === "body") {
          const asset = assignedAssets[data.row.index];
          if (asset.productURL) {
            const img = new Image();
            img.src = asset.productURL;
            img.onload = function () {
              const dim = data.cell.height - 2;
              doc.addImage(
                img,
                "JPEG",
                data.cell.x + 1,
                data.cell.y + 1,
                dim,
                dim
              );
            };
          }
        }
      },
    });

    doc.save("assigned-assets.pdf");
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load assets
      </div>
    );

  return (
    <div className="text-center mt-10 mb-10">
      <button
        onClick={handleDownloadPDF}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold rounded-md cursor-pointer"
      >
        Download Report
      </button>
    </div>
  );
};

export default DownloadAssignedList;
