import Button from '@/components/button'
import PayoutDetails from '@/layout/general/modals/earnings/payout-details'
import ViewBalance from '@/layout/general/modals/earnings/view-balance'
import React, { useState } from 'react'
import { MdArrowForward } from 'react-icons/md'

function AvailableBalance({ availableBalance }: any) {
  const [open, setIsopen] = useState(false)
  const [isBalance, setIsBalance] = useState(false)
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm col-span-2 flex flex-col justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Available Balance
          </h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            ₦{availableBalance.toLocaleString()}
          </h3>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => setIsBalance(true)} className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
            Click to view balance details
            <MdArrowForward size={16} />
          </button>
          <Button handleClick={() => setIsopen(true)} className="!w-auto bg-[#336AEA] text-white px-20 py-2.5 rounded-lg font-medium hover:bg-[#2952b8] transition-colors whitespace-nowrap">
            Withdraw Earnings
          </Button>
        </div>
      </div>


      <ViewBalance open={isBalance} handleClose={() => setIsBalance(false)} data={[]} />
      <PayoutDetails open={open} handleClose={() => setIsopen(false)} data={[]} />
    </>
  )
}

export default AvailableBalance
