import Button from '@/components/button'
import EditBank from '@/layout/general/modals/earnings/edit-bank'
import React, { useState } from 'react'

function BankDetails({ bankName, accountNumber, accountName }: any) {
    const [open,setOpen]=useState(false)
    return (
        <>
            <div className="bg-white border mb-3 border-gray-200 rounded-2xl p-6 shadow-sm col-span-2 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Bank Details (Withdrawal)
                </h2>
                <div className="flex items-center flex-wrap justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white font-semibold">
                           {accountName}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 uppercase">{bankName}</p>
                            <p className="text-sm text-gray-500">{accountNumber}</p>
                        </div>
                    </div>
                    <Button handleClick={()=>setOpen(true)} className="w-auto!  bg-[#336AEA] text-white px-20 py-2.5 rounded-lg font-medium hover:bg-[#2952b8] transition-colors whitespace-nowrap">
                        Edit Bank Details
                    </Button>
                </div>
            </div>
            <EditBank open={ open} handleClose={()=>setOpen(false)} data={[]} />
        </>
    )
}

export default BankDetails
