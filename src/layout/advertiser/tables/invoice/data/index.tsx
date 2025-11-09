
import { TableColumn } from "react-data-table-component";
import clsx from "clsx";
// import { useState } from "react";
import { TAmbassador } from "..";

interface Props {
  handleClick: (id: string) => void;
  total: number;
  handleClickView: (row: TAmbassador) => void;
}

export const useInvoiceColumns = ({
  // total,
}: Props): TableColumn<TAmbassador>[] => {
  // const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  return [
    {
      name: "Invoice Id",
      width: "15%",
      selector: (row) => row.id,
    },

    {
      name: "Campaign",
      width: "20%",
      selector: (row) => row.campaign,
    },
       {
      name: "Amount",
      width: "15%",
      selector: (row) => row.amount,
    },
  {
      name: "Date Issued",
      width: "20%",
      selector: (row) => row.date,
    },
    {
      name: "Status",
      width: "13%",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-medium rounded-full px-5 py-[5px]",
            row.status === "Paid" &&
            "  border-[#008000] bg-white text-[#008000]",
            row.status === "Unpaid" && "bg-white border-[#F29339] text-[#F29339]"
          )}
        >
          {row.status}
        </div>
      ),
    },
     {
      name: "Action",
      width: "15%",
      cell: (row) => (
        <div
          className={clsx(
            "border text-sm font-medium rounded-full px-5 py-[5px] cursor-pointer",
            row.isPay === true &&
            "  border-[#336AEA] bg-white text-[#336AEA]",
            row.isPay === false && "bg-white border-[#FF0033] text-[#FF0033]"
          )}
        >
          {row.isPay? "Download": "Pay Now"}
        </div>
      ),
    },
    
   
   
  ];
};

