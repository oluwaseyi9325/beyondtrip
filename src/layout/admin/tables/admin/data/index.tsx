import { TableColumn } from "react-data-table-component";

export interface DriverRow {
  name: string;
  idNo: string;
  status: "Active" | "Inactive";
  location: string;
  earnings: string; // formatted currency string per mock
  scans: number;
  points: number;
}

export const driverMockData: DriverRow[] = [
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Inactive", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Inactive", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
  { name: "JOHN DOE M.", idNo: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
];

// Columns definition (as done previously with column configs)

export const driverColumns: TableColumn<DriverRow>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "ID No",
    selector: (row) => row.idNo,
  },
  {
    name: "Status",
    cell: (row) => (
      <span
        className={
          row.status === "Active"
            ? "inline-flex items-center justify-center rounded-full w-[8rem] border border-[#008000] text-[#008000] bg-white text-xs px-2 py-1"
            : "inline-flex w-[7rem] items-center justify-center rounded-full border border-[#FF0033] bg-white text-[#FF0033]  text-xs px-2 py-1"
        }
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Location",
    selector: (row) => row.location,
  },
  {
    name: "Earnings",
    selector: (row) => row.earnings,
  },
  {
    name: "Scans",
    selector: (row) => String(row.scans),
  },
  {
    name: "Points",
    selector: (row) => String(row.points),
  },
  {
    name: "Action",
    cell: () => (
      <button
        className="whitespace-nowrap inline-flex items-center justify-center border border-[#336AEA] text-[#336AEA] bg-white rounded-full px-6 py-1.5 text-sm font-medium hover:bg-[#2C4C9C]/5 active:bg-[#2C4C9C]/10 focus:outline-none"
      >
        View
      </button>
    ),
  },
];



