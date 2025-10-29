import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { TApplications } from "..";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  const formatter = Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
}

export const useApplicationsColumns = ({
  onAdmit,
  totalItems,
  loading,
  handleClickView,
}: {
  onAdmit: (id: string) => void;
  totalItems: number;
  loading: boolean;
  handleClickView: (advertiser: TApplications) => void;
}): TableColumn<TApplications>[] => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Name",
      selector: (row) => `${row?.firstName} ${row?.lastName}`,
    },
    {
      name: "Email",
      width: "18%",
      selector: (row) => row?.emailAddress,
    },
    {
      name: "Country",
      width: "10%",
      selector: (row) => row?.country,
    },
    {
      name: "Course",
      width: "18%",
      selector: (row) => row?.course?.courseName,
    },
    {
      name: "Payment Status",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-[500] rounded-md px-3 py-[2px]",
            row.paymentStatus === "Paid" &&
            "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]",
            row.paymentStatus === "Not Paid" &&
            "bg-red-400 border-red-400 text-white"
          )}
        >
          {row.paymentStatus}
        </div>
      ),
    },
    {
      name: "Registered Date",
      selector: (row) => formatDate(row?.addedDate),
    },
    {
      name: "",
      width: "7%",
      cell: (row, index) => {
        const isLast = index >= totalItems - 1;
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
                    "absolute w-[130px] bg-white text-black text-sm rounded-md shadow-lg z-10 -left-20 ",
                    isLast ? "bottom-full mb-2" : "top-full mt-2"
                  )}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickView(row);
                      setDropdownIndex(null);
                    }}
                    className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                  >
                    View details
                  </div>
                  {
                    row.paymentStatus == "Paid" ? <div
                      onClick={() => onAdmit(row.id)}
                      className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                    >
                      {loading ? "Admitting..." : "Admit"}
                    </div> : null
                  }

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      },
    },
  ];
};

export const paymentColumns: TableColumn<TApplications>[] = [
  {
    name: "Name",
    selector: (row) => `${row?.firstName} ${row?.lastName}`,
  },
  {
    name: "Email",
    width: "25%",
    selector: (row) => row?.emailAddress,
  },
  {
    name: "Course",
    width: "25%",
    selector: (row) => row?.course?.courseName,
  },
  {
    name: "Payment Status",
    cell: (row) => (
      <div
        className={clsx(
          "border text-sm font-[500] rounded-md px-3 py-[2px]",
          row.paymentStatus === "Paid" &&
          "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]",
          row.paymentStatus === "Not Paid" &&
          "bg-red-400 border-red-400 text-white"
        )}
      >
        {row.paymentStatus}
      </div>
    ),
  },
  {
    name: "Registered Date",
    selector: (row) => formatDate(row?.addedDate),
  },
];