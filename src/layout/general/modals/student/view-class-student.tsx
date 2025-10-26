import Modal from "@/components/modal";

interface TRegistered {
  accountStatus: string;
  classes: any | null;
  cohorts: any | null;
  emailAddress: string;
  firstName: string;
  id: string;
  identityId: string | null;
  lastName: string;
  middleName: string;
  phoneNumber: string;
}

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data: TRegistered | null;
}

const ViewClassadvertiser = ({ open, handleClose, data, }: TModal) => {
  ;

  if (!data) return null;



  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <div className="w-full flex flex-col gap-10">
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          View advertiser Details
        </p>

        <section className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Full Name:</h3>
            <p className="text-gray-600 font-medium">
              {data.firstName} {data.middleName && `${data.middleName} `}{data.lastName}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Email Address:</h3>
            <p className="text-gray-600">{data.emailAddress}</p>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Phone Number:</h3>
            <p className="text-gray-600">{data.phoneNumber}</p>
          </div>

          {/* <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">advertiser ID:</h3>
            <p className="text-gray-600 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {data.id}
            </p>
          </div> */}

          {/* {data.identityId && (
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Identity ID:</h3>
              <p className="text-gray-600 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {data.identityId}
              </p>
            </div>
          )} */}





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

          {/* Status Toggle Button */}

        </div>
      </div>
    </Modal>
  );
};

export default ViewClassadvertiser;