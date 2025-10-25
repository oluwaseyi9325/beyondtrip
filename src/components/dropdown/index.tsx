import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

interface TDropdown {
  className?: string;
  children: React.ReactNode[];
  position?: string;
}

const Dropdown = ({ className, children, position }: TDropdown) => {
  const [open, setOpen] = useState(false);

  const trigger = children[0];
  const menu = children[1];
  console.log('Dropdown open state:', open);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="w-fit relative">
        <div onClick={() => setOpen(!open)} className={className}>
          {trigger}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`absolute mt-2 z-50 ${position}`}
            >
              {menu}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
