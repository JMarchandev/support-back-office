import axios from "axios";
import { apiUrl } from "../constants";

export const getCompanyById = async (companyId: string) => {
  return await axios.get(`${apiUrl}/api-company/${companyId}`);
};

export const updateCompany = async (
  companyId: string,
  data: { name?: string; prompt_spec?: string[] }
) => {
  return await axios.put(`${apiUrl}/api-company/${companyId}`, data);
};
