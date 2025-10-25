import makeRequest from "@/config/api";
// import { TAddClass } from "@/layout/general/modals/class";
import { useMutation, useQuery } from "@tanstack/react-query";



export const useAddAmbassador = () => {
    return useMutation({
      mutationKey: ["add-ambassador"],
      mutationFn: async (data: any) => {
        const response = await makeRequest({
          url: "Ambassador/create",
          method: "POST",
          data,
          requireToken: true,
        });
  
        return response;
      },
    });
};
  

export const useGetAmbassador = (params?: any) => {
    return useQuery({
      queryKey: ["get-ambassador", { params }],
      queryFn: () =>
        makeRequest({
          url: "Ambassador/filter-ambassador",
          params,
        }),
      retry: 1,
      select: (response) => response?.data,
    });
  };