import makeRequest from "@/config/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetdrivers = (params?: any) => {
  return useQuery({
    queryKey: ["get-drivers", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useDriverOverview = (params?: any) => {
  return useQuery({
    queryKey: ["driver-overview", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=overview",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};



export const useDriverEditBank = (params?: any) => {
  return useQuery({
    queryKey: ["driver-overview", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=request-bank-update",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useDriverBankDetails = (params?: any) => {
  return useQuery({
    queryKey: ["driver-overview", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=bank-details-requests",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};




export const useDriverChangePassword = () => {
  return useMutation({
    mutationKey: ["driver-deacativate"],
    mutationFn: async (data: any) => {
      // console.log(data,"user data")
      const response = await makeRequest({
        url: `driver-dashboard?action=change-password`,
        method: "POST",
        data,
        requireToken: true,
      });
      return response;
    },
  });
};




