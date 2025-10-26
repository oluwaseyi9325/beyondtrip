"use client";
import Container from "@/layout/driver/container";
import { Statistics } from "@/lib/content/driver/stats";
import Stats from "@/ui/stats";
import { EarningsGraph, MagazinePickup, NotificationCard, QuickActions, UpcomingPayout } from "@/layout/driver/dashboard";

const Dashboard = () => {


  return (
    <Container>
      <section className="w-full lg:px-4 py-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-start justify-between ">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="lg:text-3xl text-xl font-bold text-gray-900">
                Hello, Samuel Emmaeus
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
          <Stats data={Statistics} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 h-54">
            <UpcomingPayout />
          </div>
          <div className="lg:col-span-2">
            <EarningsGraph />
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