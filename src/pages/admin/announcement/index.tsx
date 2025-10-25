
import AnnouncementList from "@/layout/driver/announcement";

import { useEffect, useState } from "react";
import { useGetClasses, } from "@/services/class.service";

import { useGetAnnouncements } from "@/services/announcement.service";
import { Option } from "@/components/input/select";
import Container from "@/layout/admin/container";
// import Container from "@/layout/tutor/container";

const Announcement = () => {
 
  // const { data } = useGetTutorClasses(profile?.id);
  // const [classes, setClasses] = useState<any>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const { data } = useGetClasses();
  // console.log(data, " class data")
  
  useEffect(() => {
    if (data) {
      // setClasses(data?.data?.items);
      setOptions(
        data?.data?.items?.map((item: any) => ({
          label: item?.course?.courseName,
          value: item?.course?.id,
        }))
      );
    }
  }, [data]);

  const {
    data: announcements,
    isLoading,
    refetch,
  } = useGetAnnouncements("null");

  const [announce, setAnnounce] = useState<any>([]);

  useEffect(() => {
    if (announcements) {
      setAnnounce(announcements?.data?.items);
    }
  }, [announcements]);

  return (
    <Container active="Announcement">
      <section className="container py-6 h-full overflow-y-hidden">
      

        <AnnouncementList
          data={announce}
          isLoading={isLoading}
          refetch={refetch}
          options={options} // Pass options to AnnouncementList
        />
      </section>
    </Container>
  );
};

export default Announcement;