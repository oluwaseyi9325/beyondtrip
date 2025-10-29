
import { useGetAnnouncements } from "@/services/announcement.service";
import useAuthStore from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import ViewAnnouncemnt from "./view-announcement";

interface ClassItem {
    id: number;
    title: string;
    startTime: string;
    description: string;
    time: string;
    dateOrInstructor: string;
    actionType: "join" | "attendance";
    bgColor?: string;
    titleColor?: string;
    buttonColor?: string;
    badgeColor?: string;
    announcementName?: string;
    announcementInfo?: string;
}

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

const Announcement = () => {
    const [classList, setClassList] = useState<ClassItem[]>([]);
    const { profile } = useAuthStore();
    const { data } = useGetAnnouncements(profile?.classes?.[0]?.id);
    // const { data } = useGetAnnouncements(profile?.classes||"");

    useEffect(() => {
        if (data?.data?.items) {
            const enrichedData = data.data.items.map((item: any) => {
                const color = colorPresets[Math.floor(Math.random() * colorPresets.length)];
                return {
                    ...item,
                    ...color,
                };
            });
            setClassList(enrichedData);
        }
    }, [data]);
    const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState<any>({});
    const handleAction = (classItem: ClassItem) => {
        setOpenView(true);
        setViewData(classItem);
        // if (classItem.actionType === "join") {
        //     alert(`Joining class: ${classItem.title}`);
        // } else {
        //     alert(`Marked attendance for: ${classItem.title}`);
        // }
    };

    

    return (
        <>
            <ViewAnnouncemnt
                open={openView}
                handleClose={() => setOpenView(false)}
                data={viewData}
            />
           <div className="col-span-2">
            <div className="bg-white p-4 rounded space-y-3">
                <div className="w-full flex items-center justify-between">
                    <p className="header">ANNOUNCEMENT</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    {classList.map((classItem: ClassItem) => (
                        <div
                            key={classItem.id}
                            className={`${classItem.bgColor} rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full`}
                        >
                            <div className="p-3 flex-grow flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className={`text-1xl font-bold ${classItem.titleColor}`}>
                                        {classItem.announcementName}
                                    </h2>
                                </div>

                                <p dangerouslySetInnerHTML={{ __html: classItem?.announcementInfo ?? "" }} className="text-gray-700 mb-6 leading-relaxed flex-grow"/>
                            </div>

                            <button
                                onClick={() => handleAction(classItem)}
                                className={`w-full ${classItem.buttonColor} py-3 px-4 rounded-b-xl font-semibold transition-colors duration-200`}
                            >
                                View Announcement
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Announcement;
