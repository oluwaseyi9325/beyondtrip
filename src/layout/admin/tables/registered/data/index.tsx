
import { TableColumn } from "react-data-table-component";
import { TRegistered } from "..";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";
interface Props {
  total: number;
  handleClickView: (row: TRegistered) => void;
  handleAddToClass: (studentId: string) => void;
}

export const useRegisteredColumns = ({
  handleClickView,
  total,
}: Props): TableColumn<TRegistered>[] => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: "Email",
      width: "20%",
      selector: (row) => row.emailAddress,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Course",
      width: "20%",
      selector: (row) => row?.classes?.[0]?.course?.courseName|| "--",
    },
    {
      name: "Cohort",
      selector: (row) => row?.cohorts?.[0]?.note|| "--",
    },
    {
      name: "Status",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-[500] rounded-md px-3 py-[2px]",
            row.accountStatus === "Active" &&
              "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]",
            row.accountStatus !== "Active" &&
              "bg-[#CDCDCD] border-[#CDCDCD] text-white"
          )}
        >
          {row.accountStatus|| "Inactive"}
        </div>
      ),
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
                      "absolute w-[140px] bg-white border border-gray-200 text-black text-sm rounded-md shadow-lg z-50 -left-24",
                      isLast ? "bottom-full mb-2" : "top-full mt-2"
                    )}
                    style={{ 
                      position: 'absolute',
                      zIndex: 9999,
                      minWidth: '140px'
                    }}
                  >
                    <div className="py-1">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickView(row);
                          setDropdownIndex(null);
                        }}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        View Student
                      </div>
                     
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