"use client";


import { useRouter } from "next/router";
import Button from "@/components/button";
import { useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CreateAssignments from "@/layout/general/modals/assignment/create-assignment";
import { useGetAssignmentByCourseId } from "@/services/assignment.service";
import Container from "@/layout/student/container";

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


  const { data, isLoading, refetch } = useGetAssignmentByCourseId(id as string);
  console.log("Assignment Data: ", data);

  const assignments = data?.data?.items || [];

  return (
    <>

      <CreateAssignments
        handleClose={() => setOpen(false)}
        open={open}
        classId={id as string}
        refetch={refetch}
      />



      <Container active="Assignment">
        <>
          <Button
            variant="border"
            size="md"
            className="max-w-[80px]"
            handleClick={() => history.back()}
          >
            Back
          </Button>

          <section className="container">
            <div className="w-full flex items-center justify-between p-4">
              <p className="header">ASSIGNMENT</p>

             
            </div>

            <div className="w-full flex flex-wrap gap-6 p-4">
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
                  No assignment yet 😌
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
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
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                            {item?.assignmentDescription
                            }
                          </p>
                        </div>

                        <div className="flex justify-between mt-6 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">Due Date</p>
                            <p>
                              {item?.dueDate === "0001-01-01T00:00:00" || !item?.dueDate
                                ? "No due date"
                                : new Date(item.dueDate).toLocaleDateString()}
                            </p>

                          </div>
                          <div className="text-right">
                            <p className="font-medium">Allocated Mark</p>
                            <p>{item?.MaxGrade || ""}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-slate-400">
                        <button
                          className="w-full bg-[#171313] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#2c2c2c] transition-colors duration-200"
                        >
                          View Submissions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      </Container>
    </>
  );
};

export default Assignment;
