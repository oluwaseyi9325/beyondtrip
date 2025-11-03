import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PiCaretDown } from "react-icons/pi";
import ClickAwayListener from "react-click-away-listener";

interface TSidebarLink {
  icon: any;
  path: string;
  text: string;
  isActive: boolean;
  hasSub?: boolean;
  sub?: any[];
  activePath?: string;
}

const SidebarLink = ({
  icon,
  path,
  text,
  isActive,
  hasSub = false,
  sub = [],
  activePath,
}: TSidebarLink) => {
  const [open, setOpen] = useState(false);

  const hasActiveSubItem = sub.some(subItem => activePath === subItem.path);

  useEffect(() => {
    if (hasActiveSubItem || isActive) {
      setOpen(true);
    }
  }, [hasActiveSubItem, isActive]);

  if (hasSub) {
    return (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className={clsx("w-full relative")}>
          {/* Parent Button */}
          <div
            className={clsx(
              "w-full flex items-center justify-between cursor-pointer rounded-lg transition-all",
              (isActive || hasActiveSubItem) 
                ? "bg-[#336AEA] text-white font-medium" 
                : "text-[#27458F] hover:bg-gray-50"
            )}
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-center px-4 py-3 gap-3">
              {icon} <p className="text-sm leading-[145%]">{text}</p>
            </div>
            <div className="pr-4">
              <PiCaretDown
                size={16}
                className={clsx(
                  "transition-all ease-in-out duration-300",
                  open ? "rotate-180" : "rotate-0",
                  (isActive || hasActiveSubItem) ? "text-white" : "text-[#8E8E8E]"
                )}
              />
            </div>
          </div>

          {/* Submenu Items */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  type: "spring",
                }}
                className="pt-2 flex flex-col gap-1 pl-4"
              >
                {sub.map((item, index) => {
                  const isSubItemActive = activePath === item.path;
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      className={clsx(
                        "pl-8 pr-4 py-2.5 text-sm flex items-center rounded-md transition-all",
                        isSubItemActive
                          ? "bg-[white] text-[#336AEA]  font-bold"
                          : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#336AEA]"
                      )}
                    >
                      {/* Optional: Add a bullet or dash indicator */}
                      <span className={clsx(
                        "mr-2 text-xs",
                        isSubItemActive ? "text-[#336AEA]" : "text-[#9CA3AF]"
                      )}>
                        •
                      </span>
                      {item.text}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ClickAwayListener>
    );
  }

  return (
    <Link
      href={path}
      className={clsx(
        "flex items-center px-4 py-3 gap-3 rounded-lg transition-all",
        isActive
          ? "bg-[#336AEA] text-white font-medium"
          : "text-[#8E8E8E] hover:bg-gray-50"
      )}
    >
      {icon}
      <p className="text-sm leading-[145%]">{text}</p>
    </Link>
  );
};

export default SidebarLink;