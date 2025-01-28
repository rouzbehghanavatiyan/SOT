import axios from "axios";

const baseURL: string | undefined = import.meta.env.VITE_URL;

export const getTableFields = async () => {
  const url = `${baseURL}/logins`;
  const response = await axios.patch(url);
  console.log(response);
  return response?.data;
};

export const attachmentList = async () => {
  const url = `${baseURL}/attachmentList`;
  return await axios.get(url);
};

export const login = async (postData: any) => {
  const url = `${baseURL}/login`;
  return await axios.post(url, postData);
};

export const categoryList = async () => {
  const url = `${baseURL}/categoryList`;
  return await axios.get(url);
};

export const addLike = async () => {
  const url = `${baseURL}/addLike`;
  return await axios.get(url);
};