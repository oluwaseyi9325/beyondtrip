"use client";

import { GoPlus } from "react-icons/go";
import Button from "@/components/button";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "date-fns";
import Link from "next/link";

interface AssignmentsTabProps {
    assignments: any[];
    isLoading: boolean;
    onAddAssignment: () => void;
}

export const AssignmentsTab = ({ assignments, isLoading, onAddAssignment }: AssignmentsTabProps) => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Assignments</h2>
                <Button
                    handleClick={onAddAssignment}
                    size="md"
                    className="max-w-[170px] text-white text-sm font-[600] p-3"
                    hasIcon
                    icon={<GoPlus size={20} />}
                >
                    Add Assignment
                </Button>
            </div>

            <div className="w-full flex flex-wrap gap-6">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-[350px] h-[150px] rounded-lg overflow-hidden bg-white p-4 shadow"
                        >
                            <Skeleton height={24} width={`70%`} />
                            <Skeleton height={16} width={`100%`} className="mt-4" />
                            <Skeleton height={16} width={`90%`} className="mt-2" />
                        </div>
                    ))
                ) : assignments?.length === 0 ? (
                    <div className="w-full flex justify-center items-center py-16 text-center text-gray-500 font-medium">
                        No assignments created yet 📝
                        <br />
                        <span className="text-sm mt-2">Create your first assignment to get started</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {assignments.map((item: any, i: any) => (
                            <div
                                key={i}
                                className="bg-white border border-slate-400 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl flex flex-col justify-between h-full"
                            >
                                <div className="p-5">
                                    <div className="mb-3">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                            {item?.assignmentTitle}
                                        </h2>
                                        <p dangerouslySetInnerHTML={{ __html: item?.assignmentDescription }} className="text-sm text-gray-500 leading-relaxed line-clamp-3" />
                                        {/* {item?.assignmentDescription} */}

                                    </div>

                                    <div className="flex justify-between mt-6 text-sm text-gray-600">
                                        <div>
                                            <p className="font-medium">Due Date</p>
                                            <p>
                                                {formatDate(item?.dueDate, 'dd/MM/yyyy')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">Allocated Mark</p>
                                            <p>{item?.MaxGrade || ""}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-slate-400">
                                    <Link href={`/driver/class/assignment/${item?.id}/`} className="w-full block text-center bg-[#171313] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#2c2c2c] transition-colors duration-200">
                                        View Submissions
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};