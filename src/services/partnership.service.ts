import makeRequest from "@/config/api";
import {  useMutation, useQuery } from "@tanstack/react-query";


export const useGetPartners = (params?: any) => {
    return useQuery({
      queryKey: ["get-partners", { params }],
      queryFn: () =>
        makeRequest({
          url: "ScholarshipPartner/partners",
          params,
        }),
      retry: 1,
      select: (response) => response?.data,
    });
  };

export const useGetPartnersById = (id: string) => {
    return useQuery({
      queryKey: ["get-single-partners", { id }],
      queryFn: () =>
        makeRequest({
          url: `ScholarshipPartner/partners/id-code?code=${id}`,
        }),
      enabled: !!id,
      retry: 1,
      select: (response) => response?.data,
    });
};

export const useAddPartner = () => {
    return useMutation({
      mutationKey: ["add-partner"],
      mutationFn: async (data: any) => {
        const response = await makeRequest({
          url: "ScholarshipPartner/partners",
          method: "POST",
          data,
          requireToken: true,
        });
        return response;
      },
    });
};
  


export const useGetPartnerStudents = (params?: any) => {
  return useQuery({
    queryKey: ["get-partners-student", { params }],
    queryFn: () =>
      makeRequest({
        url: "Scholarship",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

  

