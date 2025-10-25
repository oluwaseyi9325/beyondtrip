// @/services/announcement.service.ts

import makeRequest from "@/config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAnnouncements = (classId: string, params?: any) => {
  return useQuery({
    queryKey: ["get-announcements", { params }],
    queryFn: () =>
      makeRequest({
        url: `Announcement/announcements/${classId}`,
        params,
      }),
    enabled: !!classId,
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useCreateAnnouncement = () => {
  return useMutation({
    mutationKey: ["add-announcement"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: "Announcement/add",
        method: "POST",
        data,
        content_type: "multipart/form-data",
        requireToken: true,
      });

      return response;
    },
  });
};

export const useDeleteAnnouncementById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      makeRequest({
        url: `Announcement/delete/${id}`,
        method: "DELETE",
        requireToken: true,
      }),
      onSuccess: () => {
        toast.success("Announcement deleted successfully");
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "get-announcements",
        });
    },
    onError: (error: any) => {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement");
    },
  });
};



export const useUpdateAnnouncement = (id: any) => {
  return useMutation({
    mutationKey: ["edit-announcement"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Announcement/edit/${id}`,
        method: "PUT",
        data,
        content_type: "multipart/form-data",
        requireToken: true,
      });

      return response;
    },
  });
};
