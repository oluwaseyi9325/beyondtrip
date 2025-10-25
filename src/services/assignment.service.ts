import makeRequest from "@/config/api";
import {  useMutation, useQuery } from "@tanstack/react-query";




export const useGetAssignments = (params?: any) => {
  return useQuery({
    queryKey: ["get-assignments", { params }],
    queryFn: () =>
      makeRequest({
        url: "Assignment/assignments",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useCreateAssignment = () => {
  return useMutation({
    mutationKey: ["add-assignment"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: "Assignment/add",
        method: "POST",
        data,
        content_type: "multipart/form-data",
        requireToken: true,
      });

      return response;
    },
  });
};

export const useGetAssignmentByCourseId = (classId: string, params?: any) => {
  return useQuery({
    queryKey: ["get-assignment-course", { params }],
    queryFn: () =>
      makeRequest({
        url: `Assignment/class-assignments/${classId}`,
        params,
      }),
    enabled: !!classId,
    retry: 1,
    select: (response) => response?.data,
  });
};





export const useSubmitAssignment = (classId: string) => {
  return useMutation({
    mutationKey: ["submit-assignment"],
    mutationFn: async ({  data }: {  data: any }) => {
      const response = await makeRequest({
        url: `Assignment/submit/${classId}`,
        method: "POST",
        data,
        content_type: "multipart/form-data",
        requireToken: true,
      });

      return response;
    },
  });
};

// export const useGetAssignmentSubmissions = (assignmentId: string, params?: any) => {
//   return useQuery({
//     queryKey: ["get-assignment-submissions", { params }],
//     queryFn: () =>
//       makeRequest({
//         url: `Assignment/${assignmentId}/submissions`,
//         params,
//       }),
//     enabled: !!assignmentId,
//     retry: 1,
//     select: (response) => response?.data,
//   });
// };``


export const useGetAssignmentSubmissions = (assignmentId: string, params?: any) => {
  return useQuery({
    queryKey: ["get-assignment-submissions", assignmentId],
    queryFn: () =>
      makeRequest({
        url: `Assignment/${assignmentId}/submissions`,
        params,
      }),
    enabled: !!assignmentId,
    retry: 1,
    select: (response) => response?.data,
  });
};

export const fetchAssignmentSubmissions = async (assignmentId: string, params?: any) => {
  const res = await makeRequest({
    url: `Assignment/${assignmentId}/submissions`,
    params,
  });
  return res.data;
};

