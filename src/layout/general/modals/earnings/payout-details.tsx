"use client";

import Button from "@/components/button";
import Modal from "@/components/modal";
import { useState } from "react";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data?: any;
}

const PayoutDetails = ({ open, handleClose, data }: TModal) => {
  const [withdrawAmount, setWithdrawAmount] = useState("50,000.00");

  return (
    <Modal open={open} handleClose={handleClose} className="w-[500px] p-8">
      <div className="w-full flex flex-col gap-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payout details</h2>
        </div>

        {/* Payment Method Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bank Name:</span>
              <span className="text-sm font-medium text-gray-500">
                {data?.bankName || "WEMA BANK PLC"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Account No:</span>
              <span className="text-sm font-medium text-gray-500">
                {data?.accountNumber || "0923834234"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Account Name:</span>
              <span className="text-sm font-medium text-gray-500">
                {data?.accountName || "JOHN DOE M."}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Available Balance */}
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600">Available Balance</span>
          <span className="text-base font-bold text-gray-900">
            ₦{data?.availableBalance?.toLocaleString() || "85,000.00"}
          </span>
        </div>

        {/* Withdraw Amount */}
        <div className="space-y-3">
          <label className="text-base font-semibold text-gray-900 text-center block">
            Withdraw Amount
          </label>
          <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
            <input
              type="text"
              value={`₦${withdrawAmount}`}
              onChange={(e) => {
                const value = e.target.value.replace(/[₦,]/g, '');
                if (!isNaN(Number(value))) {
                  setWithdrawAmount(Number(value).toLocaleString());
                }
              }}
              className="text-3xl font-bold text-gray-900 text-center w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <Button 
            size="md" 
            className="!w-full bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
          >
            Submit
          </Button>

          <Button 
            variant="border" 
            size="md" 
            borderColor="#336AEA"
            borderWidth="1"
            className="!w-full bg-white text-[#336AEA] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            handleClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PayoutDetails;