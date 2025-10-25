import Modal from "@/components/modal";
import { useApproveScholarship } from "@/services/scholarship.service";
import toast from "react-hot-toast";

interface ViewPartnerStudentProps {
  open: boolean;
  handleClose: () => void;
  data: any | null;
  refetch?: () => void;
  refetchStudent?: ()=>void
}

const ViewPartnerStudent = ({ open, handleClose, data, refetchStudent }: ViewPartnerStudentProps) => {
  // if (!data) return null;
  const scholarship = useApproveScholarship();

  const handleApproved = () => {
    scholarship.mutate(data, {
      onSuccess: () => {
        toast.success("Scholarship Approved!")
        handleClose();
        if (refetchStudent) {
          refetchStudent()
        }
       
      },
      onError: (err:any) => {
        toast.error(
          err?.response?.data?.error?.description ??
            "An error occured while inviting tutor"
        );
      }
    })
 }

  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <div className="w-full flex flex-col gap-10">
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          View Partner Student
        </p>

        <section className="w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Name:</h3>
            <p className="text-gray-600">
              {data?.firstName} {data?.lastName}
            </p>
          </div>

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Email:</h3>
            <p className="text-gray-600">{data?.emailAddress}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Phone Number:</h3>
            <p className="text-gray-600">{data?.phoneNumber}</p>
          </div>

          {data?.courseApplyingFor && (
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-800 mb-2">Course Applying For:</h3>
              <p className="text-gray-600">{data?.courseApplyingFor}</p>
            </div>
          )}

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Address:</h3>
            <p className="text-gray-600">
              {data?.stateOrRegion && data?.country 
                ? `${data.stateOrRegion}, ${data.country}`
                : data?.stateOrRegion || data?.country || 'N/A'
              }
            </p>
          </div>

          {data?.date && (
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-800 mb-2">Registration Date:</h3>
              <p className="text-gray-600">
                {new Date(data.date).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Status:</h3>
            <div
              // className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
              //   isActive
              //     ? 'bg-[#CBFFE5] text-[#018844] border border-[#CBFFE5]'
              //     : 'bg-[#CDCDCD] text-white border border-[#CDCDCD]'
              // }`}
              className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${
                data?.applicationStatus === "Approved"
                  ? "bg-[#CBFFE5] text-[#018844] border-[#CBFFE5]" // green
                  : data?.applicationStatus === "Rejected"
                  ? "bg-[#FECACA] text-[#B91C1C] border-[#FECACA]" // red
                  : data?.applicationStatus === "Pending"
                  ? "bg-[#FEF3C7] text-[#92400E] border-[#FEF3C7]" // yellow
                  : "bg-[#CDCDCD] text-white border-[#CDCDCD]" // default
              }`}
              
            >
              {data?.applicationStatus||'N/A'}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {
            (data?.applicationStatus === "Pending") && (
              <button
              type="button"
              onClick={() =>handleApproved()}
              className="px-6 py-2 bg-[#121363] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
            Approve Student
            </button>
           )
          }
         
        </div>
      </div>
    </Modal>
  );
};

export default ViewPartnerStudent;