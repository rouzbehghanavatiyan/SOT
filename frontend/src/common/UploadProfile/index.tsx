import {
  addAttachment,
  profileAttachmentList,
  userAttachmentList,
  followerList,
} from "../../services/dotNet";

export const uploadProfileImage = async (imageData: string, userId: string) => {
  // Convert image to file and upload
  const base64Data = imageData.split(",")[1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], "profile.jpg", { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("formFile", file);
  formData.append("attachmentId", userId);
  formData.append("attachmentType", "pf");
  formData.append("attachmentName", "profile");

  const resAttachment = await addAttachment();
  const { status: attachmentStatus, data: attachmentData } =
    resAttachment?.data;

  if (attachmentStatus === 0) {
    const resProfileAttachmentList = await profileAttachmentList(userId);
    const { data } = resProfileAttachmentList?.data;
    return { newProfileImage: data };
  }

  throw new Error("Failed to upload profile image");
};

export const fetchUserVideos = async (userId: string) => {
  const res = await userAttachmentList(userId);
  if (res?.data?.status === 0) {
    return res.data.data;
  }
  throw new Error("Failed to fetch user videos");
};

export const fetchFollowers = async (userId: string) => {
  const res = await followerList(Number(userId));
  if (res?.data?.status === 0) {
    return res.data.data;
  }
  throw new Error("Failed to fetch followers");
};
