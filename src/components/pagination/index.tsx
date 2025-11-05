import clsx from "clsx";
import { PiCaretLeft, PiCaretRight, PiCaretDown } from "react-icons/pi";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // Optional props for the new simplified style
  totalItems?: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  // Option to use old style vs new style
  variant?: 'simple' | 'detailed';
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  onItemsPerPageChange,
  // variant = 'simple',
  className,
}: PaginationProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const rowsPerPageOptions = [10, 25, 50, 100, 500, 1000, 2424];

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleRowsPerPageChange = (newItemsPerPage: number) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
    setIsDropdownOpen(false);
  };

  // Calculate items info - fallback to page-based calculation if totalItems not provided
  const calculatedTotalItems = totalItems || totalPages * itemsPerPage;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, calculatedTotalItems);

  // Show info text if totalItems is provided; only show rows-per-page control if handler provided
  const showInfoText = totalItems !== undefined;
  const showRowsPerPage = onItemsPerPageChange !== undefined;

  // Build page numbers (windowed)
  const visibleCount = 5;
  const half = Math.floor(visibleCount / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, startPage + visibleCount - 1);
  if (endPage - startPage + 1 < visibleCount) {
    startPage = Math.max(1, endPage - visibleCount + 1);
  }
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className={clsx("flex items-center justify-between py-3", className)}>
      {/* Left: info */}
      <div className="flex items-center gap-3">
        {showRowsPerPage && (
          <div className="flex items-center gap-2">
            {/* <span className="text-sm text-gray-700">Rows per page:</span> */}
            <div className="relative">
              {/* <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded"
              >
                {itemsPerPage}
                <PiCaretDown size={16} />
              </button> */}
              
              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[80px]">
                  {rowsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleRowsPerPageChange(option)}
                      className={clsx(
                        "w-full px-3 py-2 text-left text-sm hover:bg-gray-50",
                        option === itemsPerPage && "bg-gray-100 font-medium"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {showInfoText && (
          <span className="text-[14px] font-medium text-[#444444]">
            Showing {startItem} to {endItem} of {calculatedTotalItems.toLocaleString()}
          </span>
        )}
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={clsx(
            "px-2 py-1 rounded  hover:bg-gray-100 transition-colors flex items-center gap-1",
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <PiCaretLeft size={18} className="text-gray-600" />
          <span className="text-sm text-[#00000080]">Previous</span>
        </button>

        {/* Page numbers */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={clsx(
              "w-8 h-8 rounded-full text-sm flex items-center justify-center",
              p === currentPage
                ? "bg-[#CFE8FF] text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={clsx(
            "px-2 py-1 rounded hover:bg-gray-100 transition-colors flex items-center gap-1",
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="text-sm text-gray-700">Next</span>
          <PiCaretRight size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;