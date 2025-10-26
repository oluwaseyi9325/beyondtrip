import clsx from 'clsx';
import React, { useState } from 'react'
import { FaStar, FaUser } from 'react-icons/fa';

function Ratings() {
      const ratings = Array(10).fill({
        date: "2025-08-15",
        time: "11:24am",
        user: "Anonymous...",
        rating: 4,
      });
    
      const [currentPage, setCurrentPage] = useState(1);
    //   const totalPages = 5;
  return (
      <div className="bg-white p-8 rounded-lg">
           <div className="space-y-6">
          {/* Ratings Grid */}
          <div className="grid grid-cols-2 gap-4">
            {ratings.map((rating, index) => (
              <div key={index} className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white flex-shrink-0">
                    <FaUser size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={20}
                          className={star <= rating.rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{rating.date}</span>
                        <span className="text-gray-500">{rating.time}</span>
                      </div>
                      <span className="text-gray-900">{rating.user}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
    
          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-gray-600">Showing 1 to 10 of 250</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={clsx(
                    "h-8 w-8 rounded",
                    currentPage === page
                      ? "bg-blue-200 text-blue-800 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                Next
              </button>
            </div>
          </div>
        </div>
       </div>
  )
}

export default Ratings
