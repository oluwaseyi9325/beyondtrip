import Modal from "@/components/modal";


interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data: any;
}

export interface TAddClass {
  course: string;
  cohort: string;
}

const ViewAnnouncement = ({ open, handleClose, data }: TModal) => {


  return (
    <Modal open={open} handleClose={handleClose} className="w-[600px] max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            View Announcement
          </h2>
         
        </div>

        {/* Announcement Badge */}
        <div className="mb-6">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${data?.bgColor || 'bg-blue-100'} ${data?.titleColor || 'text-blue-600'}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${data?.badgeColor?.replace('text-', 'bg-') || 'bg-blue-600'}`}></div>
            {data?.announcementCategory || 'General'}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Announcement Title */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {data?.announcementName}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {data?.announcementInfo}
            </p>
          </div>

          {/* Announcement Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Announced By</h4>
              <p className="text-gray-600">{data?.announcedBy}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Announcer Name</h4>
              <p className="text-gray-600">{data?.announcerName}</p>
            </div>

           
          </div>

         
         
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Close
          </button>
          
          {/* Optional action button with dynamic styling */}
          {/* <button
            className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              data?.buttonColor || 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
            }`}
          >
            Mark as Read
          </button> */}
        </div>
      </div>
    </Modal>
  );
};

export default ViewAnnouncement;