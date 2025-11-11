import makeRequest from "@/config/api";
import { transformCourses } from "@/helpers/convert-data";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetCourses = (params?: any) => {
  return useQuery({
    queryKey: ["get-courses", { params }],
    queryFn: () =>
      makeRequest({
        url: "Course/get-courses",
        params,
      }),
    retry: 1,
    select: (response) => response?.data?.data ?? [],
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Course/add-course?CourseName=${data.courseName}`,
        method: "POST",
        data: undefined,
        requireToken: true,
      });

      const fees = transformCourses(data);

      try {
        const responses = await Promise.all(
          fees.map((fee) =>
            makeRequest({
              url: `Fee/add-fee/${response?.data?.data?.id}/${fee.paymentType}/${fee.currency}`,
              method: "POST",
              data: { amount: fee.amount },
              requireToken: true,
            })
          )
        );

        return responses;
      } catch (error) {
        console.error("Error submitting fees:", error);
        toast.error("Error occured while setting up fees");
      }
    },
  });
};



export const useUpdateCourse = (id:any) => {
  return useMutation({
    mutationKey: ["update-course"],
    mutationFn: async (data: any) => {
      console.log(data, id,  "update course data");
      
      const fees = transformCourses(data);
      console.log(fees, "transformed fees");
      try {
        // Update existing fees or add new ones
        const responses = await Promise.all(
   
          fees.map((fee:any) => 
            makeRequest({
              url:  fee.feeId?   `Fee/update-fee/${fee.feeId}/${fee.paymentType}`:  `Fee/add-fee/${data?.courseId}/${fee.paymentType}/${fee.currency}`  ,
                //  `Fee/update-fee/${fee.feeId}/${fee.paymentType}/${fee.currency}`,
              method:  fee.feeId? "PUT" : "POST" ,
              data: { amount: fee.amount },
              requireToken: true,
            })
          )
        );

        return responses;
      } catch (error) {
        console.error("Error updating fees:", error);
        toast.error("Error occurred while updating fees");
      }
    },
  });
};
