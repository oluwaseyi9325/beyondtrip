import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeleton = ({ rows = 10, columns = 6 }) => {
  const tableRows = Array.from({ length: rows });

  return (
    <div className="w-full rounded-md overflow-hidden">
      <div className="grid grid-cols-6 gap-4 bg-gray-100 p-4">
        {Array.from({ length: columns }).map((_, idx) => (
          <Skeleton key={idx} height={20} />
        ))}
      </div>

      {tableRows.map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-6 gap-4 p-4 border-t border-gray-200"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height={16} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
