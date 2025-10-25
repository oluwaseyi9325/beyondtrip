import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import Container from "@/layout/admin/container";
import PaymentHistory from "@/layout/admin/payment-history";
import Announcement from "@/layout/general/announcement";
import { Statistics } from "@/lib/content/admin/stats";
import { useGetTutors } from "@/services/tutor.service";
import { useGetCourses } from "@/services/course.service";
// import { useGetStudents } from "@/services/student.service";
import Stats from "@/ui/stats";
import { GoPlus } from "react-icons/go";
import { LuUsersRound } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { ImBook } from "react-icons/im";
import AddCourse from "@/layout/general/modals/course/add-course";
import { useEffect, useState } from "react";
import { TStats } from "@/ui/stats/stats-card";
import AddTutor from "@/layout/general/modals/tutor/add-tutor";
import AddAdmin from "@/layout/general/modals/admin/add-admin";
import AddAnnouncement from "@/layout/general/modals/announcement/add";
import { useGetAnnouncements } from "@/services/announcement.service";
import { useGetClasses,  } from "@/services/class.service";

const Dashboard = () => {
  const { data: courses, refetch: refetchCourse } = useGetCourses();
  // const { data: students } = useGetStudents();
  const { data: tutors, refetch: refetchTutor } = useGetTutors();

  // statistics
  const [stats, setStats] = useState<TStats[]>(Statistics);

  const actions = [
    {
      icon: <FaRegUser size={20} color="#121363" />,
      text: "Invite Admin",
      handleClick: () => setOpenAdmin(true),
    },
    {
      icon: <LuUsersRound size={20} color="#121363" />,
      text: "Add Instructor",
      handleClick: () => setOpenTutor(true),
    },
    {
      icon: <ImBook size={16} color="#121363" />,
      text: "Add new course",
      handleClick: () => setOpenCourse(true),
    },
  ];

  // modals
  
  const [openCourse, setOpenCourse] = useState(false);
  const [openTutor, setOpenTutor] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openAnnounce, setOpenAnnounce] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  // const [classes, setClasses] = useState<any>([]);
  const { data } = useGetClasses();
  console.log(data," class data")

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


  useEffect(() => {
    const updatedStats = Statistics.map((item, index) => {
      if (index === 0 && courses) {
        return {
          ...item,
          figure: Number(courses?.totalCount ?? 0).toLocaleString(),
        };
      }

      if (index === 2 && tutors) {
        return {
          ...item,
          figure: Number(tutors?.data?.totalCount ?? 0).toLocaleString(),
        };
      }

      return item;
    });

    setStats(updatedStats);
  }, [courses, tutors]);

  // announcements
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
    <>
      <AddAdmin open={openAdmin} handleClose={() => setOpenAdmin(false)} />

      <AddTutor
        open={openTutor}
        handleClose={() => setOpenTutor(false)}
        refetch={refetchTutor}
      />

      <AddCourse
        open={openCourse}
        handleClose={() => setOpenCourse(false)}
        refetch={refetchCourse}
      />

      <AddAnnouncement
        open={openAnnounce}
        handleClose={() => setOpenAnnounce(false)}
        refetch={refetch}
      />

      <Container>
        <section className="w-full px-4 py-6 flex flex-col gap-8 container">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="lg:text-2xl text-xl font-[800] leading-[26px] text-[#171313]">
                Good Morning, <span className="text-[#D0D0D0]">Admin!</span>
              </h1>
              <p className="font-[500] lg:text-xl text-md leading-none -tracking-[0.03em] text-[#5E5E5EEF]">
                Let’s tour around 😎
              </p>
            </div>

            <Dropdown className="w-[80px]" position="-left-26">
              <Button
                size="md"
                className="w-[80px] text-white text-sm font-[600]"
                hasIcon
                icon={<GoPlus size={20} />}
              >
                Add
              </Button>

              <div className="w-[185px] bg-[#FAFAFA] border-[#EEEEEE] rounded-md shadow-sm py-1">
                {actions?.map((item) => (
                  <div
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer"
                    key={item.text}
                    onClick={item.handleClick}
                  >
                    {item.icon}
                    <p className="font-[500] text-sm text-[#5E5E5E]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Dropdown>
          </div>

          <div className="flex flex-col gap-3">
            <p className="header">METRICS</p>

            <Stats data={stats} />
          </div>
        </section>

        <section className="w-full grid grid-cols-1 lg:grid-cols-[1fr_265px] gap-4">
          <PaymentHistory />

          <Announcement
        data={announce}
        isLoading={isLoading}
        refetch={refetch}
            options={options}
            isDashboard
      />
        </section>
      </Container>
    </>
  );
};

export default Dashboard;
