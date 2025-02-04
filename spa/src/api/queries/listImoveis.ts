import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listImoveisApi = async (): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/inquilino/queries/imoveis`);
  return req;
};
