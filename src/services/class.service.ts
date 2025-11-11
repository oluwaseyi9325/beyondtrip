import makeRequest from "@/config/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateClass = (id: string) => {
  return useMutation({
    mutationKey: ["create-cohort"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Class/create/${id}/${data.course}/${data.cohort}`,
        method: "POST",
        requireToken: true,
      });
      return response;
    },
  });
};

export const useDriverToClass = (id: string) => {
  return useMutation({
    mutationKey: ["create-cohort"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `driver`,
        method: "POST",
        data: {
          driverId: id,
          cohortId: data.cohort,
          courseId: data.course,
          isInheritingClass: true,
          isPrimarydriver: true,
        },
        requireToken: true,
      });

      return response;
    },
  });
};

export const useGetdriverClasses = (id: string) => {
  return useQuery({
    queryKey: ["get-driver-class", { id }],
    queryFn: () =>
      makeRequest({
        url: `driver/classes?driverId=${id}`,
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