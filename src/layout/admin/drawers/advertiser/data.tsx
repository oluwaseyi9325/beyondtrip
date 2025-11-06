import React from "react";
import { TableColumn } from "react-data-table-component";

export type HistoryRow = {
  id: string;
  name: string;
  created: string;
  duration: string;
  status: "Active" | "Paused" | "Completed";
  statusColor: "green" | "red" | "blue";
  budget: string;
};



export const pillClass = (color: "green" | "red" | "blue") =>
  color === "green"
    ? "inline-flex items-center justify-center w-24 rounded-full  border border-green-500 text-green-600 bg-white text-xs px-2 py-1"
    : color === "red"
    ? "inline-flex items-center justify-center w-24 rounded-full  border border-red-500 text-red-500 bg-white text-xs px-2 py-1"
    : "inline-flex items-center justify-center w-24 rounded-full  border border-[#336AEA] text-[#336AEA] bg-white text-xs px-2 py-1";

export const columns: TableColumn<HistoryRow>[] = [
  { name: "Name", selector: (r) => r.name },
  { name: "Created", selector: (r) => r.created },
  { name: "Duration", selector: (r) => r.duration },
  {
    name: "Status",
    cell: (r) => <span className={pillClass(r.statusColor)}>{r.status}</span>,
    center: true,
  },
  { name: "Budget", selector: (r) => r.budget },
];

export const mockHistory: HistoryRow[] = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: "New Ride Xtra Promo",
  created: "2025-08-05",
  duration: "Jun 5 – Aug 31",
  status: i % 5 === 3 ? "Paused" : i % 5 === 4 ? "Completed" : "Active",
  statusColor: i % 5 === 3 ? "red" : i % 5 === 4 ? "blue" : "green",
  budget: "₦50,000.00",
}));


export interface InvoiceRow {
  campaign: string;
  invoiceNo: string;
  issuedDate: string;
  status: "Paid" | "Pending";
  amount: string;
}

export const invoiceMockData: InvoiceRow[] = [
  { campaign: "New Ride Xtra Promo", invoiceNo: "INV-2025-003", issuedDate: "2025-08-05", status: "Paid", amount: "₦50,000.00" },
  { campaign: "New Ride Xtra Promo", invoiceNo: "INV-2025-003", issuedDate: "2025-08-05", status: "Paid", amount: "₦50,000.00" },
  { campaign: "New Ride Xtra Promo", invoiceNo: "INV-2025-003", issuedDate: "2025-08-05", status: "Paid", amount: "₦50,000.00" },
  { campaign: "New Ride Xtra Promo", invoiceNo: "INV-2025-003", issuedDate: "2025-08-05", status: "Paid", amount: "₦50,000.00" },
  { campaign: "New Ride Xtra Promo", invoiceNo: "INV-2025-003", issuedDate: "2025-08-05", status: "Paid", amount: "₦50,000.00" },
  { campaign: "New Ride Xtra Promo", invoiceNo: "INV-2025-003", issuedDate: "2025-08-05", status: "Pending", amount: "₦50,000.00" },
  { campaign: "New Ride Xtra Promo", invoiceNo: "INV-2025-003", issuedDate: "2025-08-05", status: "Pending", amount: "₦50,000.00" },
];

export const invoiceColumns: TableColumn<InvoiceRow>[] = [
  {
    name: "Campaign",
    selector: (row) => row.campaign,
  },
  {
    name: "Invoice No",
    selector: (row) => row.invoiceNo,
  },
  {
    name: "Issued Date",
    selector: (row) => row.issuedDate,
  },
  {
    name: "Status",
    cell: (row) => (
      <span
        className={
          row.status === "Paid"
            ? "inline-flex items-center justify-center rounded-full w-[7rem] border border-[#008000] text-[#008000] bg-white text-sm px-4 py-2"
            : "inline-flex items-center justify-center rounded-full w-[7rem] border border-[#FFA500] text-[#FFA500] bg-white text-sm px-4 py-2"
        }
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
  },
];

