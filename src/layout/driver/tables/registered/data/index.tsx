import { TableColumn } from "react-data-table-component";
import { TRegistered } from "..";
import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";

export const registeredColumns: TableColumn<TRegistered>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Email",
    width: "20%",
    selector: (row) => row.email,
  },
  {
    name: "Course",
    width: "20%",
    selector: (row) => row.course,
  },
  {
    name: "Cohort",
    selector: (row) => row.cohort,
  },
  {
    name: "Date Joined",
    selector: (row) => row.date,
  },
  {
    name: "Status",
    cell: (row) => (
      <div
        className={clsx(
          "border text-sm font-[500] rounded-md px-3 py-[2px]",
          row.status === "Active" &&
            "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]",
          row.status === "Inactive" &&
            "bg-[#CDCDCD] border-[#CDCDCD] text-white"
        )}
      >
        {row.status}
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

export const registeredData: TRegistered[] = [
  {
    name: "Abudu Damilola",
    email: "d.abudu@conclaseint.com",
    course: "Product Management",
    cohort: "08",
    date: "April 28, 2025",
    status: "Active",
  },
  {
    name: "Abudu Damilola",
    email: "d.abudu@conclaseint.com",
    course: "Product Management",
    cohort: "08",
    date: "April 28, 2025",
    status: "Inactive",
  },
  {
    name: "Abudu Damilola",
    email: "d.abudu@conclaseint.com",
    course: "Product Management",
    cohort: "08",
    date: "April 28, 2025",
    status: "Active",
  },
  {
    name: "Abudu Damilola",
    email: "d.abudu@conclaseint.com",
    course: "Product Management",
    cohort: "08",
    date: "April 28, 2025",
    status: "Inactive",
  },
  {
    name: "Abudu Damilola",
    email: "d.abudu@conclaseint.com",
    course: "Product Management",
    cohort: "08",
    date: "April 28, 2025",
    status: "Active",
  },
  {
    name: "Abudu Damilola",
    email: "d.abudu@conclaseint.com",
    course: "Product Management",
    cohort: "08",
    date: "April 28, 2025",
    status: "Inactive",
  },
];
