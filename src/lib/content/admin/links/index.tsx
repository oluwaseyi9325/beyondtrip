// import { RxDashboard } from "react-icons/rx";
// import { LuUsersRound, LuSchool, LuFile } from "react-icons/lu";
// import { PiUsersThree, PiBellSimple } from "react-icons/pi";
// import { ImBook } from "react-icons/im";
// import { GiWallet } from "react-icons/gi";
// import {
//   // CiCalendar,
//   CiUser,
// } from "react-icons/ci";
// import { IoKeyOutline } from "react-icons/io5";
import DashboardIcon from "~/assets/icons/dashboard";
import GroupIcon from "~/assets/icons/group";
import NotificationIcon from "~/assets/icons/notification";
import SettingIcon from "~/assets/icons/setting";
import OverviewIcon from "~/assets/icons/overview";
import MagazineIcon from "~/assets/icons/magazine";
import RequestIcon from "~/assets/icons/request";
import CampaignIcon from "~/assets/icons/campaign";
import InvoiceSidebarIcon from "~/assets/icons/invoiceSidebar";

export const AdminLinks = [
  {
    icon: <DashboardIcon />,
    text: "Dashboard",
    path: "/admin",
    hasSub: false,
    sub: [],
  },
  {
    icon: <GroupIcon />,
    text: "Drivers",
    path: "",
    hasSub: true,
    sub: [
      {
        text: "Overview",
        path: "/admin/drivers/overview",
        icon: <OverviewIcon />,
      },
      {
        text: "Magazines",
        path: "/admin/drivers/magazines",
        icon: <MagazineIcon />,
      },
      {
        text: "Manage Requests",
        path: "/admin/drivers/requests",
        icon: <RequestIcon />,
      },
    ],
  },
  {
    icon: <GroupIcon />,
    text: "Advertisers",
    path: "",
    hasSub: true,
    sub: [
      {
        text: "Overview",
        path: "/admin/advertisers/overview",
        icon: <OverviewIcon />,
      },
      {
        text: "Campaigns",
        path: "/admin/advertisers/campaigns",
        icon: <CampaignIcon />,
      },
      {
        text: "Invoices",
        path: "/admin/advertisers/invoices",
        icon: <InvoiceSidebarIcon />,
      },
    ],
  },
  {
    icon: <NotificationIcon />,
    text: "Notifications",
    path: "/admin/notifications",
    hasSub: false,
    sub: [],
  },
  {
    icon: <SettingIcon />,
    text: "Settings",
    path: "/admin/settings",
    hasSub: false,
    sub: [],
  },
];
