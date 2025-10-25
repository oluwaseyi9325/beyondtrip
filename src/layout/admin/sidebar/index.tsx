"use client"

import LogoutButton from "@/components/button/logout"
import { StaticImage } from "@/components/image"
import SidebarLink from "@/components/sidebar/links"
import { AdminLinks, AdminSettingsLinks, UsAdminLinks } from "@/lib/content/admin/links"
import { useEffect, useState } from "react"
import { IoClose, IoChevronDown } from "react-icons/io5" // Import IoChevronDown
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface TSidebarProps {
  active?: string
  onCloseMobile?: () => void
}

const Sidebar = ({ active = "Dashboard", onCloseMobile }: TSidebarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) 
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const currentMode = searchParams.get("mode")
  const isUsMode = currentMode === "us"

  // Check if current route is a US-specific route
  const isUsRoute = pathname?.includes('/admin/us-') || false

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const router = useRouter();
  
  useEffect(() => {
    // Only redirect if we're on a US route AND there's no mode parameter
    if (isUsRoute && !currentMode) {
      router.replace(`${pathname}?mode=us`)
    }
  }, [currentMode, router, pathname, isUsRoute])
  
  const handleSelectMode = (isUs: boolean) => {
    setIsDropdownOpen(false)
    const newPath = isUs ? "/admin/us-students" : "/admin"
    const newModeParam = isUs ? "us" : "ng"
    router.push(`${newPath}?mode=${newModeParam}`)
  };

  const isLinkActive = (link: any) => {
    // Check if main link is active
    if (active === link.text) {
      return true;
    }
    
    // Check if any sub-item is active
    if (link.hasSub && link.sub) {
      return link.sub.some((subItem: any) => active === subItem.text);
    }
    
    return false;
  };

  return (
    <div className="w-full h-full bg-[#121363] px-2 py-8 rounded-2xl flex flex-col justify-between relative overflow-y-auto">
      {/* Close icon on mobile */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button onClick={onCloseMobile}>
          <IoClose size={24} color="#fff" />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full flex items-start justify-between pl-4">
          <StaticImage src="png/candleLogo.png" alt="Candle" width={92} height={43} />
        </div>

        {/* Dropdown for mode selection */}
        <div className="relative px-4">
          <button
            onClick={toggleDropdown}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#FFFFFF0D] rounded-lg text-white text-base font-medium focus:outline-none border border-[#FFFFFF1A]"
          >
            <div className="flex items-center gap-2">
              <StaticImage
                src={isUsMode ? "png/usa.png" : "png/ngn.svg"}
                alt={isUsMode ? "US Flag" : "Nigeria Flag"}
                width={24}
                height={24}
              />
              <span>{isUsMode ? "Academy - US" : "Academy - NG"}</span>
            </div>
            <IoChevronDown
              size={16}
              className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-[#1A1B7A] rounded-lg shadow-lg z-10 overflow-hidden">
              <button
                onClick={() => handleSelectMode(true)}
                className={`w-full flex items-center gap-2 px-4 py-3 text-left text-white ${isUsMode ? "bg-[#3A3B9A]" : "hover:bg-[#2A2B8A]"}`}
              >
                <StaticImage src="png/usa.png" alt="US Flag" width={24} height={24} />
                <span>Academy - US</span>
              </button>
              <button
                onClick={() => handleSelectMode(false)}
                className={`w-full flex items-center gap-2 px-4 py-3 text-left text-white ${!isUsMode ? "bg-[#3A3B9A]" : "hover:bg-[#2A2B8A]"}`}
              >
                <StaticImage src="png/ngn.svg" alt="Nigeria Flag" width={24} height={24} />
                <span>Academy - NG</span>
              </button>
            </div>
          )}

        </div>

        <div className="flex flex-col gap-10 max-h-[70dvh] overflow-y-auto scrollbar-none">
          <div className="w-full flex flex-col gap-1">
            {(isUsMode ? UsAdminLinks : AdminLinks).map((link, index) => (
              <SidebarLink
                key={index}
                icon={link.icon}
                text={link.text}
                path={link.path}
                // isActive={active === link.text}
                isActive={isLinkActive(link)}
                hasSub={link.hasSub}
                sub={link.sub}
                activeSubItem={active}
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="pl-4 font-[500] text-sm text-[#CDCDCD]">Settings</p>
            <div className="w-full flex flex-col gap-1">
              {AdminSettingsLinks.map((link, index) => (
                <SidebarLink
                  key={index}
                  icon={link.icon}
                  text={link.text}
                  path={link.path}
                  isActive={active === link.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}

export default Sidebar