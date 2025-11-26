// import EditBank from '@/layout/general/modals/earnings/edit-bank';
import EditBank from '@/layout/general/modals/earnings/edit-bank';
import useAuthStore from '@/store/useAuthStore';
import React, { useState } from 'react'
import { BiKey } from 'react-icons/bi';

function BankDetailsContent() {
    const { profile } = useAuthStore();
    // console.log(profile?.bankDetails, "bank details")
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="space-y-6">
                {/* Bank Details Display */}
                <div className="bg-white p-8 rounded-lg">
                    <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Bank/Payment Details</h2>
                        <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors">
                            Verified
                        </button>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-xl p-6">
                        <div className="grid sm;grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-1">Name of Bank</p>
                                <p className="text-sm text-gray-500">{profile?.bankDetails?.bankName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-1">Account Name</p>
                                <p className="text-sm text-gray-500">{profile?.bankDetails?.accountName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-1">Account Number</p>
                                <p className="text-sm text-gray-500">{profile?.bankDetails?.accountNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Bank Details */}
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Bank/Payment Details</h2>
                    <div className="bg-white border border-gray-300 rounded-xl p-6">
                        <p className="text-sm text-gray-600 mb-3">Change your bank details here</p>
                        <button onClick={() => setOpen(true)} className="text-[#2C4C9C] font-medium hover:underline flex items-center gap-2">
                            <BiKey size={20} />
                            Change your bank details
                        </button>
                    </div>
                </div>
            </div>
            <EditBank open={open} handleClose={() => setOpen(false)} />
        </>
    )
}

export default BankDetailsContent;
