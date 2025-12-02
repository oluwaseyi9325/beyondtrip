
import { TableColumn } from "react-data-table-component";
import { IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
// import { useState } from "react";
import { TAmbassador } from "..";
import { formatDate } from "date-fns/format";

interface Props {
  handleClick?: (id: string) => void;
  total?: number;
  handleClickView?: any;
}

export const useEarningColumns = ({
  handleClickView,
  // total,
}: Props): TableColumn<TAmbassador>[] => {
  // const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Date",
      width: "25%",
      selector: (row) => (row?.createdAt)&& formatDate(row?.createdAt, "dd MMM, yyyy"),
    },
    {
      name: "Amount",
      width: "20%",
      selector: (row) => row.amount,
    },
    {
      name: "Description",
       width: "30%",
      selector: (row) => row.description,
    },
    {
      name: "Status",
        width: "19%",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-medium rounded-full px-3 py-[2px] capitalize ",
            row.status === "active" &&
              "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]",
            row.status === "Pending" &&
              "bg-[#FFF5E5] border-[#FFF5E5] text-[#FFA500]",
            row.status === "Rejected" &&
              "bg-[#FFE5E5] border-[#FFE5E5] text-[#FF0000]",
            row.status === "Not Paid" &&
              "bg-[#FECACA] border-[#FECACA] text-[#991B1B]"
          )}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: "",
      width: "5%",
      cell: (row,) => (
        <div className="cursor-pointer" onClick={() => handleClickView(row)}>
          <IoIosArrowForward size={22} />
        </div>
      ),
    },
  ];
};

