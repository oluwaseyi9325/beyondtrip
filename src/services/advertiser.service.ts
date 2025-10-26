import makeRequest from "@/config/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface InvitePayload {
  classId: string;
  advertiserId: string;
}

export const useGetadvertisers = (params?: any) => {
  return useQuery({
    queryKey: ["get-advertisers", { params }],
    queryFn: () =>
      makeRequest({
        url: "advertiser/get-advertisers",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useGetadvertiserByClass = (id: string, params?: any) => {
  return useQuery({
    queryKey: ["get-class-advertisers", { id, params }],
    queryFn: () =>
      makeRequest({
        url: `advertiser/get-advertisers/${id}`,
        params,
      }),
    enabled: !!id,
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useGetApplications = (params?: any) => {
  return useQuery({
    queryKey: ["advertiser-applications", { params }],
    queryFn: () =>
      makeRequest({
        url: "ApplicationForm/getAll",
        params,
        requireToken: true,
      }),
    select: (response) => response?.data,
  });
};

export const useAdmitadvertiser = () => {
  return useMutation({
    mutationKey: ["admit-advertiser"],
    mutationFn: ({
      cohortId,
      advertiserId,
    }: {
      cohortId: string;
      advertiserId: string;
    }) => {
      const response = makeRequest({
        url: `advertiserAccount/register/${cohortId}/${advertiserId}`,
        method: "POST",
        data: {},
        requireToken: true,
      });

      return response;
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.error?.description ?? "Error admitting advertiser!"
      );
    },
  });
};

export const useInviteadvertiser = () => {
  return useMutation({
    mutationKey: ["invite-advertiser"],
    mutationFn: async ({ classId, advertiserId }: InvitePayload) => {
      return makeRequest({
        url: `Class/${classId}/advertiser/${advertiserId}`,
        method: "POST",
        requireToken: true,
      });
    },
  });
};

export const useGetadvertisersProfile = (params?: any) => {
  return useQuery({
    queryKey: ["get-advertisers-profile", { params }],
    queryFn: () =>
      makeRequest({
        url: "advertiser/profile",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useVerifyPayment = (id?:any) => {
  return useMutation({
    mutationKey: ["verify-payment"],
    mutationFn: async (data: any) => {
      console.log("Webinar Data: from mutationsss", data);
      const response = await makeRequest({
        url: `Payment/confirm-applicant-payment/${id}`,
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};
