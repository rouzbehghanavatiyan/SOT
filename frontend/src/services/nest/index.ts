import axios from "axios";

const baseURL: string | undefined = import.meta.env.VITE_NEST_URL;

export const userMessages = async (
  userIdLogin: number,
  userIdSender: number
) => {
  const url = `${baseURL}/chat/userMessages?userIdLogin=${userIdLogin}&userIdSender=${userIdSender}`;
  return await axios.get(url);
};

export const allUserMessagese = async (userIdLogin: number) => {
  const url = `${baseURL}/chat/allUserMessagese?userIdLogin=${userIdLogin}`;
  return await axios.get(url);
};
