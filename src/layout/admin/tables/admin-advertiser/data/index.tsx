import { TableColumn } from "react-data-table-component";


export interface AdvertisersOverviewRow {
  name: string;
  idNo: string;
  status: "Active" | "Inactive";
  campaigns: number;
  budget: string; // formatted currency string per mock
  lastActivity: string;
}


// Columns definition (as done previously with column configs)

export const advertisersOverviewColumns: TableColumn<AdvertisersOverviewRow>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    grow: 2,
  },
  {
    name: "ID No",
    selector: (row) => row.idNo,
    minWidth: "110px",
  },
  {
    name: "Status",
    cell: (row) => (
      <span
        className={
          row.status === "Active"
            ? "inline-flex items-center justify-center rounded-full w-28 border border-[#008000] text-[#008000] bg-white text-xs px-2 py-1"
            : "inline-flex w-28 items-center justify-center rounded-full border border-[#FF0033] bg-white text-[#FF0033] text-xs px-2 py-1"
        }
      >
        {row.status}
      </span>
    ),
    center: true,
    grow: 0,
    minWidth: "120px",
  },
  {
    name: "Campaigns",
    selector: (row) => String(row.campaigns),
    center: true,
    minWidth: "100px",
  },
  {
    name: "Budget",
    selector: (row) => row.budget,
    minWidth: "130px",
  },
  {
    name: "Last Activity",
    selector: (row) => row.lastActivity,
    minWidth: "130px",
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
    right: true,
    grow: 0,
    minWidth: "120px",
  },
];


export const advertisersOverviewMockData: AdvertisersOverviewRow[] = Array.from({ length: 20 }).map((_, i) => ({
  name: "ABC Digital Ltd",
  idNo: i % 7 === 0 ? "ADV-AE01" : "DRV-101",
  status: i % 5 === 1 ? "Inactive" : "Active",
  campaigns: 6,
  budget: "₦50,000.00",
  lastActivity: "2025-08-08",
}));
