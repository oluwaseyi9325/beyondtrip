"use client"
import AddAnnouncement from "@/layout/general/modals/announcement/add";
import Announcement from "@/layout/student/announcement";
import Container from "@/layout/student/container";
// import { Statistics } from "@/lib/content/student/stats";
import Stats from "@/ui/stats";
import { useState } from "react";
import DocumentCard from "@/layout/student/material";
import useAuthStore from "@/store/useAuthStore";
import { useGetStatistics } from "@/lib/content/student/stats";


const Dashboard = () => {
  const { profile } = useAuthStore();
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  const handleDownload = (doc: any) => {
    if (typeof window !== "undefined") {
      window.open(doc.fileUrl, "_blank");
    }
  };

  const materialData = profile?.classes?.[0]?.courseMaterials

  return (
    <>
      <AddAnnouncement handleClose={() => setOpenAnnouncement(false)} open={openAnnouncement} />
      <Container>
        <section className="w-full px-4 py-6 flex flex-col gap-8 container">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="lg:text-2xl text-lg font-[800] leading-[26px] text-[#171313]">
                Good Morning, <span className="text-[#D0D0D0]">{profile?.lastName}!🎖</span>
              </h1>
              <p className="font-[500] lg:text-xl text-md leading-none -tracking-[0.03em] text-[#5E5E5EEF]">
                Hope you’re having an interesting day today 😎
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-[800] leading-[26px] text-[#5E5E5E]">
              {/* {profile?.classes[0]?.course?.courseName||""} */}
              </h1>
              <p className="font-[500] text-end text-xl leading-none -tracking-[0.03em] text-[#D0D0D0]">
              {/* {profile?.classes[0]?.course?.cohort||"Cohort 03"} */}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="header">METRICS</p>

            <Stats data={useGetStatistics()} />
          </div>
        </section>

        <section className="w-full grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div>
            <div className="p-3 space-y-3 bg-white">
              <p className="header">METRICS</p>
              <div className="overflow-auto h-[250px] space-y-2 scrollbar-none">
                {materialData?.map((document:any,i:any) => (
                  <DocumentCard
                    isDefaultStyle={false}
                    key={i}
                    document={document}
                    onDownload={handleDownload}
                  />
                ))}
              </div>

            </div>
          </div>
          <Announcement />
          {/* <Announcement /> */}

        </section>

      </Container>
    </>
  );
};

export default Dashboard;
