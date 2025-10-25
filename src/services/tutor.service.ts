import makeRequest from "@/config/api";
import { TAddTutor } from "@/layout/general/modals/tutor/add-tutor";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTutors = (params?: any) => {
  return useQuery({
    queryKey: ["get-tutors", { params }],
    queryFn: () =>
      makeRequest({
        url: "Tutor",
        params,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useInviteTutor = () => {
  return useMutation({
    mutationKey: ["invite-tutor"],
    mutationFn: async (data: TAddTutor) => {
      const response = await makeRequest({
        url: "TutorAccount/register",
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


// export const useDeactivateTutor = (id: string, params?: any) => {
//   return useQuery({
//     queryKey: ["tutor-deacativate", { id, params }],
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

export const useDeactivateTutor = (id: string,) => {
  console.log(id,"tutor od")
  return useMutation({
    mutationKey: ["tutor-deacativate"],
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

export const useActivateTutor = (id: string,) => {
  return useMutation({
    mutationKey: ["tutor-acativate"],
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