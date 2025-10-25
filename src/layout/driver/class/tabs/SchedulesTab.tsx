"use client";

import { GoPlus } from "react-icons/go";
import Button from "@/components/button";
import { ScheduleCard } from "../ScheduleCard";
import { FiLink } from "react-icons/fi";


interface SchedulesTabProps {
    scheduleData: any;
    onAddSchedule: () => void;
}

export const SchedulesTab = ({ scheduleData, onAddSchedule }: SchedulesTabProps) => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Class Schedules</h2>
                <Button
                    size="md"
                    className="max-w-[170px] text-white text-sm font-[600] p-3"
                    hasIcon
                    icon={<GoPlus size={20} />}
                    handleClick={onAddSchedule}
                >
                    Add Schedule
                </Button>
            </div>

            {scheduleData?.data?.classSchedules?.length === 0 ? (
                <div className="w-full flex justify-center items-center py-16 text-center text-gray-500 font-medium">
                    No schedules created yet 📅
                </div>
            ) : (

                <>
                    <div className="pt-3 border-t border-gray-100 mb-4 flex gap-5">
                        <div className="flex items-center justify-between mb-2">
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
                </>
            )}
        </div>
    );
};
