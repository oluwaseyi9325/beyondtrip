"use client";

import { FiCalendar, FiClock} from "react-icons/fi";
import { formatTime } from "@/utils/date-utils";

export const ScheduleCard = ({ schedule, index: session }: any) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[300px] max-w-[350px]">
            {/* Header with day */}
            <div className="flex items-center gap-2 mb-4">
                <FiCalendar className="text-blue-600" size={18} />
                <h3 className="text-lg font-semibold text-gray-800">{schedule.weekday}</h3>
            </div>

            {/* Topic */}
            {/* <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Topic</p>
                <p className="text-gray-800 font-medium">{courseName}</p>
            </div> */}

            {/* Time slots */}
            <div className="space-y-3 mb-4">
                {schedule.timeSlots?.map((timeSlot: any, index: any) => (
                    <div key={index} className="bg-gray-50 rounded-md p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <FiClock className="text-gray-600" size={16} />
                            <span className="text-sm font-medium text-gray-700">Session {session + 1}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-600 mb-1">Date</p>
                                <p className="text-gray-800 font-medium">{formatTime(timeSlot.startTime)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-1">End Time</p>
                                <p className="text-gray-800 font-medium">{formatTime(timeSlot.endTime)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

          
        </div>
    );
};
