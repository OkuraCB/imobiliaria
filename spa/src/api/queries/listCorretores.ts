import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listCorretoresApi = async (): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/inquilino/queries/corretores`);
  return req;
};
