
import { TableColumn } from "react-data-table-component";
import { IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
// import { useState } from "react";
import { TAmbassador } from "..";

interface Props {
  handleClick: (id: string) => void;
  total: number;
  handleClickView: (row: TAmbassador) => void;
}

export const useCampaignColumns = ({
  handleClickView,
  // total,
}: Props): TableColumn<TAmbassador>[] => {
  // const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Campaign Date",
      width: "20%",
      selector: (row) => row.name,
    },

    {
      name: "Status",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-medium text-center max-w-26 w-full rounded-full px-3 py-0.5",
            row.status === "Active" &&
            " border-[#008000] text-[#008000]",
            row.status === "Pending" &&
            " border-[#FF0033] text-[#FF0033]",
            row.status === "Completed" &&
            " border-[#27458F] text-[#27458F]",
            row.status === "Planned" &&
            " border-[#FECACA] text-[#991B1B]"
          )}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: "Date Created",
      width: "20%",
      selector: (row) => row.date,
    },
    {
      name: "Budget",
      width: "15%",
      selector: (row) => row.amount,
    },
    {
      name: "Duration",
      width: "20%",
      selector: (row) => row.duration,
    },
    {
      name: "",
      width: "5%",
      cell: (row,) => (
        <div className="cursor-pointer " onClick={() => handleClickView(row)}>
          <IoIosArrowForward size={22} />
        </div>
      ),
    },
  ];
};

