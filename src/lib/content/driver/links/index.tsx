
import DashboardIcon from "~/assets/icons/dashboard";
import EarningIcon from "~/assets/icons/earning";
import MagazineIcon from "~/assets/icons/magazine";
import ProfileIcon from "~/assets/icons/profile";
import NotificationIcon from "~/assets/icons/notification";

export const DriverLinks = [
  {
    icon: <DashboardIcon />,
    text: "Dashboard",
    path: "/driver",
  },
  {
    icon: <EarningIcon />,
    text: "Earnings",
    path: "/driver/earnings",
  },
  {
    icon: <MagazineIcon />,
    text: "Magazines",
    path: "/driver/magazines",
  },
  {
    icon: <ProfileIcon />,
    text: "Profile",
    path: "/driver/profile",
  },
  {
    icon: <NotificationIcon />,
    text: "Notifications",
    path: "/driver/notifications",
  },
];