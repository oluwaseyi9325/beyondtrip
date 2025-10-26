"use client";

import { useState } from "react";

export const MagazinePickup = () => {
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 ">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Magazine Pick-up</h2>
      
      <div className="space-y-4 mb-6">
        <p className="text-sm text-gray-600">Next Issue Available:</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">April Edition</span>
          <span className="font-semibold text-gray-900">Dec. 22nd, 2025</span>
        </div>
      </div>

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-500 mb-4 cursor-pointer hover:border-gray-400"
      >
        <option value="">Select preferred pickup location</option>
        <option value="ikeja">Ikeja Hub</option>
        <option value="lekki">Lekki Office</option>
        <option value="vi">Victoria Island</option>
      </select>

      <button className="w-full bg-[#2C4C9C] text-white py-3 rounded-lg font-medium hover:bg-[#234080] transition-colors">
        Submit
      </button>
    </div>
  );
};
