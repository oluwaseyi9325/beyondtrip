import makeRequest from "@/config/api";
import { useQuery } from "@tanstack/react-query";


// advertiser

export const useAdvertiserCampaign = (params?: any) => {
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












// admin