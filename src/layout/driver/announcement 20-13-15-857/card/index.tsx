import Dropdown from "@/components/dropdown";
import { useDeleteAnnouncementById } from "@/services/announcement.service";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";

export interface TAnnounce {
  announcedBy: string;
  announcementCategory: string;
  announcementInfo: string;
  announcementName: string;
  announcerId: string;
  announcerName: string;
  courseClassId: any[];
  id: string;
}

interface TProps {
  card: TAnnounce;
  handleEdit?: () => void;
  handleDelete?: () => void;
  refetch?: () => void;
}

const AnnounceCard = ({ card, handleEdit, refetch }: TProps) => {
  // console.log(card);
  const { mutate: deleteAnnouncement, isPending } = useDeleteAnnouncementById();
  const { profile } = useAuthStore();
  console.log("Profile:", profile?.identityId
  );
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      deleteAnnouncement(card.id, {
        onSuccess: () => {
          toast.success("Announcement deleted successfully!");
          if (refetch) refetch();
          console.log("Announcement deleted successfully");
        },
        onError: (error) => {
          toast.error("Error deleting announcement");
          console.error("Error deleting announcement:", error);
        },
      });
    }
  };

  return (
    <div className="bg-[#D0E9FF] rounded-2xl p-4 shadow-sm border-blue-100 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {card.announcementName}
        </h2>

        {
          profile?.identityId === card.announcerId ? 
          <Dropdown className="relative" position="-right-2">
          <button className="p-2 rounded-full hover:bg-blue-200 transition-colors">
            <BsThreeDotsVertical className="w-4 h-4 text-gray-600" />
          </button>

          <div className="w-[180px] bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
            <div
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={handleEdit}
            >
              <span className="text-sm text-gray-700">Edit Announcement</span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={handleDelete}
            >
              <span className={`text-sm ${isPending ? 'text-gray-400' : 'text-red-600'}`}>
                {isPending ? "Deleting..." : "Delete Announcement"}
              </span>
            </div>
          </div>
            </Dropdown> : 
          <div className="text-gray-400">
            <span className="text-[8px]">...</span>
          </div>

        }
      </div>

      {/* <p className="text-[#4E4E4EEF] text-sm leading-relaxed mb-6 h-[100px] truncate">
        {card.announcementInfo}
      </p> */}
 <p dangerouslySetInnerHTML={{ __html: card.announcementInfo }} className="text-[#4E4E4EEF] text-sm leading-relaxed mb-6 h-[100px] truncate"/>
        {/* {card.announcementInfo}
      </p> */}

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div>
          <p className="font-medium">Category</p>
          <p>{card.announcementCategory}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">Announced By</p>
          <p>{card.announcedBy}</p>
        </div>
      </div>

      <div className="absolute max-w-[300px] bottom-0 left-3.5 right-0 h-1 bg-blue-500 rounded-b-2xl"></div>
    </div>
  );
};

export default AnnounceCard;