import { TableColumn } from "react-data-table-component";
import { TAdmin } from "..";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";

export const adminColumns: TableColumn<TAdmin>[] = [
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
    cell: () => (
      <div className="cursor-pointer">
        <AiOutlineMore size={24} />
      </div>
    ),
  },
];
