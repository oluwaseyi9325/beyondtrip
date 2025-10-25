import { RxDashboard } from "react-icons/rx";
import { LuUsersRound, LuSchool, LuFile } from "react-icons/lu";
import { PiUsersThree, PiBellSimple } from "react-icons/pi";
import { ImBook } from "react-icons/im";
// import { GiWallet } from "react-icons/gi";
import {
  // CiCalendar,
  CiUser,
} from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";

export const AdminLinks = [
  {
    icon: <RxDashboard size={20} />,
    text: "Dashboard",
    path: "/admin",
    hasSub: false,
    sub: [],
  },
  {
    icon: <LuUsersRound size={20} />,
    text: "Instructors",
    path: "/admin/tutors",
    hasSub: false,
    sub: [],
  },
  {
    icon: <PiUsersThree size={20} />,
    text: "Students",
    path: "",
    hasSub: true,
    sub: [
      { text: "Registered Students", path: "/admin/students/registered" },
      { text: "Scholarship Students", path: "/admin/students/scholarship" },
    ],
  },
  {
    icon: <LuSchool size={18} />,
    text: "Cohort",
    path: "/admin/cohort",
    hasSub: false,
    sub: [],
  },
  {
    icon: <ImBook size={16} />,
    text: "Courses",
    path: "/admin/courses",
    hasSub: false,
    sub: [],
  },
  {
    icon: <PiBellSimple size={20} />,
    text: "Announcement",
    path: "/admin/announcement",
    hasSub: false,
    sub: [],
  },
  {
    icon: <LuFile size={20} />,
    text: "Website Form",
    path: "",
    hasSub: true,
    sub: [
      { text: "Registrations", path: "/admin/website/registrations" },
      { text: "Partnership", path: "/admin/website/partners" },
       {text:"Ambassador", path:"/admin/website/ambassadors"}
    ],
  },
  // {
  //   icon: <GiWallet size={18} />,
  //   text: "Wallet",
  //   path: "/admin/wallet",
  //   hasSub: false,
  //   sub: [],
  // },
  // {
  //   icon: <CiCalendar size={20} />,
  //   text: "Audit Trails",
  //   path: "/admin/audit-trail",
  //   hasSub: false,
  //   sub: [],
  // },
];


export const UsAdminLinks = [
  {
    icon: <RxDashboard size={20} />,
    text: "Students",
    path: "/admin/us-students",
    hasSub: false,
    sub: [],
  },
  {
    icon: <ImBook size={16} />,
    text: "Webinars",
    path: "/admin/us-webinars?mode=us",
    hasSub: false,
    sub: [],
  },

];

export const AdminSettingsLinks = [
  {
    icon: <CiUser size={20} />,
    text: "Admin Management",
    path: "/admin/manage",
  },
  {
    icon: <IoKeyOutline size={20} />,
    text: "Security",
    path: "/admin/security",
  },
];



