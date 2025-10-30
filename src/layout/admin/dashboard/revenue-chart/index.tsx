"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { MdCircle } from "react-icons/md";

type props = {
  h?: string;
  graphSize?: string;
};

export const RevenueChart = ({ h = "h-101", graphSize = "h-75" }: props) => {
  const [viewType, setViewType] = useState("Month");
  const [year, setYear] = useState("Year");

  const chartData = [
    { month: "Jan", earnings: 15000 },
    { month: "Feb", earnings: 22000 },
    { month: "Mar", earnings: 18000 },
    { month: "Apr", earnings: 25000 },
    { month: "May", earnings: 20000 },
    { month: "Jun", earnings: 28000 },
    { month: "Jul", earnings: 25000 },
    { month: "Aug", earnings: 30000 },
    { month: "Sep", earnings: 27000 },
    { month: "Oct", earnings: 23000 },
    { month: "Nov", earnings: 26000 },
    { month: "Dec", earnings: 24000 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2C4C9C] text-white p-3 rounded-lg shadow-lg text-sm">
          <p className="font-semibold text-xs mb-1  ">
            July 2025
          </p>
          <div className="text-[#FFFFFFCC] flex items-center gap-3 justify-between ">
            <p className="text-xs flex items-center gap-1  ">
              {" "}
              <span>
                {" "}
                <MdCircle color="#336AEA" size={10} />
              </span>{" "}
              Total Revenue
            </p>
            <span className="font-bold text-white text-[15px] ">
              {" "}
              ₦{payload[0].value.toLocaleString()}.00
            </span>
          </div>
          <div className="text-[#FFFFFFCC] flex items-center justify-between ">
            <p className="text-xs flex items-center gap-1  ">
              {" "}
              <span>
                {" "}
                <MdCircle color="#989898" size={10} />
              </span>{" "}
              Total Payouts
            </p>
            <span className="font-bold text-white text-[15px] ">
              {" "}
              ₦{payload[0].value.toLocaleString()}.00
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6  ${h}`}>
      <div className=" flex flex-col md:flex-row space-y-3 items-start md:items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">
          Revenue & Payout Summary{" "}
        </h2>
        <div className="flex gap-2">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-4 focus:outline-none py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <option>Month</option>
            <option>Week</option>
            <option>Day</option>
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 focus:outline-none  py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <option>Year</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>

      <div className={`${graphSize}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4169E1" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4169E1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#999" style={{ fontSize: "12px" }} />
            <YAxis
              stroke="#999"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="transparent"
              fill="url(#colorEarnings)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#4169E1"
              strokeWidth={3}
              dot={false}
              activeDot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
