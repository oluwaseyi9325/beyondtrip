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
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  onItemsPerPageChange,
  // variant = 'simple',
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

  // If no totalItems provided and only basic props available, show basic pagination
  const showSimplified = totalItems !== undefined && onItemsPerPageChange !== undefined;

  return (
    <div className="flex items-center justify-center px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center gap-6">
        {/* Rows per page - only show if callback provided */}
        {showSimplified && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded"
              >
                {itemsPerPage}
                <PiCaretDown size={16} />
              </button>
              
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

        {/* Page info */}
        {showSimplified ? (
          <span className="text-sm text-gray-700">
            {startItem}-{endItem} of {calculatedTotalItems.toLocaleString()}
          </span>
        ) : (
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages.toLocaleString()}
          </span>
        )}
        
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={clsx(
              "p-1 rounded hover:bg-gray-100 transition-colors",
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            )}
          >
            <PiCaretLeft size={20} className="text-gray-600" />
          </button>
          {currentPage}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={clsx(
              "p-1 rounded hover:bg-gray-100 transition-colors",
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            )}
          >
            <PiCaretRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;