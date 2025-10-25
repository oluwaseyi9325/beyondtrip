import makeRequest from "@/config/api";
import { transformDate } from "@/helpers/convert-data";
import { TAddCohort } from "@/layout/general/modals/cohort/add-cohort";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCohorts = (params?: any) => {
  return useQuery({
    queryKey: ["get-cohorts", { params }],
    queryFn: () =>
      makeRequest({
        url: "Cohort/get-all-cohorts",
        params,
      }),
    retry: 1,
    select: (response) => response?.data?.data ?? [],
  });
};

export const useCreateCohort = () => {
  return useMutation({
    mutationKey: ["create-cohort"],
    mutationFn: async (data: TAddCohort) => {
      const response = await makeRequest({
        url: "Cohort/add",
        method: "POST",
        data: {
          note: `Cohort ${data.note}`,
          startDate: transformDate(data.startDate),
          endDate: transformDate(data.endDate),
        },
        requireToken: true,
      });

      return response;
    },
  });
};


export const useUpdateCohort = (id: any) => {
  return useMutation({
    mutationKey: ["edit-cohort"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Cohort/update-cohort/${id}`,
        method: "PUT",
        data: {
          note: `Cohort ${data.note}`,
          startDate: transformDate(data.startDate),
          endDate: transformDate(data.endDate),
        },
        requireToken: true,
      });

      return response;
    },
  });
};
