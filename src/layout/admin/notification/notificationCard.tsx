import React, { useState } from "react";
import { MdEmail, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";



function NotificationCard({ notification, onView, onDismiss }:any) {
  return (
    <div className="bg-white flex-wrap gap-4 border border-gray-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
        {/* Left Section - Icon and Content */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-[#27458F] rounded-full flex items-center justify-center shrink-0">
            <MdEmail className="w-6 h-6 text-white" />
          </div>
  
          {/* Text Content */}
          <div>
            <h3 className="text-gray-900 font-medium text-base mb-1">
              {notification.title}
            </h3>
            <p className="text-gray-600 text-sm">{notification.date}</p>
            <p className="text-gray-600 text-sm">{notification.time}</p>
          </div>
        </div>
  
        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onView(notification)}
            className="bg-[#336AEA] hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-medium transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onDismiss(notification.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>
      </div>
  )
}

export default NotificationCard
