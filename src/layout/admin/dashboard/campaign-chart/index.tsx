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
import { MdCircle } from 'react-icons/md';

type props = {
  h?: string;
  graphSize?: string;
};

export const CampaignChart = ({ h = "h-56", graphSize = "h-64" }: props) => {
  const [dateRange, setDateRange] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");

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
          <p className="font-semibold text-xs  ">July-Aug 2025 <br/> (ABC Digitals Ltd)</p>
          <div className=" mt-4 text-[#FFFFFFCC] gap-13 flex items-center justify-between ">
            <p className="text-xs">Total Active Campaigns</p>
            <span className="font-bold text-white text-[15px] "  > 4</span>
          </div>
          <div className="text-[#FFFFFFCC] flex items-center justify-between ">
            <p className="text-xs flex items-center gap-1  "> <span> <MdCircle color="#336AEA" size={10} /></span>   Total Impressions</p>
            <span className="font-bold text-white text-[15px] "   > {payload[0].value.toLocaleString()}</span>
          </div>
          <div className="text-[#FFFFFFCC] flex items-center justify-between ">
          <p className="text-xs flex items-center gap-1  "> <span> <MdCircle color="#989898" size={10} /></span>  Total Barcode Scans</p>
          <span className="font-bold text-white text-[15px] "  > {payload[0].value.toLocaleString()}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6  ${h}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Campaign Performance
        </h2>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 focus:outline-none border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <option value="" disabled hidden>
              Date Range
            </option>
            <option>July - August</option>
            <option>Sep - Oct</option>
            <option>Nov - Dec</option>
          </select>
          <select
            value={advertiserName}
            onChange={(e) => setAdvertiserName(e.target.value)}
            className="px-4 py-2 focus:outline-none border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <option value="" disabled hidden>
              Advertiser Name
            </option>
            <option>John Doe</option>
            <option>John Doe</option>
            <option>John Doe</option>

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
