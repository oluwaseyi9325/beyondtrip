import React, { useState } from 'react';
import { COMMENTS_MOCK } from '@/data/comments';
import CommentListItem from '@/layout/general/comment-list-items';
import Pagination from '@/components/pagination';

function CommentsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(COMMENTS_MOCK.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComments = COMMENTS_MOCK.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#F7F7F7] max-w-[600px]  space-y-4">
      {currentComments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}

      {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={COMMENTS_MOCK.length}
          itemsPerPage={itemsPerPage}
        />
        <div className='mx-auto max-w-[265px] w-full my-6 ' >
            <button  className='rounded-[8px] px-3 py-[10px] w-full text-white font-medium bg-[#336AEA]  ' >
                Cancel
            </button>
        </div>
    </div>
  );
}

export default CommentsTab;
