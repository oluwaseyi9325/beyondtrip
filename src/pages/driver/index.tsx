"use client";
import Container from "@/layout/driver/container";
import { Statistics } from "@/lib/content/driver/stats";
import Stats from "@/ui/stats";
import { EarningsGraph, MagazinePickup, NotificationCard, QuickActions, UpcomingPayout } from "@/layout/driver/dashboard";
import { FaWallet, FaNewspaper, FaUserEdit } from "react-icons/fa";
import useAuthStore from "@/store/useAuthStore";
import { useDriverEarnings } from "@/services/earning.service";
import { link } from "fs";
import { useRouter } from "next/navigation";
import WithdrawEarnings from "~/assets/icons/withdrawEarning";
import ActivateMagazine from "~/assets/icons/activvateMagazine";
import EditProfile from "~/assets/icons/editProfile";
import Image from "next/image";

const Dashboard = () => {
  const { profile } = useAuthStore();
  console.log(profile, "my prooo")
  const router = useRouter();

  
    const { data } = useDriverEarnings()
  const earningData = data?.earnings?.recent
  console.log(data?.earnings, "earningsdsss")
  const totalEarnings = data?.earnings?.total || 0;
  const totalPoints = data?.earnings?.totalPoints || 0;
  const totalScans = data?.earnings?.totalScans || 0;
  const totalQuota = data?.earnings?.totalQuota || 0;
const actions = [
  {
    // icon: <WithdrawEarnings />,
    icon: <Image src="/assets/svg/withdrawEarning.svg" alt="Withdraw Earnings" width={22} height={22} />  ,

    label: "Withdraw Earnings",
    color: "text-blue-600",
    onClick: () => router.push("/driver/earnings"),
  },
  {
    icon: <ActivateMagazine />,
    label: "Activate Magazine",
    color: "text-blue-600",
    onClick: () => router.push("/driver/magazines"),
  },
  {
    icon: <EditProfile />,
    label: "Update Profile",
    color: "text-blue-600",
    onClick: () => router.push("/driver/profile"),
  },
];


  return (
    <Container title="Driver Dashboard" >
      <section className="w-full py-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-start justify-between ">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="lg:text-3xl text-xl font-bold text-gray-900">
                Hello, {profile?.firstName} {profile?.lastName}
              </h1>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                <span className="text-2xl font-bold text-gray-900">4.8</span>
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <p className="text-base text-gray-600">
              Get reward for every second spent with us and on the road!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3">
          <Stats data={Statistics({totalEarnings, totalPoints, totalScans, totalQuota})} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 h-54">
            <UpcomingPayout />
          </div>
          <div className="lg:col-span-2">
            <EarningsGraph h="15" graphSize="34"/>
          </div>
        </div>
        <QuickActions actions={actions} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MagazinePickup />
          <NotificationCard />
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;