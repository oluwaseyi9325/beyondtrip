import { TableColumn } from "react-data-table-component";

export interface InvoiceRow {
  invoiceNo: string;
  campaign: string;
  advertiser: string;
  issuedDate: string;
  amount: string;
  status: "Paid" | "Pending";
}

export const invoiceMockData: InvoiceRow[] = [
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Pending" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Pending" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
  { invoiceNo: "INV-2025-003", campaign: "Lagos Launch Promo", advertiser: "ABC Digital Ltd", issuedDate: "2025-08-08", amount: "₦50,000.00", status: "Paid" },
];

const getStatusStyle = (status: InvoiceRow["status"]) => {
  return status === "Paid"
    ? "inline-flex items-center justify-center rounded-full w-24 border border-[#008000] text-[#008000] bg-white text-xs px-3 py-1.5"
    : "inline-flex items-center justify-center rounded-full w-24 border border-[#FFA500] text-[#FFA500] bg-white text-xs px-3 py-1.5";
};

export const invoiceColumns: TableColumn<InvoiceRow>[] = [
  {
    name: "Invoice No",
    selector: (row) => row.invoiceNo,
    minWidth: "130px",
  },
  {
    name: "Campaign",
    selector: (row) => row.campaign,
    grow: 1.5,
    minWidth: "170px",
  },
  {
    name: "Advertiser",
    selector: (row) => row.advertiser,
    grow: 1.5,
    minWidth: "150px",
  },
  {
    name: "Issued Date",
    selector: (row) => row.issuedDate,
    minWidth: "120px",
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    minWidth: "120px",
  },
  {
    name: "Status",
    cell: (row) => (
      <span className={getStatusStyle(row.status)}>
        {row.status}
      </span>
    ),
    center: true,
    minWidth: "120px",
  },
  {
    name: "Action",
    cell: () => (
      <button
        className="whitespace-nowrap inline-flex items-center justify-center border border-[#336AEA] text-[#336AEA] bg-white rounded-full px-6 py-1.5 text-sm font-medium hover:bg-[#336AEA]/5 active:bg-[#336AEA]/10 focus:outline-none"
      >
        View
      </button>
    ),
    right: true,
    minWidth: "100px",
  },
];

