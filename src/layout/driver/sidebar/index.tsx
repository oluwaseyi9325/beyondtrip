import { StaticImage } from "@/components/image";
import SidebarLink from "@/components/sidebar/links";
import { DriverLinks } from "@/lib/content/tutor/links";
import { IoClose } from "react-icons/io5";

interface TSidebarProps {
  active?: string;
  onCloseMobile?: () => void;
}

const Sidebar = ({ active = "Dashboard", onCloseMobile }: TSidebarProps) => {
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
          {DriverLinks.map((link, index) => (
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
  );
};

export default Sidebar;
