import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ children, className }: Props) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={clsx("p-3 lg:p-6", className)}
    >
      {children}
    </motion.main>
  );
};

export default Container;
