import makeRequest from "@/config/api";
import { useQuery } from "@tanstack/react-query";



//  driver 
export const useGetDriverRatings = (params?: any) => {
  return useQuery({
    queryKey: ["driver-ratings", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=ratings",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};






// advertiser






// admin