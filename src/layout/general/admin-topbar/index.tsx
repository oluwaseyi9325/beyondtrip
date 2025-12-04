"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoBellFill } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle, } from "react-icons/fa";
import {  MdNotifications, MdPlaylistAddCheckCircle } from "react-icons/md";
import InvoiceIcon from "~/assets/icons/invoice";
import LogOutIcon from "~/assets/icons/logout";
import ProfileIcon from "~/assets/icons/profile";
import NotificationIcon from "~/assets/icons/notification";

interface Props {
  onToggleSidebar?: () => void;
  userName?: string;
  title?:string;
  userRole?: string;
  onLogout?: () => void;
}

const AdminTopbar = ({ 
  onToggleSidebar, 
  userName = "Super Admin",
  userRole = "Admin",
  title,
  onLogout 
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
    // Add your logout logic here
    // logoutUser();
  };

  const menuItems = [
    {
      icon: <ProfileIcon />,
      label: "Account Settings",
      onClick: () => {
        setIsDropdownOpen(false);
        router.push("/admin/settings");
      },
    },
    {
      icon: <InvoiceIcon />,
      label: "Manage Payout",
      onClick: () => {
        setIsDropdownOpen(false);
        router.push("/admin/settings");
      },
    },
    {
      icon: <NotificationIcon />,
      label: "Notifications",
      onClick: () => {
        setIsDropdownOpen(false);
        router.push("/admin/notifications");
      },
    },
  ];

  // Get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full px-4 md:px-7 py-4 bg-white mb-4 flex items-center justify-between gap-2 border-b border-gray-100">
      {/* Left side: hamburger + title */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button 
          className="md:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <IoMenu size={24} />
        </button>
        <div>
          <h3 className="font-bold text-xl md:text-[28px] text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Right side: view ratings, bell and profile */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* View Ratings Link - hidden on mobile */}
        <h3 
          className="hidden md:flex items-center text-[#27458F]  font-medium text-sm"
        >
         Super Admin
        </h3>

        {/* Notification Bell */}
        <button 
          className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          onClick={() => router.push("/admin/notifications")}
          aria-label="Notifications"
        >
          <GoBellFill size={20} className="text-[#27458F]" />
          {/* Notification Badge - optional */}
          {/* <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span> */}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-[#27458F] flex items-center justify-center text-white font-semibold hover:bg-[#234080] transition-colors"
            aria-label="User menu"
          >
            {getInitials(userName)}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white font-semibold text-lg">
                  {getInitials(userName)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{userName}</p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-[#2C4C9C]">{item.icon}</span>
                    <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-[#2C4C9C]">
                    <LogOutIcon />
                  </span>
                  <span className="text-sm text-gray-700 font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;