import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";

interface TModal {
  open: boolean;
  handleClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal = ({ open, handleClose, children, className }: TModal) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-screen fixed bg-black/50 flex items-center justify-center z-50 top-0 left-0"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`bg-white relative rounded-md ${className}`}
          >
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={handleClose}
            >
              <LuX size={24} color="#5E5E5E" />
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
