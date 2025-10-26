"use client"

// import LogoutButton from "@/components/button/logout"
import { StaticImage } from "@/components/image"
import SidebarLink from "@/components/sidebar/links"
import { AdminLinks } from "@/lib/content/admin/links"
// import { useEffect, useState } from "react"
import { IoClose,  } from "react-icons/io5" // Import IoChevronDown
// import { useSearchParams, usePathname } from 'next/navigation';
// import { useRouter } from 'next/navigation';

interface TSidebarProps {
  active?: string
  onCloseMobile?: () => void
}

const Sidebar = ({ active = "Dashboard", onCloseMobile }: TSidebarProps) => {





  // const router = useRouter();




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
 
    <div className="w-full h-full bg-[#FFFFFF] px-2 py-8  flex flex-col justify-between relative overflow-y-auto">
      {/* Close icon on mobile */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button onClick={onCloseMobile}>
          <IoClose size={24} color="#fff" />
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <div className="w-full flex items-start justify-between pl-4">
          <StaticImage src="png/beyond.png" alt="Candle" width={200} height={53} />
        </div>

        <div className="flex flex-col gap-10 max-h-[70dvh] overflow-y-auto scrollbar-none">
          <div className="w-full flex flex-col gap-1 px-5">
            {/* {AdminLinks.map((link, index) => (
                  <SidebarLink
                    key={index}
                    icon={link.icon}
                    text={link.text}
                    path={link.path}
                    isActive={active === link.text}
                  />
                ))} */}

            {AdminLinks.map((link, index) => (
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


        </div>
      </div>
    </div>
  )
}

export default Sidebar