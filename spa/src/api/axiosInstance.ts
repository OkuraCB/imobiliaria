import axios from "axios";

const timeout = 60 * 1000;

export const axiosInstance = axios.create({
  baseURL: `http://arthurtv.duckdns.org:10006/`,
  timeout: timeout,
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem(process.env.REACT_TOKEN!);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
