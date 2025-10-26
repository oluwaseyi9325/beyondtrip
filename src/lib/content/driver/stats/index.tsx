import { TStats } from "@/ui/stats/stats-card";
import { ImBook } from "react-icons/im";
import { LuSchool, LuUsersRound } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
// import { TStats } from "@/ui/stats/stats-card";
import { AiOutlineDollar } from "react-icons/ai";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { RiStackLine } from "react-icons/ri";

export const Statistics: TStats[] = [
  {
    icon: <AiOutlineDollar size={20} />,
    title: "Total Earnings",
    figure: "₦0.00", // or just hide with ************
  },
  {
    icon: <HiOutlineChartBar size={20} />,
    title: "Total Points",
    figure: "500",
  },
  {
    icon: <MdOutlineQrCodeScanner size={20} />,
    title: "Scans",
    figure: "800",
  },
  {
    icon: <RiStackLine size={20} />,
    title: "Quota",
    figure: "15",
  },
];
export const advertiserStatistics: TStats[] = [
  {
    icon: <ImBook size={16} />,
    title: "Total Courses",
    figure: "16",
  },
  {
    icon: <PiUsersThree size={20} />,
    title: "Total Registered advertisers",
    figure: "500",
  },
  {
    icon: <LuUsersRound size={16} />,
    title: "Total Active advertisers",
    figure: "250",
  },
  {
    icon: <LuSchool size={18} />,
    title: "Total Suspended advertisers",
    figure: "07",
  },
];
