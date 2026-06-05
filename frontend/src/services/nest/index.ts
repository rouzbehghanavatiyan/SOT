import axios from "axios";

const baseURL: string | undefined = import.meta.env.VITE_NEST_URL;

export const userMessages = async (
  userIdLogin: number,
  userIdSender: number,
  skip: number,
  take: number,
): Promise<any> => {
  try {
    const url = `${baseURL}/chat/userMessages?userIdLogin=${userIdLogin}&userIdSender=${userIdSender}&skip=${skip}&take=${take}`;

    const response = await axios.get(url);
    return response?.data;
  } catch (error: any) {
    console.error("Error fetching user messages:", error);

    throw new Error(
      error?.response?.data?.message || "Failed to fetch user messages",
    );
  }
};
export const allUserMessagese = async (userIdLogin: number) => {
  const url = `${baseURL}/chat/allUserMessagese?userIdLogin=${userIdLogin}`;
  return await axios.get(url);
};

export const allStore = async () => {
  const url = `${baseURL}/api/store/allStore`;
  return await axios.get(url);
};

export const createPayment = async (postData: any) => {
  const url = `${baseURL}/api/store/createPayment`;
  return await axios.post(url, postData);
};

export const confirmPayment = async (paymentId: number) => {
  const url = `${baseURL}/api/store/confirmPayment/${paymentId}`;
  return await axios.patch(url);
};

export const uploadVideo = async (postData: any, config?: any) => {
  const url = `${baseURL}/api/file/uploadVideo`;
  return await axios.post(url, postData, config);
};

export const uploadStartFileDraft = async (postData: any, config?: any) => {
  const url = `${baseURL}/api/file/uploadChunk`;
  return await axios.post(url, postData, config);
};

// export const uploadFileChunk = async (postData: any, config?: any) => {
//   const url = `${baseURL}/api/file/uploadChunk`;
//   return await axios.post(url, postData, config);
// };

export const completeDraftUpload = async (postData: any, config?: any) => {
  const url = `${baseURL}/api/file/draft/complete`;
  return await axios.post(url, postData, config);
};

export const deleteDraftUpload = async (uploadId: string, config?: any) => {
  const url = `${baseURL}/api/file/draft/${uploadId}`;
  return await axios.delete(url, config);
};
