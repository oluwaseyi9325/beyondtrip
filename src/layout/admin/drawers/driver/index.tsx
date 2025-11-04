import React from 'react';
import Drawer from '@/components/drawer';
import { DriverRow } from '@/layout/admin/tables/admin/data';
import { LuStar, LuEye, LuArrowRight } from 'react-icons/lu';
import Tabs from '@/components/tab';
import MagazineTable from '@/layout/driver/tables/magazines';

interface ViewDriverProps {
  open: boolean;
  handleClose: () => void;
  driver: DriverRow | null;
}

function ViewDriver({ open, handleClose, driver }: ViewDriverProps) {
  if (!driver) return null;

  const tabsData: any = [
    {
      title: "View",
      content: ""
    },
    {
      title: "Ratings/Comments",
      content: ""
    },

  ];

  return (
    <Drawer
      open={open}
      handleClose={handleClose}
      className="w-[600px] bg-[#F7F7F7]"
    >
      <div className="h-screen overflow-y-auto bg-[#F7F7F7]">
        {/* Header Section */}
        <div className="p-6 bg-white ">
          <div className="flex items-start justify-between mb-2">
            <div className='flex gap-4 '>
              <div>
                <h2 className="text-2xl font-bold">{driver.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{driver.idNo}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-lg font-semibold">
                  4.8 <LuStar className="text-yellow-500 fill-yellow-500" size={20} />
                </span>
              </div>

            </div>
            <div className="mt-3">
              <span
                className={
                  driver.status === "Active"
                    ? "inline-flex items-center justify-center rounded-full px-4 py-1.5 border border-[#008000] text-[#008000] bg-white text-sm font-medium"
                    : "inline-flex items-center justify-center rounded-full px-4 py-1.5 border border-[#FF0033] bg-white text-[#FF0033] text-sm font-medium"
                }
              >
                {driver.status}
              </span>
            </div>
          </div>



        </div>

        <div className='px-6 mt-6 bg-white'>
          <Tabs tabs={tabsData} defaultTab={0} />
        </div>

        {/* Content Section */}
        <div className="px-6 space-y-6">
          <div className='grid grid-cols-2 gap-4'>
            {/* Basic Details */}
            <div className="bg-white rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Basic Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Email Address:</label>
                  <p className="text-base font-medium">john@example.com</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone No:</label>
                  <p className="text-base font-medium">08345687293</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Address:</label>
                  <p className="text-base font-medium">{driver.location}</p>
                </div>
              </div>
            </div>

            {/* Bank/Payment Details */}
            <div className="bg-white rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Bank/Payment Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Bank Name</label>
                  <p className="text-base font-medium">Wema Bank</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Account No</label>
                  <p className="text-base font-medium">9821643439</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Account Name</label>
                  <p className="text-base font-medium">{driver.name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* Verification Documents */}
            <div className="bg-white rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Verification Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* <LuCheckCircle className="text-green-600" size={20} /> */}
                    <span className="text-base font-medium">Drivers License</span>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                    <LuEye size={16} />
                    view
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* <LuCheckCircle className="text-green-600" size={20} /> */}
                    <span className="text-base font-medium">National ID</span>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                    <LuEye size={16} />
                    view
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* <LuCheckCircle className="text-green-600" size={20} /> */}
                    <span className="text-base font-medium">Vehicle Registration Documents</span>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                    <LuEye size={16} />
                    view
                  </button>
                </div>
              </div>
            </div>

            {/* Engagement */}
            <div className="bg-white rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Engagement</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-600">Earnings:</label>
                  <p className="text-base font-semibold">{driver.earnings}</p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-600">Scans:</label>
                  <p className="text-base font-semibold">{driver.scans}</p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-600">Points:</label>
                  <p className="text-base font-semibold">{driver.points}</p>
                </div>
              </div>
            </div>
          </div>

          {/* View Ratings Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            Click to view ratings/comments
            <div className="bg-white/20 rounded-full p-1">
              <LuArrowRight size={16} />
            </div>
          </button>

          <MagazineTable data={[]}/>
        </div>
      </div>
    </Drawer>
  );
}

export default ViewDriver;