import Modal from "@/components/modal";

interface TClass {
  cohortName: string;
  courseCohortId: string;
  courseName: string;
  driverId: string;
  driverName: string;
}

interface ViewClassProps {
  open: boolean;
  handleClose: () => void;
  data: TClass | null;
  refetch?: () => void;
}

const ViewClass = ({ open, handleClose, data }: ViewClassProps) => {
  if (!data) return null;

  return (
    <Modal open={open} handleClose={handleClose} className="w-[500px] p-10">
      <div className="w-full flex flex-col gap-10">
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          View Class Details
        </p>

        <section className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Course Name:</h3>
            <p className="text-gray-600 font-medium">{data.courseName}</p>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Cohort Name:</h3>
            <p className="text-gray-600 font-medium">{data.cohortName}</p>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">driver Name:</h3>
            <p className="text-gray-600 font-medium">{data.driverName}</p>
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
        </div>
      </div>
    </Modal>
  );
};

export default ViewClass;