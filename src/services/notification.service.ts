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


export const useDriverPayoutNotifications = (params?: any) => {
  return useQuery({
    queryKey: ["driver-payout-notifications", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver/notifications?action=payout-notifications",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};


export const useDriverEarningsNotifications = (params?: any) => {
  return useQuery({
    queryKey: ["driver-earnings-notifications", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver/notifications?action=earnings-notifications",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};


export const useDriverMagazineNotifications = (params?: any) => {
  return useQuery({
    queryKey: ["driver-magazine-notifications", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver/notifications?action=magazine-notifications",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useDriverNotificationHistory = (params?: any) => {
  return useQuery({
    queryKey: ["driver-notification-history", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver/notifications?action=notification-history",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};


export const useDriverNotificationCenter = (params?: any) => {
  return useQuery({
    queryKey: ["driver-notification-center", { params }],
    queryFn: () =>
      makeRequest({
        url: "driver/notifications?action=notification-center",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};






// advertiser






// admin