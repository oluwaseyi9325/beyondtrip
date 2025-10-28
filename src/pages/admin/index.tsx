"use client";
import Container from "@/layout/admin/container";
import Text from "@/components/typography";
import { Statistics } from "@/lib/content/admin/stats";
import Stats from "@/ui/stats";
import {
  EarningsGraph,
  MagazinePickup,
  NotificationCard,
  QuickActions,
  UpcomingPayout,
} from "@/layout/driver/dashboard";

const Dashboard = () => {
  return (
    <Container>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 h-54">
            <UpcomingPayout />
          </div>
          <div className="lg:col-span-2">
            <EarningsGraph h="15" graphSize="34" />
          </div>
        </div>
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MagazinePickup />
          <NotificationCard />
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
