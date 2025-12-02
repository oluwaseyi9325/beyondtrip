import {  MdAccountBalanceWallet, MdNewspaper } from "react-icons/md";
import { FaUser, FaBell } from "react-icons/fa";
import DashboardIcon from "~/assets/icons/dashboard";
import EarningIcon from "~/assets/icons/earning";

// const MdDashboard = require('@/public/assets/icons/dashboard').default;``

export const DriverLinks = [
  {
    icon: <DashboardIcon  />,
    text: "Dashboard",
    path: "/driver",
  },
  {
    icon: <EarningIcon />,
    text: "Earnings",
    path: "/driver/earnings",
  },
  {
    icon: <MdNewspaper size={20} />,
    text: "Magazines",
    path: "/driver/magazines",
  },
  {
    icon: <FaUser size={20} />,
    text: "Profile",
    path: "/driver/profile",
  },
  {
    icon: <FaBell size={20} />,
    text: "Notifications",
    path: "/driver/notifications",
  },
];