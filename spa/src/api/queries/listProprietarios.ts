import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listProprietariosApi = async (): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/inquilino/queries/proprietarios`);
  return req;
};
