import { TableColumn } from "react-data-table-component";

export interface CampaignRow {
  campaign: string;
  campaignId: string;
  advertiser: string;
  status: "Pending" | "Approved" | "Active" | "Rejected" | "Completed";
  duration: string;
  budget: string;
  payment: "Pending" | "Paid" | "Nil";
}

export const campaignMockData: CampaignRow[] = [
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Pending", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Pending" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Approved", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Pending" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Active", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Paid" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Active", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Paid" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Rejected", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Nil" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Completed", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Paid" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Active", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Paid" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Rejected", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Nil" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Active", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Paid" },
  { campaign: "Weekend Promo", campaignId: "CMP-001", advertiser: "ABC Digital Ltd", status: "Active", duration: "June 15 - Aug 31, 2025", budget: "₦50,000.00", payment: "Paid" },
];

const getStatusStyle = (status: CampaignRow["status"]) => {
  switch (status) {
    case "Pending":
      return "inline-flex items-center justify-center rounded-full w-28 border border-[#FFA500] text-[#FFA500] bg-white text-xs px-3 py-1.5";
    case "Approved":
      return "inline-flex items-center justify-center rounded-full w-28 border border-[#008000] text-[#008000] bg-white text-xs px-3 py-1.5";
    case "Active":
      return "inline-flex items-center justify-center rounded-full w-28 border border-[#008000] text-[#008000] bg-white text-xs px-3 py-1.5";
    case "Rejected":
      return "inline-flex items-center justify-center rounded-full w-28 border border-[#FF0033] text-[#FF0033] bg-white text-xs px-3 py-1.5";
    case "Completed":
      return "inline-flex items-center justify-center rounded-full w-28 border border-[#6B7280] text-[#6B7280] bg-white text-xs px-3 py-1.5";
  }
};

const getPaymentStyle = (payment: CampaignRow["payment"]) => {
  switch (payment) {
    case "Pending":
      return "inline-flex items-center justify-center rounded-full w-24 border border-[#FFA500] text-[#FFA500] bg-white text-xs px-3 py-1.5";
    case "Paid":
      return "inline-flex items-center justify-center rounded-full w-24 border border-[#008000] text-[#008000] bg-white text-xs px-3 py-1.5";
    case "Nil":
      return "inline-flex items-center justify-center rounded-full w-24 border border-[#FF0033] text-[#FF0033] bg-white text-xs px-3 py-1.5";
  }
};

export const campaignColumns: TableColumn<CampaignRow>[] = [
  {
    name: "Campaign",
    cell: (row) => (
      <div className="flex flex-col py-2">
        <span className="font-medium text-sm">{row.campaign}</span>
        <span className="text-xs text-gray-500">{row.campaignId}</span>
      </div>
    ),
    grow: 1.5,
    minWidth: "140px",
  },
  {
    name: "Advertiser",
    selector: (row) => row.advertiser,
    grow: 1.5,
    minWidth: "150px",
  },
  {
    name: "Status",
    cell: (row) => (
      <span className={getStatusStyle(row.status)}>
        {row.status}
      </span>
    ),
    center: true,
    minWidth: "140px",
  },
  {
    name: "Duration",
    selector: (row) => row.duration,
    grow: 1.5,
    minWidth: "180px",
  },
  {
    name: "Budget",
    selector: (row) => row.budget,
    minWidth: "120px",
  },
  {
    name: "Payment",
    cell: (row) => (
      <span className={getPaymentStyle(row.payment)}>
        {row.payment}
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
