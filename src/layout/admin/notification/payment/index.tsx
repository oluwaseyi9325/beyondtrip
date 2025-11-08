import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import NotificationCard from "../notificationCard";

const NotificationPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: any) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    // Show fewer pages on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxVisible = isMobile ? 3 : 5;
    
    const pages = [];
    
    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages - 1, start + maxVisible - 1);
      
      // Adjust start if end is at the limit
      if (end === totalPages - 1) {
        start = Math.max(2, end - maxVisible + 1);
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
      {/* Left - Showing text */}
      <div className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
        Showing {startItem} to {endItem} of {totalItems}
      </div>

      {/* Right - Pagination controls */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-xs sm:text-sm"
        >
          <MdChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                page === currentPage
                  ? "bg-blue-100 text-blue-600"
                  : page === "..."
                  ? "cursor-default text-gray-400"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <MdChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const PaymentNotifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with your actual data
  const notifications = Array.from({ length: 250 }, (_, i) => ({
    id: i + 1,
    title: "Invoice #INV-1023 paid by ABC Digital",
    date: "March 1, 2025",
    time: "10:05am",
  }));

  const totalItems = notifications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page notifications
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = notifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleView = (notification: any) => {
    console.log("View notification:", notification);
  };

  const handleDismiss = (id: any) => {
    console.log("Dismiss notification:", id);
  };

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Notifications List */}
      <div className="space-y-4">
        {currentNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onView={handleView}
            onDismiss={handleDismiss}
          />
        ))}
      </div>

      {/* Pagination */}
      <NotificationPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaymentNotifications;