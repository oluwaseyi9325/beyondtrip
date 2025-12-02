import makeRequest from "@/config/api";
import { useQuery } from "@tanstack/react-query";



//  driver 
export const useDriverMagazines = (params?: any) => {
  return useQuery({
    queryKey: ["driver-ratings", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=magazines",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};


export const useDriverMagazinesPickup = (params?: any) => {
  return useQuery({
    queryKey: ["driver-ratings", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=magazine-pickups",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};


export const useDriverMagazinesPickupRequest= (params?: any) => {
  return useQuery({
    queryKey: ["driver-ratings", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=request-magazine-pickup",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};




// advertiser






// admin