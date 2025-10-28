import clsx from "clsx";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";

export interface TStats {
  title: string;
  figure: string;
  icon?: any;
  description?:string;
}

interface Props {
  data: TStats;
}

const StatsCard = ({ data }: Props) => {
  const [showEarnings, setShowEarnings] = useState(false);
  const isEarnings = data.title === "Total Earnings";

  return (
    <div className="w-full bg-white border border-gray-200 py-4 px-6 rounded-xl  flex flex-col gap-4">
      {/* Top Section: Icon and Title */}
      <div className="flex items-center gap-5">
        {
          data.icon && <div
            className={clsx(
              "h-8 w-8 rounded-full flex items-center justify-center",
              "bg-[#EFEFFF] text-[#434494]"
            )}
          >
            {data?.icon}
          </div>
        }
        <p className="text-xl font-[500] text-[#5E5E5E]">{data.title}</p>

      </div>
      <p className="text-xs font-[500] mt-[-12px] text-[#00000080]">{data?.description}</p>

      {/* Bottom Section: Figure and Eye Icon */}
      <div className="flex items-center gap-3">
        <p className="font-[800] text-[25px] text-[#171313]">
          {isEarnings ? (showEarnings ? data.figure : "************") : data.figure}
        </p>

        {isEarnings && (
          <button
            onClick={() => setShowEarnings(!showEarnings)}
            className="text-[#5E5E5E] hover:text-[#171313] transition-colors"
          >
            <AiOutlineEye size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatsCard;