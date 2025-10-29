import { TableColumn } from "react-data-table-component";
import { TClass } from "..";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/navigation";

interface Props {
  handleClick: (id: string) => void;
  // handleUpload: (id: string) => void;
  total: number;
}

export const useClassColumns = ({
  handleClick,
  // handleUpload,
  total,
}: Props): TableColumn<TClass>[] => {
  const navigate = useRouter();
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Name",
      selector: (row) => `${row?.driverName}`,
    },
    {
      name: "Course Name",
      selector: (row) => row?.courseName,
    },
    {
      name: "Cohort Name",
      selector: (row) => row?.cohortName,
    },
    {
      name: "",
      width: "7%",
      cell: (row, index) => {
        const isLast = total > 7 && index >= total - 1;
        const isOpen = dropdownIndex === index;

        return (
          <ClickAwayListener onClickAway={() => setDropdownIndex(null)}>
            <div className="relative" style={{ position: 'relative' }}>
              <div
                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownIndex((prev) => (prev === index ? null : index));
                }}
              >
                <AiOutlineMore size={24} />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key={`dropdown-${index}`}
                    initial={{ opacity: 0, scale: 0.95, y: isLast ? 10 : -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: isLast ? 10 : -10 }}
                    transition={{ duration: 0.15 }}
                    className={clsx(
                      "absolute w-[180px] bg-white border border-gray-200 text-black text-sm rounded-md shadow-lg z-50 -left-32",
                      isLast ? "bottom-full mb-2" : "top-full mt-2"
                    )}
                    style={{
                      position: 'absolute',
                      zIndex: 9999,
                      minWidth: '180px'
                    }}
                  >
                    <div className="py-1">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate.push(`/driver/class/${row.courseCohortId}`);
                          handleClick(row.courseCohortId);
                          setDropdownIndex(null);
                        }}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        View Details
                      </div>
                      {/* <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate.push(`/driver/assignments/${row.courseCohortId}`);
                          setDropdownIndex(null);
                        }}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        Assignments
                      </div> */}
                      {/* <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate.push(`/driver/class/schedule/${row.courseCohortId}`);
                          setDropdownIndex(null);
                        }}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        Class Schedules
                      </div> */}
                      {/* <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate.push(`/driver/advertisers/${row.courseCohortId}`);
                          setDropdownIndex(null);
                        }}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        advertisers
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate.push(`/driver/materials/${row.courseCohortId}`);
                          setDropdownIndex(null);
                        }}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        Materials
                      </div> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ClickAwayListener>
        );
      },
    },
  ];
};