import axios from "axios";
import { AddMovieType } from "../../common/EditVideo/type";

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

export const addLike = async (postData: any) => {
  const url = `${baseURL}/addLike`;
  return await axios.post(url, postData);
};

export const categoryList = async () => {
  const url = `${baseURL}/categoryList`;
  return await axios.get(url);
};

export const subCategoryList = async (catId: number) => {
  const url = `${baseURL}/subCategoryList?categoryId=${catId}`;
  return await axios.get(url);
};

export const subSubCategoryList = async (subCatId: number) => {
  const url = `${baseURL}/subSubCategoryList?subCategoryId=${subCatId}`;
  return await axios.get(url);
};

export const addMovie = async (data: AddMovieType) => {
  const url = `${baseURL}/addMovie`;
  return await axios.post(url, data);
};

export const addAttachment = async (data: FormData) => {
  const url = `${baseURL}/addAttachment`;
  return await axios.post(url, data);
};

// نمایش فیلم
export const attachmentListByInviteId = async (id: number) => {
  const url = `${baseURL}/attachmentListByInviteId?inviteId=${id}`;
  return await axios.get(url);
};

// 2نمایش فیلم
export const attachmentPlay = async (path: string) => {
  const url = `${baseURL}/attachmentPlay?path=${path}`;
  // console.log(url);
  return url;
};

// درخواست
export const addInvite = async (postData: any) => {
  const url = `${baseURL}/addInvite`;
  return await axios.post(url, postData);
};
