import React from 'react';
import Drawer from '@/components/drawer';
import { DriverRow } from '@/layout/admin/tables/admin/data';
import { LuStar } from 'react-icons/lu';
import Tabs from '@/components/tab';
import { MdCircle } from 'react-icons/md';
import ViewTab from '@/layout/admin/driversTab/view';
import CommentsTab from '@/layout/admin/driversTab/comments';

interface ViewDriverProps {
  open: boolean;
  handleClose: () => void;
  driver: DriverRow | null;
}

function ViewDriver({ open, handleClose, driver }: ViewDriverProps) {
  if (!driver) return null;

  const [activeTab, setActiveTab] = React.useState(0);

  const tabsData: any = [
    {
      title: "View",
      content: <ViewTab driver={driver} setActiveTab={setActiveTab} />
    },
    {
      title: "Ratings/Comments",
      content: <CommentsTab />
    },

  ];

  return (
    <Drawer
      open={open}
      handleClose={handleClose}
      className="max-w-[600px]  bg-[#F7F7F7]"
    >
      <div className="h-screen scrollbar-none overflow-y-auto bg-[#F7F7F7]">
        {/* Header Section */}
        <div className="p-6 bg-white ">
          <div className="flex items-start justify-between mb-2">
            <div className='flex flex-col gap-4 '>
              <div className='flex items-center justify-center ' >
                <h2 className="text-base font-bold">{driver.name}</h2>
                 <span className='flex items-center gap-2'>
                  <MdCircle className='text-[#27458F] ml-2 ' size={8} />
                  4.8 <LuStar className="text-yellow-500 fill-yellow-500" size={20} />
                  </span> 
              </div>
              <p className="text-gray-600 text-sm mt-[-15px] ">{driver.idNo}</p>


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

        <div className='px-6'>
          <Tabs tabs={tabsData} defaultTab={0} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

      
      </div>
    </Drawer>
  );
}

export default ViewDriver;