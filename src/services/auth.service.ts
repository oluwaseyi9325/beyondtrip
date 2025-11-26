import makeRequest from "@/config/api";
import useAuthStore from "@/store/useAuthStore";
import { TLoginSchema, TRegister } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const { handleLogin } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (data: TLoginSchema) => {
      // console.log(data,"Login data")
      const response = await makeRequest({
        method: "POST",
        url: "users/login",
        data,
      });
      return response?.data;
    },
    onSuccess: (response) => {
      const formatResponse={...response?.user, token: response?.token}
      handleLogin(formatResponse);
      toast.success("Login successful!");
     console.log(formatResponse,"login datataatta")
      const role = formatResponse?.role
      console.log(role,"hgetting rile")

      if (role === "auperAdmin" || role === "admin") router.push("/admin");
      if (role === "user") router.push("/driver");
      if (role === "advertiser") router.push("/advertiser");
    },
    onError: (error: any) => {
      toast.error(
        error?.response.data?.error?.description ?? "An error occured"
      );
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      makeRequest({
        url: "User/profile",
        requireToken: true,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useGetdriverMe = () => {
  return useQuery({
    queryKey: ["driver-profile"],
    queryFn: () =>
      makeRequest({
        url: "driver-dashboard?action=profile",
        requireToken: true,
      }),
    retry: 1,
    select: (response) => response?.data,
  });
};

export const useRegister = (role: string) => {
  const { handleLogin } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["complete-registration", { role }],
    mutationFn: async (data: TRegister) => {
      const response = await makeRequest({
        method: "POST",
        url:
          role === "driver"
            ? "driverAccount/complete-registration"
            : "Account/completeRegistration",
        data,
      });
      return response?.data;
    },
    onSuccess: (response) => {
      handleLogin(response?.data);
      toast.success("Registration completed successfully!");

      if (role === "SuperAdmin" || role === "Admin") router.push("/admin");
      if (role === "driver") router.push("/driver");
      if (role === "advertiser") router.push("/advertiser");
    },
    onError: (error: any) => {
      toast.error(
        error?.response.data?.error?.description ?? "An error occured"
      );
    },
  });
};

export const useAdvertiserRegister = () => {
  const { handleLogin } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["complete-advertiser-registration"],
    mutationFn: async (data: {
      registrationCode: string;
      password: string;
    }) => {
      const response = await makeRequest({
        method: "POST",
        url: "advertiserAccount/complete-advertiser-registration",
        data,
      });
      return response?.data;
    },
    onSuccess: (response) => {
      handleLogin(response?.data);
      toast.success("Registration completed successfully!");
      router.push("/advertiser");
    },
    onError: (error: any) => {
      toast.error(
        error?.response.data?.error?.description ?? "An error occured"
      );
    },
  });
};


export const useUpdateProfile = (id?:string) => {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `driver-dashboard?action=update-profile`,
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Account/changePassword`,
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};


export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["forgot-Password"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Account/resetPassword`,
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};

export const useCompletePassword = () => {
  return useMutation({
    mutationKey: ["complete-Password"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        url: `Account/completResetPassword`,
        method: "POST",
        data,
        requireToken: true,
      });

      return response;
    },
  });
};



export const useSchoorlashipRegister = () => {
  const { handleLogin } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["schoolarship-complete-registration"],
    mutationFn: async (data: any) => {
      const response = await makeRequest({
        method: "POST",
        url:"Scholarship/complete-registration",
        data,
      });
      return response?.data;
    },
    onSuccess: (response) => {
      handleLogin(response?.data);
      toast.success("Registration completed successfully!");
      router.push("/advertiser");
    },
    onError: (error: any) => {
      toast.error(
        error?.response.data?.error?.description ?? "An error occured"
      );
    },
  });
};
