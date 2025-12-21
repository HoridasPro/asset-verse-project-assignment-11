import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import Loading from "../../../Loading/Loading";

const AdminDashboardHome = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);

  // Top 5 requested assets
  const { data: topRequestAssetsStats = [] } = useQuery({
    queryKey: ["products-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee-request/top-assets");
      return res.data;
    },
  });

  //Returnable vs Non-returnable (Pie Chart)
  const { data: returnableStats = [] } = useQuery({
    queryKey: ["returnable-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/productType");
      return res.data;
    },
  });

  const COLORS = ["#4f46e5", "#ef4444"];

  const getPaiChartData = (data) =>
    data.map((item) => ({ name: item.productType, value: item.requestCount }));
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [setLoading]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 min-h-screen bg-slate-900">
      <h1 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
        Top 5 Requested Assets
      </h1>

      {/*Top 5 Asset Cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-[1380px] mx-auto mb-12 grid-cols-2">
        {topRequestAssetsStats.slice(0, 5).map((stat, index) => (
          <div
            key={index}
            className={`w-56 p-5 rounded-2xl shadow-lg text-white transform hover:scale-105 transition duration-300 ${
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
            <div className="text-xl font-semibold mb-2">{stat.productName}</div>
            <div className="text-4xl font-bold text-white mb-1">
              {stat.requestCount}
            </div>
            <div className="text-sm font-medium opacity-90">
              Top Requested Asset
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              data={getPaiChartData(returnableStats)}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              label
              isAnimationActive={true}
            >
              {getPaiChartData(returnableStats).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "10px",
                border: "none",
                color: "#ffffff",
              }}
              itemStyle={{
                color: "#ffffff",
                fontWeight: "bold",
              }}
              labelStyle={{
                color: "#38bdf8",
                fontWeight: "bold",
              }}
            />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ color: "#111827", fontWeight: "bold" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
