import React from 'react';
import { FaUser, FaStar } from 'react-icons/fa';
import { Comment } from '@/data/comments';

interface CommentListItemProps {
  comment: Comment;
}

function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Profile Icon */}
          <div className="h-12 w-12 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white flex-shrink-0">
            <FaUser size={20} />
          </div>

          {/* Review Content */}
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-gray-900 mb-1">
              {comment.reviewText}
            </p>
            <p className="text-sm text-gray-600 mb-1">{comment.userName}</p>
            <p className="text-sm text-gray-600">
              {comment.date} {comment.time}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end flex-shrink-0">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={16}
                className={
                  star <= comment.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>

          {/* Condition */}
          <p className="text-sm font-medium text-[#2C4C9C]">
            Condition: {comment.condition}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommentListItem;

