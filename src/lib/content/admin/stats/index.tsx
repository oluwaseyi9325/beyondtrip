import { TStats } from "@/ui/stats/stats-card";
import { ImBook } from "react-icons/im";
import { LuSchool, LuUsersRound } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

export const Statistics: TStats[] = [
  {
    icon: <ImBook size={16} />,
    title: "Total Courses",
    figure: "0",
  },
  {
    icon: <PiUsersThree size={20} />,
    title: "Registered Students",
    figure: "0",
  },
  {
    icon: <LuUsersRound size={16} />,
    title: "No. of Instructors",
    figure: "0",
  },
  {
    icon: <LuSchool size={18} />,
    title: "Archive Classes",
    figure: "0",
  },
];

export const StudentStatistics: TStats[] = [
  {
    icon: <ImBook size={16} />,
    title: "Total Courses",
    figure: "0",
  },
  {
    icon: <PiUsersThree size={20} />,
    title: "Total Registered Students",
    figure: "0",
  },
  {
    icon: <LuUsersRound size={16} />,
    title: "Total Active Students",
    figure: "0",
  },
  {
    icon: <LuSchool size={18} />,
    title: "Total Suspended Students",
    figure: "0",
  },
];
