import clsx from "clsx";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
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

  // Calculate items info
  const calculatedTotalItems = totalItems || totalPages * itemsPerPage;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, calculatedTotalItems);

  const showInfoText = totalItems !== undefined;
  const showRowsPerPage = onItemsPerPageChange !== undefined;

  // Build page numbers - fewer pages on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const visibleCount = isMobile ? 3 : 5;
  const half = Math.floor(visibleCount / 2);
  let startPage = Math.max(1, currentPage - half);
  const endPage = Math.min(totalPages, startPage + visibleCount - 1);
  if (endPage - startPage + 1 < visibleCount) {
    startPage = Math.max(1, endPage - visibleCount + 1);
  }
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className={clsx("flex flex-col sm:flex-row items-center justify-between gap-3 py-3", className)}>
      {/* Left: info */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
        {showRowsPerPage && (
          <div className="flex items-center gap-2">
            <div className="relative">
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
          <span className="text-[12px] sm:text-[14px] font-medium text-[#444444] text-center sm:text-left">
            Showing {startItem} to {endItem} of {calculatedTotalItems.toLocaleString()}
          </span>
        )}
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={clsx(
            "px-2 py-1 rounded hover:bg-gray-100 transition-colors flex items-center gap-1",
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <PiCaretLeft size={18} className="text-gray-600" />
          <span className="text-xs sm:text-sm text-[#00000080] hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={clsx(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm flex items-center justify-center",
                p === currentPage
                  ? "bg-[#CFE8FF] text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={clsx(
            "px-2 py-1 rounded hover:bg-gray-100 transition-colors flex items-center gap-1",
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline">Next</span>
          <PiCaretRight size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;