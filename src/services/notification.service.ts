import makeRequest from "@/config/api";
import { useQuery } from "@tanstack/react-query";



//  driver 
export const useDriverNotifications = (params?: any) => {
  return useQuery({
    queryKey: ["driver-ratings", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=notifications",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};





// advertiser






// admin