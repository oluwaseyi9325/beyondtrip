import React from 'react'

function UpcomingPayout({upcomingPayout, payoutDate}:any) {
  return (
     <div className="bg-white mb-6 lg:mb-0 border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Upcoming Payout
              </h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                ₦{upcomingPayout.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500">
                (Available for withdrawal on {payoutDate})
              </p>
            </div>
          </div>
  )
}

export default UpcomingPayout
