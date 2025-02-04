import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listContratosApi = async (): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/inquilino/queries/contratos`);
  return req;
};
