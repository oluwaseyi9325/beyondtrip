import makeRequest from "@/config/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMaterialByClass = (id: string) => {
  return useQuery({
    queryKey: ["get-class-materials", { id }],
    queryFn: () =>
      makeRequest({
        url: `Class/materials/${id}`,
      }),
    enabled: !!id,
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useCreateMaterial = (classId: string) => {
  return useMutation({
    mutationKey: ["add-material"],
    mutationFn: async ({ type, data }: { type: string; data: any }) => {
      const response = await makeRequest({
        url: `Class/upload/${classId}/${type}`,
        method: "POST",
        data,
        content_type: "multipart/form-data",
        requireToken: true,
      });

      return response;
    },
  });
};
