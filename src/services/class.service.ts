import makeRequest from "@/config/api";
import { TAddClass } from "@/layout/general/modals/class";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateClass = (id: string) => {
  return useMutation({
    mutationKey: ["create-cohort"],
    mutationFn: async (data: TAddClass) => {
      const response = await makeRequest({
        url: `Class/create/${id}/${data.course}/${data.cohort}`,
        method: "POST",
        requireToken: true,
      });
      return response;
    },
  });
};

export const useTutorToClass = (id: string) => {
  return useMutation({
    mutationKey: ["create-cohort"],
    mutationFn: async (data: TAddClass) => {
      const response = await makeRequest({
        url: `Tutor`,
        method: "POST",
        data: {
          tutorId: id,
          cohortId: data.cohort,
          courseId: data.course,
          isInheritingClass: true,
          isPrimaryTutor: true,
        },
        requireToken: true,
      });

      return response;
    },
  });
};

export const useGetTutorClasses = (id: string) => {
  return useQuery({
    queryKey: ["get-tutor-class", { id }],
    queryFn: () =>
      makeRequest({
        url: `Tutor/classes?tutorId=${id}`,
        requireToken: true,
      }),
    retry: 1,
    enabled: !!id,
    select: (response) => response?.data,
  });
};


export const useGetClassesById = (id: string) => {
  return useQuery({
    queryKey: ["get-class-by-id", { id }],
    queryFn: () =>
      makeRequest({
        url: `class/get/${id}`,
        requireToken: true,
      }),
    retry: 1,
    enabled: !!id,
    select: (response) => response?.data,
  });
};





export const useCreateClassSchedule = (id: string) => {
  return useMutation({
    mutationKey: ["create-class-schedule"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Class/addMeetingInformation/${id}`,
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};

export const useGetClasses = (params?: any) => {
  return useQuery({
    queryKey: ["get-classes", { params }],
    queryFn: () =>
      makeRequest({
        url: "Class/getAll",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};