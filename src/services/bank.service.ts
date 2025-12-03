import makeRequest from "@/config/api";
import { useMutation, useQuery } from "@tanstack/react-query";


//  driver 



export const useDriverUpdateBank = () => {
  return useMutation({
    mutationKey: ["update-bank"],
    mutationFn: async (data: any) => {
      console.log("Updating bank with data:", data);
      const response = await makeRequest({
        url: "driver-dashboard?action=request-bank-update",
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};




// advertiser






// admin