"use client";

import AdvertiserTopbar from "../advertiser-topbar";
import Sidebar from "../sidebar";
// import useAuthStore from "@/store/useAuthStore";
import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetadvertisersProfile } from "@/services/advertiser.service";

interface TProps {
  children: React.ReactNode;
  active?: string;
  search?: string;
  title?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Container = ({title, children, active,}: TProps) => {

  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (hasMounted) {
  //     if (role !== "advertiser") {
  //       router.push("/");
  //     }
  //   }
  // }, [hasMounted, role, router]);

  // const { data: response } = useGetadvertisersProfile();
  // console.log(response);
  // useEffect(() => {
  //   if (response) {
  //     updateProfile(response?.data);
  //   }
  // }, [response, updateProfile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  return (
    <main className="bg-[#F7F7F7] min-h-screen md:grid md:grid-cols-[300px_1fr] gap- relative">
      {/* Overlay on mobile */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden"></div>
      )}

      {/* Sidebar (mobile + desktop) */}
      <div
        ref={sidebarRef}
        className={`fixed z-50 top-0 left-0 h-full w-[250px] transition-transform duration-300 bg-[white] p-4  ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-full md:p-0`}
      >
        <Sidebar active={active} onCloseMobile={() => setShowSidebar(false)} />
      </div>

      {/* Main Content */}
      <section className="w-full h-full overflow-y-hidden">
        <AdvertiserTopbar
          // search={search}
          // handleSearch={handleSearch}
          title={title}
          onToggleSidebar={() => setShowSidebar(true)}
        />
        <section className="h-[calc(100vh-90px)] px-7 overflow-y-auto space-y-4 relative scrollbar-none">
          {children}
        </section>
      </section>
    </main>
  );
};

export default Container;
