import { AuthStore } from "@/types/auth";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      role: null,
      token: null,
      profile: null,
      handleLogin: (data: any) =>
        set({ role: data?.role, token: data?.token, isLoggedIn: true }),
      updateProfile: (data: any) => set({ profile: data }),
      handleLogout: () =>
        set({
          isLoggedIn: false,
          role: null,
          token: null,
          profile: null,
        }),
    }),
    {
      name: "candle-auth",
    }
  )
);

export function getToken() {
  return useAuthStore.getState().token;
}

export const logoutUser = () => {
  useAuthStore.getState().handleLogout();
  toast.success("Logged out successfully!");
};

export default useAuthStore;
