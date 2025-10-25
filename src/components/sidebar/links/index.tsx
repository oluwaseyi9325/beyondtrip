
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
  activeSubItem?: string;
}

const SidebarLink = ({
  icon,
  path,
  text,
  isActive,
  hasSub = false,
  sub = [],
  activeSubItem,
}: TSidebarLink) => {
  const [open, setOpen] = useState(false);

  // Check if any sub-item is active
  const hasActiveSubItem = sub.some(subItem => activeSubItem === subItem.text);

  // Keep submenu open if there's an active sub-item
  useEffect(() => {
    if (hasActiveSubItem || isActive) {
      setOpen(true);
    }
  }, [hasActiveSubItem, isActive]);

  if (hasSub) {
    return (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className={clsx("w-full pr-4 relative text-[#8E8E8E]")}>
          <div
            className={clsx(
              "w-full flex items-center justify-between cursor-pointer",
              (isActive || hasActiveSubItem) && "bg-[#336AEA] border border-[#336AEA] text-white font-medium"
            )}
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-center px-4 py-3 gap-3">
              {icon} <p className="text-sm leading-[145%]">{text}</p>
            </div>
            <PiCaretDown
              size={16}
              className={clsx(
                "transition-all ease-in-out duration-300",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  type: "spring",
                }}
                className="pt-2 flex flex-col py-1 gap-2"
              >
                {sub.map((item, index) => {
                  const isSubItemActive = activeSubItem === item.text;
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      className={clsx(
                        "pl-8 text-sm h-10 flex items-center",
                        isSubItemActive
                          ? "bg-[#336AEA] border border-[#336AEA] text-white font-medium"
                          : "text-[#8E8E8E] hover:text-white"
                      )}
                    >
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
        "flex items-center px-4 py-4 gap-3",
        isActive
          ? "bg-[#336AEA] border border-[#336AEA] text-white font-medium rounded-lg"
          : "text-[#27458F]"
      )}
    >
      {icon}
      <p className="text-sm leading-[145%]">{text}</p>
    </Link>
  );
};

export default SidebarLink;