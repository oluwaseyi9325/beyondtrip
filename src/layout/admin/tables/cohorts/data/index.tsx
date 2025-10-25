import { TableColumn } from "react-data-table-component";
import { TCohort } from "..";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { transformDateString } from "../../../../../helpers/convert-data";

interface Props {
  handleClick: (cohort: TCohort) => void; // Changed from (id: string)
  total: number;
}

export const useCohortColumns = ({
  handleClick,
  total,
}: Props): TableColumn<TCohort>[] => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "S/N",
      width: "5%",
      cell: (_, index: number) => index + 1,
    },
    {
      name: "Cohort Name",
      selector: (row) => row.note ?? "-",
    },
    {
      name: "Start Date",
      selector: (row) => transformDateString(row.startDate),
    },
    {
      name: "End Date",
      selector: (row) => transformDateString(row.endDate),
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
                    Edit Cohort
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      },
    },
  ];
};