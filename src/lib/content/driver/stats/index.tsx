import { TStats } from "@/ui/stats/stats-card";
import { ImBook } from "react-icons/im";
import { LuSchool, LuUsersRound } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
// import { TStats } from "@/ui/stats/stats-card";
import { AiOutlineDollar } from "react-icons/ai";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { RiStackLine } from "react-icons/ri";
import EarningIcon from "~/assets/icons/totalEarning";
import TotalPoints from "~/assets/icons/totalPoint";
import TotalScans from "~/assets/icons/totalScans";
import TotalQuota from "~/assets/icons/quota";

type TStatisticsProps={
  totalEarnings:number,
  totalPoints?:number,
  totalScans?:number,
  totalQuota?:number,
}

export const Statistics=({totalEarnings, totalPoints, totalScans, totalQuota}:TStatisticsProps)=>{
  return [
    {
      icon: <EarningIcon />,
      title: "Total Earnings",
      figure: `₦${totalEarnings.toLocaleString()}`, // or just hide with *********
    },
    {
      icon: <TotalPoints />,
      title: "Total Points",
      figure: `${totalPoints}`,
    },
    {
      icon: <TotalScans />,
      title: "Scans",
      figure: `${totalScans}`,
    },
    {
      icon: <TotalQuota />,
      title: "Quota",
      figure: `${totalQuota}`,
    },
  ];
}
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
