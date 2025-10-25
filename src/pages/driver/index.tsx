import { Option } from "@/components/input/select";
import Announcement from "@/layout/general/announcement";
import Container from "@/layout/driver/container";
import { Statistics } from "@/lib/content/tutor/stats";
import { useGetAnnouncements } from "@/services/announcement.service";
import { useGetTutorClasses } from "@/services/class.service";
import useAuthStore from "@/store/useAuthStore";
import Stats from "@/ui/stats";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { profile } = useAuthStore();

  const { data } = useGetTutorClasses(profile?.id);
  const [classes, setClasses] = useState<any>([]);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (data) {
      setClasses(data?.data);
      setOptions(
        data?.data?.map((item: any) => ({
          label: item?.courseName,
          value: item?.courseCohortId,
        }))
      );
    }
  }, [data]);

  const {
    data: announcements,
    isLoading,
    refetch,
  } = useGetAnnouncements(classes?.[0]?.courseCohortId);

  const [announce, setAnnounce] = useState<any>([]);

  useEffect(() => {
    if (announcements) {
      setAnnounce(announcements?.data?.items);
    }
  }, [announcements]);

  return (
    <Container>



      <section className="w-full px-4 py-6 flex flex-col gap-8 ">

        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="lg:text-2xl text-lg font-[800] leading-[26px] text-[#171313]">
              Good Morning,{" "}
              <span className="text-[#D0D0D0]">{profile?.lastName}!</span>
            </h1>
            <p className="font-[500] lg:text-xl text-md leading-none -tracking-[0.03em] text-[#5E5E5EEF]">
              Hope you are having an interesting day today 😎
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3"> 
          <Stats data={Statistics} />
        </div>
      </section>

      {/* Pass options and refetch to Announcement component
      <Announcement
        data={announce}
        isLoading={isLoading}
        refetch={refetch}
        options={options}
      /> */}
    </Container>
  );
};

export default Dashboard;
