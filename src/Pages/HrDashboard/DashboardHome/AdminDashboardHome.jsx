import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../hooks/useAxios";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const AdminDashboardHome = () => {
  const axiosSecure = useAxios();

  // 🔹 Top 5 requested assets
  const { data: topRequestAssetsStats = [] } = useQuery({
    queryKey: ["products-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee-request/top-assets");
      return res.data;
    },
  });

  // 🔹 Returnable vs Non-returnable (Pie Chart)
  const { data: returnableStats = [] } = useQuery({
    queryKey: ["returnable-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/productType");
      return res.data;
    },
  });
  console.log(returnableStats);

  const COLORS = ["#4f46e5", "#ef4444"];

  const getPaiChartData = (data) => {
    return data.map((item) => {
      return { name: item.productType, value: item.requestCount };
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Top 5 Request Assets
      </h1>

      {/* 🔹 Top 5 Asset Cards */}
      <div className="stats shadow mx-auto flex gap-7 justify-center max-w-[1380px] mb-12">
        {topRequestAssetsStats.slice(0, 5).map((stat, index) => (
          <div
            key={index}
            className={`stat text-white rounded-xl ${
              index === 0
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                : index === 1
                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                : index === 2
                ? "bg-gradient-to-r from-sky-500 to-blue-600"
                : index === 3
                ? "bg-gradient-to-r from-orange-400 to-red-500"
                : "bg-gradient-to-r from-fuchsia-500 to-rose-500"
            }`}
          >
            <div className="stat-title opacity-90 text-xl font-bold">
              {stat.productName}
            </div>
            <div className="stat-value text-black">{stat.requestCount}</div>
            <div className="stat-desc opacity-80 font-bold">
              Top Requested Asset
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Pie Chart */}
      <div className="flex justify-center -mt-10">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "600px",
            maxHeight: "1000vh",
            aspectRatio: 2,
          }}
          responsive
        >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={getPaiChartData(returnableStats)}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            fill="#8884d8"
            label
            isAnimationActive={true}
          />
          <Legend></Legend>
          <Tooltip></Tooltip>
        </PieChart>
      </div>
    </div>
  );
};

 export default AdminDashboardHome