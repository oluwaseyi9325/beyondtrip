"use client";

import Topbar from "@/layout/general/topbar";
import Sidebar from "../sidebar";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetStudentsProfile } from "@/services/student.service";

interface TProps {
  children: React.ReactNode;
  active?: string;
  search?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Container = ({ children, active, search, handleSearch }: TProps) => {
  const {role, updateProfile } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      if (role !== "Student") {
        router.push("/");
      }
    }
  }, [hasMounted, role, router]);

  const { data: response } = useGetStudentsProfile();
  console.log(response);
  useEffect(() => {
    if (response) {
      updateProfile(response?.data);
    }
  }, [response, updateProfile]);

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
    // <main className="p-6 pb-4 grid grid-cols-[300px_1fr] gap-4 bg-[#F4F4F4] h-dvh">
    //   <Sidebar active={active} />

    //   <section className="w-full h-full overflow-y-hidden">
    //     <Topbar search={search} handleSearch={handleSearch} />

    //     <section className="h-[calc(100%-90px)] overflow-y-auto space-y-4 scrollbar-none relative">
    //       {children}
    //     </section>
    //   </section>
    // </main>

    <main className="bg-[#F4F4F4] min-h-screen md:grid md:grid-cols-[300px_1fr] gap-4 p-4 relative">
      {/* Overlay on mobile */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden"></div>
      )}

      {/* Sidebar (mobile + desktop) */}
      <div
        ref={sidebarRef}
        className={`fixed z-50 top-0 left-0 h-full w-[250px] transition-transform duration-300 bg-[#121363] p-4 lg:rounded-2xl rounded-r-2xl ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-full md:p-0`}
      >
        <Sidebar active={active} onCloseMobile={() => setShowSidebar(false)} />
      </div>

      {/* Main Content */}
      <section className="w-full h-full overflow-y-hidden">
        <Topbar
          search={search}
          handleSearch={handleSearch}
          onToggleSidebar={() => setShowSidebar(true)}
        />
        <section className="h-[calc(100vh-90px)] overflow-y-auto space-y-4 relative scrollbar-none">
          {children}
        </section>
      </section>
    </main>
  );
};

export default Container;
