"use client";
import Container from "@/layout/admin/container";
import Text from "@/components/typography";
import { Statistics } from "@/lib/content/admin/stats";
import Stats from "@/ui/stats";
import { QuickActions } from "@/layout/driver/dashboard";
import { FaWallet, FaNewspaper, FaUserEdit } from "react-icons/fa";
import { PendingAction } from "@/layout/admin/dashboard/pending-action";
import { AdminNotificationCard } from "@/layout/admin/notification";
import { CampaignChart } from "@/layout/admin/dashboard/campaign-chart";
import { RevenueChart } from "@/layout/admin/dashboard/revenue-chart";
import { PastMagazines } from "@/layout/admin/dashboard/past-magazine";
import { NewMagazines } from "@/layout/admin/dashboard/new-magazine";


const Dashboard = () => {
  const actions = [
    {
      icon: <FaNewspaper size={20} />,
      label: "Manage Campaigns",
      color: "text-blue-600",
    },
    {
      icon: <FaWallet size={20} />,
      label: "Manage Magazines",
      color: "text-blue-600",
    },
    {
      icon: <FaNewspaper size={20} />,
      label: "Manage Payouts",
      color: "text-blue-600",
    },
  ];

  return (
    <Container title="Admin Dashboard" >
      <section className="w-full lg:px-4 py-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Text className="text-xl " weight="700" color="black">
            Hello, Emmanuel Vicksons{" "}
          </Text>
          <Text className="text-sm " weight="500" color="grey">
            Here’s an overview of today’s activities and key updates{" "}
          </Text>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3">
          <Stats data={Statistics} />
        </div>

        <div className="grid w-full grid-cols-1 lg:grid-cols-7 gap-4 ">
          <div className="lg:col-span-4   ">
            <RevenueChart />
          </div>
          <div className=" space-y-4 lg:col-span-3">
            <NewMagazines/>
            <PastMagazines/>
          </div>
        </div>
        <CampaignChart h="h-90" />
        <QuickActions actions={actions} />
        <div className="grid w-full grid-cols-1 lg:grid-cols-7 gap-6">
          <div className="lg:col-span-3">
            <PendingAction />
          </div>
          <div className="lg:col-span-4">
            <AdminNotificationCard />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
