"use client";

import { useRouter } from "next/router";
import Button from "@/components/button";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useGetMaterialByClass } from "@/services/material.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAssignmentSubmissions, useGetAssignmentByCourseId, } from "@/services/assignment.service";
import Container from "@/layout/student/container";
import DocumentCard from "@/layout/student/material";
import SubmitAssignment from "@/layout/general/modals/assignment/submit-assignment";
import ViewAssignment from "@/layout/general/modals/assignment/view-assignment";
import { useGetClassesById } from "@/services/class.service";
import { ScheduleCard } from "@/pages/tutor/class/schedule/[id]";
import { FiLink } from "react-icons/fi";

export interface TRegistered {
    accountStatus: string;
    classes: any | null;
    cohorts: any | null;
    emailAddress: string;
    firstName: string;
    id: string;
    identityId: string | null;
    lastName: string;
    middleName: string;
    phoneNumber: string;
}

const Assignment = () => {
    const router = useRouter();
    const { id } = router.query;
    const [open, setOpen] = useState(false);
    const [openViewAssignment, setOpenViewAssignment] = useState(false);
    const [viewData, setViewData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("schedules");
    const { data: scheduleData, } = useGetClassesById(id as string);
    console.log("Schedule Data:", scheduleData?.data?.classSchedules);
    const { data: materialData } = useGetMaterialByClass(id as string);
    const { data, isLoading, refetch } = useGetAssignmentByCourseId(id as string);

    // Memoize assignments array to prevent unnecessary re-renders
    const assignments = useMemo(() => data?.data?.items || [], [data?.data?.items]);

    const handleDownload = (doc: any) => {
        if (typeof window !== "undefined") {
            window.open(doc.fileUrl, "_blank");
        }
    };
    const [assignmentId, setAssignmentId] = useState<string | null>(null);

    const handleSubmit = (id: string) => {
        setOpen(true);
        setAssignmentId(id);
    };

    const [submissionsMap, setSubmissionsMap] = useState<Record<string, boolean>>({});

    // Wrap fetchAllSubmissions in useCallback to prevent recreation on every render
    const fetchAllSubmissions = useCallback(async () => {
        if (assignments.length === 0) return;

        const map: Record<string, boolean> = {};

        await Promise.all(
            assignments.map(async (assignment: any) => {
                try {
                    const res = await fetchAssignmentSubmissions(assignment.id);
                    map[assignment.id] = res?.data?.length > 0;
                } catch (e) {
                    console.log(e)
                    map[assignment.id] = false;
                }
            })
        );

        setSubmissionsMap(map);
    }, [assignments]);

    useEffect(() => {
        fetchAllSubmissions();
    }, [fetchAllSubmissions]);

    const handleViewAssignment = (value: any) => {
        setOpenViewAssignment(true);
        setViewData(value);
    };

    const tabs = [
        { id: "schedules", label: "Class Schedules", icon: "📅" },
        { id: "materials", label: "Materials", icon: "📚" },
        { id: "assignments", label: "Assignment", icon: "📝" },
    ];

    console.log(scheduleData?.data?.classSchedules, "getting scheddduesss")

    const renderTabContent = () => {
        switch (activeTab) {
            case "schedules":
                return (
                    <div className="p-4 sm:p-6">
                        <div className="pt-3 border-t border-gray-100 mb-4 flex flex-col sm:flex-row gap-2 sm:gap-5">
                            <div className="flex items-center justify-between sm:justify-start mb-2">
                                <div className="flex items-center gap-2">
                                    <FiLink className="text-blue-600" size={16} />
                                    <span className="text-sm text-gray-600">Meeting Link:</span>
                                </div>
                            </div>
                            <a
                                href={scheduleData?.data?.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm break-all block truncate"
                                title={scheduleData?.data?.meetingLink}
                            >
                                {scheduleData?.data?.meetingLink}
                            </a>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {scheduleData?.data?.classSchedules?.map((schedule: any, index: any) => (
                                <ScheduleCard
                                    index={index}
                                    meetingLink={scheduleData?.data?.meetingLink}
                                    key={schedule.id}
                                    schedule={schedule}
                                    courseName={scheduleData?.data?.course?.courseName}
                                />
                            ))}
                        </div>
                    </div>
                );

            case "materials":
                return (
                    <div className="p-4 sm:p-6">
                        <div className="space-y-4">
                            {materialData?.data?.items?.map((document: any, i: any) => (
                                <DocumentCard
                                    isDefaultStyle={false}
                                    key={i}
                                    document={document}
                                    onDownload={handleDownload}
                                />
                            ))}
                        </div>
                    </div>
                );

            case "assignments":
                return (
                    <div className="p-4 sm:p-6">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-full h-[150px] rounded-lg overflow-hidden bg-white p-4 shadow"
                                    >
                                        <Skeleton height={24} width={`70%`} />
                                        <Skeleton height={16} width={`100%`} className="mt-4" />
                                        <Skeleton height={16} width={`90%`} className="mt-2" />
                                    </div>
                                ))}
                            </div>
                        ) : assignments?.length === 0 ? (
                            <div className="w-full flex justify-center items-center py-16 text-center text-gray-500 font-medium">
                                No assignment yet 😌
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {assignments.map((item: any) => {
                                    const isSubmitted = submissionsMap[item.id];

                                    return (
                                        <div
                                            key={item.id}
                                            className="bg-white border border-slate-400 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl flex flex-col justify-between h-full"
                                        >
                                            <div className="p-5">
                                                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                                    {item.assignmentTitle}
                                                </h2>
                                                <p dangerouslySetInnerHTML={{ __html: item.assignmentDescription }} className="text-sm text-gray-500 leading-relaxed line-clamp-3"/>

                                                <div className="flex justify-between mt-6 text-sm text-gray-600">
                                                    <div>
                                                        <p className="font-medium">Due Date</p>
                                                        <p>
                                                            {item.dueDate === "0001-01-01T00:00:00" || !item.dueDate
                                                                ? "No due date"
                                                                : new Date(item.dueDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">Allocated Mark</p>
                                                        <p>{item.MaxGrade || ""}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 border-t border-slate-400">
                                                {isSubmitted ? (
                                                    <button
                                                        onClick={() => handleViewAssignment(item)}
                                                        className="w-full bg-[#121363] text-white py-2 px-4 rounded-md font-semibold"
                                                    >
                                                        View Assignment
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSubmit(item.id)}
                                                        className="w-full bg-[#171313] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#2c2c2c] transition-colors duration-200"
                                                    >
                                                        Submit Assignment
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <SubmitAssignment
                handleClose={() => setOpen(false)}
                open={open}
                classId={assignmentId as string}
                refetch={refetch}
                refetchSubmissions={fetchAllSubmissions}
            />

            <ViewAssignment
                handleClose={() => setOpenViewAssignment(false)}
                open={openViewAssignment}
                submissionsData={viewData}
            />

            <Container active="Classes">
                <>
                    <div className="flex gap-5 items-center mb-6">
                        <Button
                            variant="border"
                            size="md"
                            className="max-w-[80px]"
                            handleClick={() => history.back()}
                        >
                            Back
                        </Button>

                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                                {scheduleData?.data?.course?.courseName || "Class Management"}
                            </h1>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="border-b border-gray-200">
                            <nav
                                className="flex overflow-x-auto scrollbar-none"
                                aria-label="Tabs"
                            >
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            ${activeTab === tab.id
                                                ? "border-blue-500 text-blue-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }
                                            flex items-center gap-2 border-b-2 font-medium
                                            text-sm sm:text-base
                                            px-4 sm:px-6 py-3 sm:py-4
                                            whitespace-nowrap transition-colors duration-200
                                        `}
                                    >
                                        <span className="flex-shrink-0">{tab.icon}</span>
                                        <span className="truncate">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[400px]">
                            {renderTabContent()}
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
};

export default Assignment;