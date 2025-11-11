import React, { useState } from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import Pagination from '@/components/pagination';

function Ratings() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with your actual ratings data
  const allRatings = Array.from({ length: 250 }, (_, i) => ({
    id: i + 1,
    date: "2025-08-15",
    time: "11:24am",
    user: "Anonymous...",
    rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
  }));

  const totalItems = allRatings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page ratings
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRatings = allRatings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg">
      <div className="space-y-6">
        {/* Ratings Grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {currentRatings.map((rating) => (
            <div key={rating.id} className="bg-white border border-gray-300 rounded-xl p-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white shrink-0">
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between text-sm gap-1">
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

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default Ratings;