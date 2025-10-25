import { TableColumn } from "react-data-table-component";
import { TTutor } from "..";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  handleClick: (id: string) => void;
  total: number;
  handleClickView: (row: TTutor) => void;
}

export const useTutorColumns = ({
  handleClick,
  handleClickView,
  total,
}: Props): TableColumn<TTutor>[] => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Name",
      width: "23%",
      selector: (row) => `${row?.firstName} ${row?.lastName}`,
    },
    {
      name: "Email",
      width: "23%",
      selector: (row) => row?.emailAddress,
    },
    {
      name: "Phone Number",
      selector: (row) => row?.phoneNumber,
    },

    {
      name: "Status",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-[500] rounded-md px-3 py-[2px]",
            row.accountStatus === "Active" &&
              "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]",
            row.accountStatus === "Inactive" &&
              "bg-[#CDCDCD] border-[#CDCDCD] text-white"
          )}
        >
          {row.accountStatus}
        </div>
      ),
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
                    onClick={() => handleClickView(row)}
                    className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                  >
                    View Profile
                  </div>
                  <div
                    onClick={() => handleClick(row.id)}
                    className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                  >
                    Add To Class
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
