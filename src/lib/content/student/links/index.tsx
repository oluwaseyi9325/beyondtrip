import { BiSupport } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { ImBook } from "react-icons/im";
import { LuFile, LuSchool } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

export const StudentLinks = [
  {
    icon: <RxDashboard size={20} />,
    text: "Dashboard",
    path: "/student",
    hasSub: false,
    sub: [],
  },
  {
    icon: <LuSchool size={18} />,
    text: "Classes",
    path: "/student/classes",
    hasSub: false,
    sub: [],
  },
  {
    icon: <ImBook size={16} />,
    text: "Assignment",
    path: "/student/assignment",
    hasSub: false,
    sub: [
      // { text: "Pending Assignment", path: "/student/assignment/pending" },
      // { text: "Completed Assignment", path: "/student/assignment/completed" },
    ],
  },
  {
    icon: <LuFile size={20} />,
    text: "Material",
    path: "/student/material",
    hasSub: false,
    sub: [],
  },
  {
    icon: <CiUser size={20} />,
    text: "Account",
    path: "/student/account",
    hasSub: false,
    sub: [],
  },
];

export const StudentSettingsLinks = [
  {
    icon: <BiSupport size={20} />,
    text: "Customer Support",
    // path: "/student/support",
    path: "https://api.whatsapp.com/message/Q7EVSVVTHRNFH1?autoload=1&app_absent=0",

  },
];
