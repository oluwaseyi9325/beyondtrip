import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

function PolicyCard() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#C5E4FF] p-5 border border-[#336AEA] rounded-lg flex items-start justify-between transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-start space-x-4">
        {/* Info Icon */}
        <div className="text-[#336AEA] text-4xl">
          <AiOutlineInfoCircle size={40} />
        </div>

        {/* Content */}
        <div>
          <h2 className="font-semibold text-lg text-black">
            Campaign Pause & Cancel Policy
          </h2>
          <ul className="list-disc ml-5 mt-1 text-gray-800 text-sm space-y-1">
            <li>Campaigns 1 month or less cannot be paused or canceled.</li>
            <li>
              Campaigns longer than 1 month can be paused after the first month.
            </li>
            <li>
              Remaining time slot can be resumed later or applied to another
              campaign <span className="font-semibold">(NO CASH REFUNDS).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="text-gray-600 hover:text-black text-xl"
      >
        <IoClose />
      </button>
    </div>
  );
}

export default PolicyCard;
