"use client";

import React from "react";
import Drawer from "@/components/drawer";
import { AdvertisersOverviewRow } from "@/layout/admin/tables/admin-advertiser/data";
import SelectSearch from "@/components/input/selectSearch";
import DateInput from "@/components/input/date";
import { useForm } from "react-hook-form";
import Table from "@/components/table";
import { columns as historyColumns, mockHistory, HistoryRow } from "./data";
import Tabs from "@/components/tab";
import CommentsTab from "@/layout/admin/driversTab/comments";
import Pagination from "@/components/pagination";
import ViewTab from "./view";
import HistoryTab from "./history";

export interface AdvertiserDrawerProps {
  open: boolean;
  onClose: () => void;
  advertiser: AdvertisersOverviewRow | null;
}






function AdvertiserDrawer({ open, onClose, advertiser }: AdvertiserDrawerProps) {
  const [activeTab, setActiveTab] = React.useState(0);

 

  if (!advertiser) return null;





  const tabsData = [
    { title: "View", content: <ViewTab setActiveTab={setActiveTab} /> },
    { title: "Invoice History", content: <HistoryTab /> },
  ];

  return (
    <Drawer open={open} handleClose={onClose} className=" z-999 max-w-[650px] bg-[#F7F7F7]">
      <div className="h-screen overflow-y-auto scrollbar-none bg-[#F7F7F7]">
        {/* Header */}
        <div className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold">{advertiser.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{advertiser.idNo}</p>
            </div>
            <span
              className={
                advertiser.status === "Active"
                  ? "inline-flex items-center justify-center rounded-full px-4 py-1.5 border border-[#008000] text-[#008000] bg-white text-sm font-medium"
                  : "inline-flex items-center justify-center rounded-full px-4 py-1.5 border border-[#FF0033] bg-white text-[#FF0033] text-sm font-medium"
              }
            >
              {advertiser.status}
            </span>
          </div>
        </div>

        <div className='px-6'>
          <Tabs tabs={tabsData} defaultTab={0} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </Drawer>
  );
}

export default AdvertiserDrawer;


