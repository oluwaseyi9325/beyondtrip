import { MdDashboard, MdAccountBalanceWallet, MdNewspaper } from "react-icons/md";
import { FaUser, FaBell } from "react-icons/fa";

export const DriverLinks = [
  {
    icon: <MdDashboard size={20} />,
    text: "Dashboard",
    path: "/driver",
  },
  {
    icon: <MdAccountBalanceWallet size={20} />,
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