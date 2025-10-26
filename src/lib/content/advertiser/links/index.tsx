import { MdDashboard, MdCampaign } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { FaFileInvoice, FaUser } from "react-icons/fa";

export const AdvertiserLinks = [
  {
    icon: <MdDashboard size={20} />,
    text: "Dashboard",
    path: "/advertiser",
  },
  {
    icon: <MdCampaign size={20} />,
    text: "Campaigns",
    path: "/advertiser/campaigns",
  },
  {
    icon: <IoStatsChart size={20} />,
    text: "Analytics",
    path: "/advertiser/analytics",
  },
  {
    icon: <FaFileInvoice size={20} />,
    text: "Invoices",
    path: "/advertiser/invoices",
  },
  {
    icon: <FaUser size={20} />,
    text: "Profile",
    path: "/advertiser/profile",
  },
];