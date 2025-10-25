import { RxDashboard, RxMagicWand } from "react-icons/rx";
import {
  // LuFile,
  //  LuSchool,
  LuUsersRound,
} from "react-icons/lu";
import {
  // PiUsersThree,
  PiBellSimple,
} from "react-icons/pi";
import { ImBook } from "react-icons/im";
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
// import { BiSupport } from "react-icons/bi";

export const DriverLinks = [
  {
    icon: <RxDashboard size={20} />,
    text: "Dashboard",
    path: "/driver",
  },
  {
    icon: <ImBook size={18} />,
    text: "Earnings",
    path: "/driver/earnings",
  },
  {
    icon: <PiBellSimple size={20} />,
    text: "Magazines",
    path: "/driver/magazines",
  },
  {
    icon: <LuUsersRound size={20} />,
    text: "Profile",
    path: "/driver/profile",
  },

  {
    icon: <RxMagicWand size={20} />,
    text: "Notifications",
    path: "/driver/notifications",
  },

];

export const TutorSettingsLinks = [
  {
    icon: <CiUser size={20} />,
    text: "Profile",
    path: "/tutor/profile",
  },
  {
    icon: <IoKeyOutline size={20} />,
    text: "Security",
    path: "/tutor/security",
  },
  // {
  //   icon: <BiSupport size={20} />,
  //   text: "Customer Support",
  //   path: "/tutor/support",
  // },
];
