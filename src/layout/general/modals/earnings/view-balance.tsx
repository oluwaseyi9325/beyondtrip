"use client";

import Modal from "@/components/modal";
// import { MdClose } from "react-icons/md";
import { useState } from "react";

interface TModal {
    open: boolean;
    handleClose: () => void;
    refetch?: () => void;
    data: any;
}

const ViewBalance = ({ open, handleClose, data }: TModal) => {
    const [selectedMonth, setSelectedMonth] = useState("SEPTEMBER 2025");

    return (
        <Modal open={open} handleClose={handleClose} className="w-[400px] p-6">
            <div className="w-full flex flex-col gap-6">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900">Available Balance</h2>

                </div>

                {/* Amount Card */}
                <div className="bg-[#C5E4FF] rounded-2xl p-6 text-center space-y-4">
                    <h3 className="text-4xl font-bold text-gray-900">
                        ₦{data?.amount?.toLocaleString() || "55,000.00"}
                    </h3>

                    {/* Last Payout Info */}
                    <div className="space-y-1">
                        <p className="text-sm text-gray-600 font-medium">Last Payout Withdrawal</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">Date:</span>
                            <span className="text-gray-900 font-semibold">
                                {data?.lastPayoutDate || "2025-08-15"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">Amount:</span>
                            <span className="text-gray-900 font-semibold">
                                ₦{data?.lastPayoutAmount?.toLocaleString() || "55,000.00"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Month Selector */}
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                    <option>SEPTEMBER 2025</option>
                    <option>AUGUST 2025</option>
                    <option>JULY 2025</option>
                    <option>JUNE 2025</option>
                </select>

                {/* Balance Details */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Scans</span>
                        <span className="text-sm font-bold text-gray-900">
                            {data?.totalScans || "220"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Points Accumulated</span>
                        <span className="text-sm font-bold text-gray-900">
                            {data?.totalPoints || "220"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Amount Earned</span>
                        <span className="text-sm font-bold text-gray-900">
                            ₦{data?.amountEarned?.toLocaleString() || "55,000.00"}
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ViewBalance;