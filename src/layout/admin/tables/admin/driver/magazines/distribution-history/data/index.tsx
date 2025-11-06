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
  { name: "JOHN DOE M.", Edtion: "DRV-101", status: "Active", location: "Ikeja-Lagos", earnings: "₦50,000.00", scans: 300, points: 800 },
 
];

// Columns definition (as done previously with column configs)

export const driverColumns: TableColumn<DriverRow>[] = [
  {
    name: "Hub/Location Name",
    selector: (row) => row.name,
  },
  {
    name: "Edition",
    selector: (row) => row.idNo,
  },
  
  {
    name: "Release Date",
    selector: (row) => row.location,
  },
  {
    name: "Quantity",
    selector: (row) => row.earnings,
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
