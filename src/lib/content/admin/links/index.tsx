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
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

export const AdminLinks = [
  {
    icon: <MdDashboard size={20} />,
    text: "Dashboard",
    path: "/admin",
    hasSub: false,
    sub: [],
  },
  {
    icon: <IoIosPeople size={20} />,
    text: "Drivers",
    path: "",
    hasSub: true,
    sub: [
      { text: "Overview", path: "/admin/drivers/overview" },
      { text: "Magazines", path: "/admin/drivers/magazines" },
      { text: "Manage Requests", path: "/admin/drivers/requests" },
    ],
  },
  {
    icon: <IoIosPeople size={20} />,
    text: "Advertisers",
    path: "",
    hasSub: true,
    sub: [
      { text: "Overview", path: "/admin/advertisers/overview" },
      { text: "Campaigns", path: "/admin/advertisers/campaigns" },
      { text: "Invoices", path: "/admin/advertisers/invoices" },
    ],
  },
  {
    icon: <FaBell size={20} />,
    text: "Notifications",
    path: "/admin/notifications",
    hasSub: false,
    sub: [],
  },
  {
    icon: <IoMdSettings size={20} />,
    text: "Settings",
    path: "/admin/settings",
    hasSub: false,
    sub: [],
  },
];
