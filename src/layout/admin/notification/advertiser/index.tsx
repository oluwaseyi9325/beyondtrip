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
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Left - Showing text */}
      <div className="text-gray-600 text-sm">
        Showing {startItem} to {endItem} of {totalItems}
      </div>

      {/* Right - Pagination controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <MdChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${page === currentPage
                ? "bg-blue-100 text-blue-600"
                : page === "..."
                  ? "cursor-default text-gray-400"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          Next
          <MdChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ✅ Main Driver Notifications Component
const AdvertiserNotifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with your actual data
  const notifications = Array.from({ length: 250 }, (_, i) => ({
    id: i + 1,
    title: "New Campaign submission from ABC Digital",
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

  const handleView = (notification:any) => {
    console.log("View notification:", notification);
  };

  const handleDismiss = (id:any) => {
    console.log("Dismiss notification:", id);
  };

  const handlePageChange = (page:any) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
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

export default AdvertiserNotifications;
