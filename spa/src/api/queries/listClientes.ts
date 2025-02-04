import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listClientesApi = async (): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/inquilino/queries/clientes`);
  return req;
};
