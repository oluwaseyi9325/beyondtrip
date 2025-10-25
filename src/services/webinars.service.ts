import makeRequest from "@/config/api";
// import { TAddClass } from "@/layout/general/modals/class";
import { useMutation, useQuery } from "@tanstack/react-query";



export const useAddWebinars = () => {
    return useMutation({
      mutationKey: ["add-webinars"],
      mutationFn: async (data: any) => {
        console.log("Webinar Data: from mutationsss", data);
        const response = await makeRequest({
          url: "Webinar/create",
          method: "POST",
          data,
          requireToken: true,
        });
  
        return response;
      },
    });
};
  

export const useGetWebinars = (params?: any) => {
    return useQuery({
      queryKey: ["get-webinars", { params }],
      queryFn: () =>
        makeRequest({
          url: "Webinar/webinars",
          params,
        }),
      retry: 1,
      select: (response) => response?.data,
    });
};
  

export const useGetWebinarsRegistrationsById = (id: string) => {
    return useQuery({
      queryKey: ["get-webinars-reg", { id }],
      queryFn: () =>
        makeRequest({
            url: `Webinar/webinar-registrations/${id}`,
        }),
      enabled: !!id,
      retry: 1,
      select: (response) => response?.data,
    });
};


export const useGetWebinarById = (id: string) => {
  return useQuery({
    queryKey: ["get-webinars-by-id", { id }],
    queryFn: () =>
      makeRequest({
          url: `Webinar/webinar/${id}`,
      }),
    enabled: !!id,
    retry: 1,
    select: (response) => response?.data,
  });
};