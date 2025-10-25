


import { TableColumn } from "react-data-table-component";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { AiOutlineMore } from "react-icons/ai";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { TTutor } from "..";

interface Props {
  total: number;
  handleClickView: (row: TTutor) => void;
  handleAddToClass: (studentId: string) => void;
}

export const useTutorColumns = ({
  handleClickView,
  total,
}: Props): TableColumn<TTutor>[] => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Full Name",
      width: "23%",
      selector: (row) => `${row?.firstName} ${row?.lastName}`,
    },
    {
      name: "Email",
      width: "23%",
      selector: (row) => row?.emailAddress,
    },
    {
      name: "Course Apply for",
      selector: (row) => row?.courseApplyingFor || "-",
    },
    {
      name: "Phone Number",
      selector: (row) => row?.phoneNumber,
    },
    {
      name: "Address",
      selector: (row) => {
        const state = row?.stateOrRegion || "";
        const country = row?.country || "";
        if (state && country) {
          return `${state}, ${country}`;
        }
        return state || country || "-";
      },
    },
    {
      name: "Status",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-[500] rounded-md px-3 py-[2px]",
            row.applicationStatus === "Approved" &&
              "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]", // light green bg, green text
            row.applicationStatus === "Rejected" &&
              "bg-[#FECACA] border-[#FECACA] text-[#B91C1C]", // light red bg, dark red text
            row.applicationStatus === "Pending" &&
              "bg-[#FEF3C7] border-[#FEF3C7] text-[#92400E]" // light yellow bg, brown text
          )}
        >
          {row.applicationStatus|| "Null"}
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
                      {/* <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToClass(row.id);
                          setDropdownIndex(null);
                        }}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        Add To Class
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