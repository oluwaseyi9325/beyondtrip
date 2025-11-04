import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";

interface TDrawer {
  open: boolean;
  handleClose: () => void;
  className?: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}

const Drawer = ({ 
  open, 
  handleClose, 
  children, 
  className,
  side = "right" 
}: TDrawer) => {
  
  // Animation variants based on side
  const slideVariants = {
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" }
    },
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" }
    },
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" }
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" }
    }
  };

  // Position classes based on side
  const positionClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full"
  };

  // Close button position based on side
  const closeButtonClasses = {
    left: "right-4 top-4",
    right: "left-4 top-4",
    top: "right-4 bottom-4",
    bottom: "right-4 top-4"
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-screen fixed bg-black/50 z-50 top-0 left-0"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            initial={slideVariants[side].initial}
            animate={slideVariants[side].animate}
            exit={slideVariants[side].exit}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`bg-white fixed z-50 ${positionClasses[side]} ${className}`}
          >
            {/* <div
              className={`absolute cursor-pointer ${closeButtonClasses[side]}`}
              onClick={handleClose}
            >
              <LuX size={24} color="#5E5E5E" />
            </div> */}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;