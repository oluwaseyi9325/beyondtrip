import Modal from "@/components/modal";
import { useActivateTutor, useDeactivateTutor } from "@/services/tutor.service";
import toast from "react-hot-toast";

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

const ViewStudent = ({ open, handleClose, data, refetch }: TModal) => {
  const deactivate = useDeactivateTutor(data?.identityId);
  const activate = useActivateTutor(data?.identityId);
  console.log(data,"gettt")

  const isActive = data?.accountStatus?.toLowerCase() === 'active';

  function handleActivate() {
    activate.mutate(
      { id: data?.identityId },
      {
        onSuccess: () => {
          toast.success("Tutor activated successfully!");
          refetch?.(); // Refresh the data
          handleClose();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ?? "Failed to activate tutor"
          );
        },
      }
    );
  }

  function handleDeactivate() {
    deactivate.mutate(
      { id: data?.identityId },
      {
        onSuccess: () => {
          toast.success("Tutor deactivated successfully!");
          refetch?.(); // Refresh the data
          handleClose();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ?? "Failed to deactivate tutor"
          );
        },
      }
    );
  }

  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <div className="w-full flex flex-col gap-10">
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          View Student
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

          {/* <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Identity ID:</h3>
            <p className="text-gray-600 text-sm">{data?.identityId}</p>
          </div> */}

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Status:</h3>
            <p className={`font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
              {data?.accountStatus}
            </p>
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
          
          {isActive ? (
            <button
              type="button"
              onClick={handleDeactivate}
              disabled={deactivate.isPending}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {deactivate.isPending ? "Deactivating..." : "Deactivate"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleActivate}
              disabled={activate.isPending}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {activate.isPending ? "Activating..." : "Activate"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewStudent;