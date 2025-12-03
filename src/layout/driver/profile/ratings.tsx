import React, { useState } from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import Pagination from '@/components/pagination';
import { useGetDriverRatings } from '@/services/ratings.servcie';

function Ratings() {
const { data } = useGetDriverRatings();
  const ratings = data?.ratings?.recent || [];
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = ratings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page ratings
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRatings = ratings.slice(startIndex, startIndex + itemsPerPage);


   const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

   const formatTime = (dateString:any ) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
   };
  
    const getUserName = (rater:any) => {
    if (!rater || !rater.name) {
      return "Anonymous...";
    }
    return rater.name;
  };


  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg">
      <div className="space-y-6">
        {/* Ratings Grid */}

         <div className="grid lg:grid-cols-2 gap-4">
          {currentRatings.map((rating:any) => (
            <div key={rating.id} className="bg-white border border-gray-300 rounded-xl p-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-900 flex items-center justify-center text-white shrink-0">
                  <FaUser size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={20}
                        className={star <= rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  {rating.review && (
                    <p className="text-sm text-gray-700 mb-2">{rating.review}</p>
                  )}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between text-sm gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {formatDate(rating.createdAt)}
                      </span>
                      <span className="text-gray-500">
                        {formatTime(rating.createdAt)}
                      </span>
                    </div>
                    <span className="text-gray-900">{getUserName(rating.rater)}</span>
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