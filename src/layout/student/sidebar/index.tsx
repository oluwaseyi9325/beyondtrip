import LogoutButton from "@/components/button/logout";
import { StaticImage } from "@/components/image";
import SidebarLink from "@/components/sidebar/links";
import {
  StudentLinks,
  StudentSettingsLinks,
} from "@/lib/content/student/links";
import { IoClose } from "react-icons/io5";
interface TSidebarProps {
  active?: string;
  onCloseMobile?: () => void;
}

const Sidebar = ({ active = "Dashboard", onCloseMobile }: TSidebarProps) => {
  return (
    <div className="w-full h-full bg-[#121363] px-2 py-8 rounded-2xl flex flex-col justify-between relative overflow-y-auto">
      {/* Close icon on mobile */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button onClick={onCloseMobile}>
          <IoClose size={24} color="#fff" />
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <div className="w-full flex items-start justify-between pl-4">
          <StaticImage src="png/candle-white.png" alt="Candle" width={92} height={43} />
        </div>

        <div className="flex flex-col gap-10 max-h-[70dvh] overflow-y-auto scrollbar-none">
          <div className="w-full flex flex-col gap-1">
            {StudentLinks.map((link, index) => (
              <SidebarLink
                key={index}
                icon={link.icon}
                text={link.text}
                path={link.path}
                isActive={active === link.text}
                hasSub={link.hasSub}
                sub={link.sub}
              />
            ))}
          </div>

          <div className="w-full flex flex-col gap-3">
            <p className="pl-4 font-[500] text-sm text-[#CDCDCD]">Settings</p>
            <div className="w-full flex flex-col gap-1">
              {StudentSettingsLinks.map((link, index) => (
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
  );
};

export default Sidebar;
