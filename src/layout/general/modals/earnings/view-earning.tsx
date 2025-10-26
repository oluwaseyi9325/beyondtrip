import Modal from "@/components/modal";
// import { MdClose } from "react-icons/md";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data: any;
}

const TransactionDetails = ({ open, handleClose, data }: TModal) => {
  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-8">
      <div className="w-full flex flex-col gap-6">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Transaction details</h2>
         
        </div>

        {/* Amount Card */}
        <div className="bg-[#C5E4FF] rounded-2xl p-6 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-2">
            {data?.amount?.toLocaleString() || "50,000.00"}
          </h3>
          <p className="text-sm text-gray-600">
            {data?.date || "05 September 2025"} {data?.time || "11:24am"}
          </p>
        </div>

        {/* Transaction Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Transaction Date & Time</span>
            <span className="text-sm font-semibold text-gray-900">
              {data?.date || "05 September 2025"} {data?.time || "11:24am"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Transaction Type</span>
            <span className="text-sm font-semibold text-gray-900">
              {data?.type || "Withdraw"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Payment Channel</span>
            <span className="text-sm font-semibold text-gray-900">
              {data?.channel || "Bank Account"}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4"></div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reference Code</span>
            <span className="text-sm font-semibold text-gray-900">
              {data?.referenceCode || "00456349cEAzU"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status</span>
            <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              {data?.status || "Approved"}
            </span>
          </div>
        </div>

        {/* Download Receipt Button */}
        <button className="w-full bg-[#336AEA] text-white py-3 rounded-lg font-medium hover:bg-[#2952b8] transition-colors">
          Download Receipt
        </button>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-600">
          For complaints regarding this transaction,{" "}
          <button className="text-gray-900 font-semibold hover:underline">
            contact our support team
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default TransactionDetails;