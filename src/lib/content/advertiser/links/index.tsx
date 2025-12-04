import DashboardIcon from "~/assets/icons/dashboard";
import CampaignIcon from "~/assets/icons/campaign";
import AnalyticIcon from "~/assets/icons/analytic";
import InvoiceSidebarIcon from "~/assets/icons/invoiceSidebar";
import ProfileIcon from "~/assets/icons/profile";

export const AdvertiserLinks = [
  {
    icon: <DashboardIcon />,
    text: "Dashboard",
    path: "/advertiser",
  },
  {
    icon: <CampaignIcon />,
    text: "Campaigns",
    path: "/advertiser/campaigns",
  },
  {
    icon: <AnalyticIcon />,
    text: "Analytics",
    path: "/advertiser/analytics",
  },
  {
    icon: <InvoiceSidebarIcon />,
    text: "Invoices",
    path: "/advertiser/invoices",
  },
  {
    icon: <ProfileIcon />,
    text: "Profile",
    path: "/advertiser/profile",
  },
];