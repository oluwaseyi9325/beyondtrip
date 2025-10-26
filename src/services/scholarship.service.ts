import makeRequest from "@/config/api";
import {  useMutation, useQuery } from "@tanstack/react-query";

export const useGetScholarshipadvertisers = (params?: any) => {
    return useQuery({
      queryKey: ["get-scholarship-advertiser", { params }],
      queryFn: () =>
        makeRequest({
          url: "Scholarship",
          params,
        }),
      retry: 1,
      select: (response) => response?.data,
    });
  };

  export const useApproveScholarship = () => {
    return useMutation({
      mutationKey: ["approve-scholarship"],
      mutationFn: async (data: any) => {
        // console.log(data,"getting app id here")
        const response = await makeRequest({
          url: `Scholarship/approve?applicationId=${data?.id}`,
          method: "POST",
          data,
          requireToken: true,
        });
  
        return response;
      },
    });
};