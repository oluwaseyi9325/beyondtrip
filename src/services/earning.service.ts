import makeRequest from "@/config/api";
import { useQuery } from "@tanstack/react-query";



//  driver
export const useDriverEarnings = (params?: any) => {
  return useQuery({
    queryKey: ["driver-ratings", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=earnings",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};



export const useDriverEarningsWithdrawal = (params?: any) => {
  return useQuery({
    queryKey: ["driver-ratings", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=request-withdrawal",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

// advertiser






// admin