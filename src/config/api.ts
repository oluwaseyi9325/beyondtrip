import axios from "axios";
import { ApiRequestParams } from "@/types/api";
import { API_URL } from "./global";
import { getToken, logoutUser } from "@/store/useAuthStore";

const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.status === 412) {
      if (typeof window !== "undefined") {
        logoutUser();
        location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

const makeRequest = async ({
  method = "GET",
  url,
  data = null,
  params = {},
  requireToken = true,
  content_type = "application/json",
}: ApiRequestParams): Promise<any> => {
  if (!requireToken) {
    delete Axios.defaults.headers.common["Authorization"];
  }

  const response = await Axios({
    method,
    url,
    data,
    params,
    headers: {
      "Content-Type": content_type,
    },
  });

  return response;
};

export default makeRequest;
