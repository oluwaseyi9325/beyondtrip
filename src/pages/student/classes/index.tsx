import Container from "@/layout/student/container";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";



const colorPresets = [
  {
    bgColor: "bg-cyan-100",
    titleColor: "text-cyan-600",
    buttonColor: "bg-cyan-200 hover:bg-cyan-300 text-cyan-700",
    badgeColor: "text-cyan-600",
  },
  {
    bgColor: "bg-purple-100",
    titleColor: "text-purple-600",
    buttonColor: "bg-purple-200 hover:bg-purple-300 text-purple-700",
    badgeColor: "text-purple-600",
  },
  {
    bgColor: "bg-emerald-100",
    titleColor: "text-emerald-600",
    buttonColor: "bg-emerald-200 hover:bg-emerald-300 text-emerald-700",
    badgeColor: "text-emerald-600",
  },
  {
    bgColor: "bg-orange-100",
    titleColor: "text-orange-600",
    buttonColor: "bg-orange-200 hover:bg-orange-300 text-orange-700",
    badgeColor: "text-orange-600",
  },
  {
    bgColor: "bg-rose-100",
    titleColor: "text-rose-600",
    buttonColor: "bg-rose-200 hover:bg-rose-300 text-rose-700",
    badgeColor: "text-rose-600",
  },
  {
    bgColor: "bg-indigo-100",
    titleColor: "text-indigo-600",
    buttonColor: "bg-indigo-200 hover:bg-indigo-300 text-indigo-700",
    badgeColor: "text-indigo-600",
  },
];

const Student = () => {
  const { profile } = useAuthStore();
  const [classDataWithColor, setClassDataWithColor] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.classes?.length) {
      const colored = profile.classes.map((cls: any, index: number) => {
        const preset = colorPresets[index % colorPresets.length];
        return {
          ...cls,
          ...preset,
        };
      });
      setClassDataWithColor(colored);
    }
  }, [profile?.classes]);



  const navigate= useRouter()
  const handleViewAssignments = (classId: string | number) => {
    // You can navigate to assignment page here
    navigate.push(`/student/classes/${classId}`)
    // alert(`View assignments for class ID: ${classId}`);
  };

  return (
    <Container active="Classes">
      <div className="bg-white p-4 rounded space-y-3">
        <div className="w-full flex items-center justify-between">
          <p className="header">Classes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classDataWithColor?.map((classItem, i) => (
            <div
              key={i}
              className={`${classItem.bgColor} rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full`}
            >
              <div className="p-3 flex-grow flex flex-col justify-between">
                <p className="text-lg font-semibold mb-2">
                  {classItem.course?.courseName ?? "Untitled Class"}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {classItem.description ?? "No description provided."}
                </p>
              </div>

              <div className="flex flex-col space-y-2 px-4 pb-4">
                {/* <button
                  onClick={() => handleAction(classItem)}
                  className={`w-full ${classItem.buttonColor} py-2 rounded-md font-semibold transition-colors duration-200`}
                >
                  {classItem.actionType === "join"
                    ? "Join Class Now"
                    : "Mark Attendance"}
                </button> */}
                <button
                  onClick={() => handleViewAssignments(classItem.id)}
                  className="w-full bg-[#171313] text-white py-2 rounded-md font-semibold hover:bg-[#2c2c2c] transition-colors duration-200"
                >
                  View Class
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Student;
