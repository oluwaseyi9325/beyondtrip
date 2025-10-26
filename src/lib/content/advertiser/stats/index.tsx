"use client"
import useAuthStore from "@/store/useAuthStore";
import { TStats } from "@/ui/stats/stats-card";
import { ImBook } from "react-icons/im";
import { LuSchool, LuUsersRound } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

// export const Statistics: TStats[] = [
//   {
//     icon: <ImBook size={16} />,
//     title: "Course offering",
//     figure: "03",
//   },
//   {
//     icon: <ImBook size={16} />,
//     title: "Pending Assignment",
//     figure: "06",
//   },
//   {
//     icon: <ImBook size={16} />,
//     title: "Upcoming Class",
//     figure: "03",
//   },
//   {
//     icon: <ImBook size={16} />,
//     title: "Class Materials",
//     figure: "09",
//   },
// ];


export const useGetStatistics = () => {
  const { profile } = useAuthStore();
  console.log(profile)
  const materialData = profile?.classes?.[0]?.courseMaterials

  return [
    {
      icon: <ImBook size={16} />,
      title: "Course offering",
      figure: `0${profile?.classes?.length || 0}`,
    },
    {
      icon: <ImBook size={16} />,
      title: "Pending Assignment",
      figure: "00",
    },
    {
      icon: <ImBook size={16} />,
      title: "Upcoming Class",
      figure: "00",
    },
    {
      icon: <ImBook size={16} />,
      title: "Class Materials",
      figure: `0${materialData?.length || 0}`,
    },
  ];
};

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
