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

export const useInvitedriver = () => {
  return useMutation({
    mutationKey: ["invite-driver"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: "driverAccount/register",
        method: "POST",
        data: {
          courseId: data.course,
          cohortId: data.cohort,
          emailAddress: data.email,
        },
        requireToken: true,
      });

      return response;
    },
  });
};


// export const useDeactivatedriver = (id: string, params?: any) => {
//   return useQuery({
//     queryKey: ["driver-deacativate", { id, params }],
//     queryFn: () =>
//       makeRequest({
//         url: `Account/deactivate/${id}`,
//         params,
//       }),
//     enabled: !!id,
//     retry: 1,
//     select: (response) => response?.data,
//   });
// };

export const useDeactivatedriver = (id: string,) => {
  console.log(id,"driver od")
  return useMutation({
    mutationKey: ["driver-deacativate"],
    mutationFn: async (data: any) => {
      console.log(data,"user data")
      const response = await makeRequest({
        url: `Account/deactivate/${id}`,
        method: "POST",
        data,
        requireToken: true,
      });
      return response;
    },
  });
};

export const useActivatedriver = (id: string,) => {
  return useMutation({
    mutationKey: ["driver-acativate"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Account/activate/${id}`,
        method: "POST",
        data,
        requireToken: true,
      });
      return response;
    },
  });
};