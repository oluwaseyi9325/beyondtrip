import makeRequest from "@/config/api";
import { TAddAdmin } from "@/layout/general/modals/admin/add-admin";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAdmins = (params?:any) => {
  return useQuery({
    queryKey: ["all-admins", { params }],
    queryFn: () =>
      makeRequest({
        url: "User/getUsers",
        // params: {
        //   Role: "Admin",
        //   // ...params,
        // },
        params,
        requireToken: true,
      }),
    select: (response) => response?.data,
  });
};

export const useInviteAdmin = () => {
  return useMutation({
    mutationKey: ["invite-admin"],
    mutationFn: async (data: TAddAdmin) => {
      const response = await makeRequest({
        url: "Account/register",
        method: "POST",
        data: {
          emailAddress: data.email,
          userRole: "Admin",
        },
        requireToken: true,
      });

      return response;
    },
  });
};
