import { useState } from "react";
import { GoPlus } from "react-icons/go";
import Button from "@/components/button";
import { Option } from "@/components/input/select";
import AddAnnouncement from "@/layout/general/modals/announcement/add";
import AnnounceCard from "@/layout/tutor/announcement/card"; // Assuming you're using the same card component
import { TAnnounce } from "@/layout/tutor/announcement/card";
import Skeleton from "react-loading-skeleton";

interface AnnouncementProps {
  data?: any[];
  isLoading?: boolean;
  refetch?: () => void;
  options: Option[];
  isDashboard?: boolean; // Optional prop to indicate if it's on the dashboard
}

const Announcement = ({ 
  data = [], 
  isLoading = false, 
  refetch,
  options = [],
  isDashboard = false
}: AnnouncementProps) => {
  // Modal state management
  const [open, setOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<TAnnounce | null>(null);

  // Handle creating new announcement
  const handleCreateNew = () => {
    setEditingAnnouncement(null);
    setOpen(true);
  };

  // Handle editing existing announcement
  const handleEdit = (announcement: TAnnounce) => {
    console.log("Editing announcement:", announcement);
    setEditingAnnouncement(announcement);
    setOpen(true);
  };

  // Handle closing modal
  const handleClose = () => {
    setOpen(false);
    setEditingAnnouncement(null);
  };

  const renderSkeletons = () =>
    Array(3)
      .fill(null)
      .map((_, index) => (
        <div key={index} className="p-4 rounded-lg bg-[#f3f3f3]">
          <Skeleton height={120} />
          <Skeleton height={20} width="80%" className="mt-3" />
          <Skeleton height={16} width="60%" className="mt-2" />
        </div>
      ));

  return (
    <>
      {/* Modal for Add/Edit Announcement */}
      <AddAnnouncement
        handleClose={handleClose}
        open={open}
        refetch={refetch}
        isTutor
        options={options}
        editData={editingAnnouncement}
      />

      <section className="w-full ">
        <div className="container p-4 overflow-y-auto h-[700px]">
          <div className="flex items-center justify-between mb-6">
            <p className="header">ANNOUNCEMENTS</p>
            
            {!isDashboard && (
              <Button
              size="md"
              className="max-w-[205px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={handleCreateNew}
            >
              Create Announcement
            </Button> 
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderSkeletons()}
            </div>
          ) : data?.length >= 1 ? (
            <div className={`${!isDashboard? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": "grid-cols-1" } grid  gap-6`}>
              {data.map((item: any) => (
                <AnnounceCard
                  key={item?.id}
                  card={item}
                  handleEdit={() => handleEdit(item)}
                  refetch={refetch}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center min-h-[200px]">
              <div className="space-y-8 text-center">
                <p className="font-[500] text-[#7E7E7EEF]">
                  Nothing here yet 😌
                </p>
                
                <Button
                  handleClick={handleCreateNew}
                  size="md"
                  className="text-white text-sm font-[600]"
                  hasIcon
                  icon={<GoPlus size={20} />}
                >
                  Create Announcement
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Announcement;