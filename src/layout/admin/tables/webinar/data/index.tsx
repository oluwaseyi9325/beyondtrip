
import { TableColumn } from "react-data-table-component";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";
import { TRegistered } from "..";
import { useRouter } from "next/navigation";
interface Props {
  total: number;
  handleClickView: (row: TRegistered) => void;
  handleAddToClass: (studentId: string) => void;
}

export const useRegisteredColumns = ({
  total,
}: Props): TableColumn<TRegistered>[] => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const navigation= useRouter()
  return [
    {
      name: "S/N",
      width: "5%",
      cell: (_, index: number) => `0${index + 1}`,

    },
    
    {
      name: "Name",
      width: "20%",
      selector: (row) => ` ${row.name}`,
    },
    {
      name: "Description",
      width: "20%",
      // selector: (row) => `${row.firstName} ${row.lastName}`,
      cell: (row) => {
        return (
          <>
            <div className="">
              <span>{row.description}</span>
            </div>
          </>
        );
      },
    },
    {
      name: "Date",
      width: "16%",
      selector: (row) => ` ${row.startDate} -- ${row.endDate}`,
    },
    {
      name: "Time",
      selector: (row) => ` ${row.startTime} -- ${row.endTime}`,
    },

    {
      name: "Host Name",
      // width: "40%",
      // selector: (row) => `${row.firstName} ${row.lastName}`,
      cell: (row) => {
        return (
          <>
            <div className="">
              {
                row.hostNames.map((host, index) => (
                  <div key={index} className="">
                    <span>{host}</span>
                  </div>
                ))
               }
            </div>
          </>
        );
      },
    },
    {
      name: "Guest Name",
      // width: "40%",
      // selector: (row) => `${row.firstName} ${row.lastName}`,
      cell: (row) => {
        return (
          <>
            <div className="">
              {
                row.guestNames.map((host, index) => (
                  <div key={index} className="">
                    <span>{host}</span>
                  </div>
                ))
               }
            </div>
          </>
        );
      },
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
                      "absolute w-[165px] bg-white border border-gray-200 text-black text-sm rounded-md shadow-lg z-50 -left-24",
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
                        onClick={()=> navigation.push(`/admin/us-webinars/${row?.id}?mode=us`)}
                        className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        View Registrations
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