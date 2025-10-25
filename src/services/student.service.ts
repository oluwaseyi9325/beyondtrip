import makeRequest from "@/config/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface InvitePayload {
  classId: string;
  studentId: string;
}

export const useGetStudents = (params?: any) => {
  return useQuery({
    queryKey: ["get-students", { params }],
    queryFn: () =>
      makeRequest({
        url: "Student/get-students",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useGetStudentByClass = (id: string, params?: any) => {
  return useQuery({
    queryKey: ["get-class-students", { id, params }],
    queryFn: () =>
      makeRequest({
        url: `Student/get-students/${id}`,
        params,
      }),
    enabled: !!id,
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useGetApplications = (params?: any) => {
  return useQuery({
    queryKey: ["student-applications", { params }],
    queryFn: () =>
      makeRequest({
        url: "ApplicationForm/getAll",
        params,
        requireToken: true,
      }),
    select: (response) => response?.data,
  });
};

export const useAdmitStudent = () => {
  return useMutation({
    mutationKey: ["admit-student"],
    mutationFn: ({
      cohortId,
      studentId,
    }: {
      cohortId: string;
      studentId: string;
    }) => {
      const response = makeRequest({
        url: `StudentAccount/register/${cohortId}/${studentId}`,
        method: "POST",
        data: {},
        requireToken: true,
      });

      return response;
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.error?.description ?? "Error admitting student!"
      );
    },
  });
};

export const useInviteStudent = () => {
  return useMutation({
    mutationKey: ["invite-student"],
    mutationFn: async ({ classId, studentId }: InvitePayload) => {
      return makeRequest({
        url: `Class/${classId}/student/${studentId}`,
        method: "POST",
        requireToken: true,
      });
    },
  });
};

export const useGetStudentsProfile = (params?: any) => {
  return useQuery({
    queryKey: ["get-students-profile", { params }],
    queryFn: () =>
      makeRequest({
        url: "Student/profile",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useVerifyPayment = (id?:any) => {
  return useMutation({
    mutationKey: ["verify-payment"],
    mutationFn: async (data: any) => {
      console.log("Webinar Data: from mutationsss", data);
      const response = await makeRequest({
        url: `Payment/confirm-applicant-payment/${id}`,
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};
