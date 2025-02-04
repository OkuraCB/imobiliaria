import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listImoveisCarosApi = async (): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/inquilino/queries/imoveis/caros`);
  return req;
};
