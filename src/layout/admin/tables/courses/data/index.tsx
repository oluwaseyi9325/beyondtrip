import { TableColumn } from "react-data-table-component";
import { TCourse } from "..";
import { AiOutlineMore } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
interface Props {
  handleClick:(course: TCourse) => void; // Changed from (id: string)
  total: number;
  
}
export const useCourseColumns = ({ handleClick, total }: Props): TableColumn<TCourse>[] => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
   return  [
    {
      name: "S/N",
      width: "5%",
      cell: (_, index: number) => index + 1,
    },
    {
      name: "Course Name",
      selector: (row) => row.courseName ?? "-",
    },
    {
      name: "Tutor",
      width: "25%",
      selector: (row) => row.tutors?.map((val) => `${val.firstName||""} ${val.lastName||""}`).join(", ") ?? "-",
      // selector: (row) => {row.tutors?.map((val,i)=><div>{val.firstName} { val.lastName}</div>)},
      // selector: (row) => row.tutors?.[0]?.firstName ?? "-",
    },
    {
      name: "Application Fee",
      width: "18%",
      selector: (row) =>
        `₦${Number(
          row.applicationFees?.filter((item) => item?.currencyCode === "NGN")?.[0]
            ?.amount ?? 0
        ).toLocaleString()}`,
    },
    {
      name: "Tuition Fee",
      width: "18%",
      selector: (row) =>
        `₦${Number(
          row.tuitionFees?.filter((item) => item?.currencyCode === "NGN")?.[0]
            ?.amount ?? 0
        ).toLocaleString()}`,
    },
    {
      name: "",
      width: "7%",
      cell: (row, index) => {
        const isLast = index >= total - 1;
        const isOpen = dropdownIndex === index;
  
        return (
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => {
                setDropdownIndex((prev) => (prev === index ? null : index));
              }}
            >
              <AiOutlineMore size={24} />
            </div>
  
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: isLast ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: isLast ? 10 : -10 }}
                  transition={{ duration: 0.2 }}
                  className={clsx(
                    "absolute w-[120px] bg-white text-black text-sm rounded-md shadow z-10 -left-20",
                    isLast ? "bottom-full mb-2" : "top-full mt-2"
                  )}
                >
                  <div
                    onClick={() => {
                      handleClick(row); // Pass the full row
                      setDropdownIndex(null); // Close dropdown
                    }}
                    className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                  >
                    Edit Course
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      },
    },
  ];
  
}
  
 