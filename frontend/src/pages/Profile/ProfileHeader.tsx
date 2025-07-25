import React, { useCallback, useState } from "react";
import ImageRank from "../../components/ImageRank";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { uploadProfileImage } from "../../common/UploadProfile";

interface ProfileHeaderProps {
  setShowEditProfile: (show: boolean) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  setShowEditProfile,
}) => {
  const main = useAppSelector((state) => state?.main);
  const dispatch = useAppDispatch();
  const baseURL = import.meta.env.VITE_SERVERTEST;
  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;
  const [profileImage, setProfileImage] = useState(findImg);

  const handleProfileImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.[0]) return;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const imageData = e.target.result as string;
          try {
            const response = await uploadProfileImage(
              imageData,
              main?.userLogin?.userId
            );
            setProfileImage(response?.newProfileImage || imageData);
          } catch (error) {
            console.error("Error uploading profile image:", error);
          }
        }
      };
      reader.readAsDataURL(file);
    },
    [main?.userLogin?.userId]
  );

  return (
    <div className="mb-1 border-b-[1px]">
      <div className="grid grid-cols-6 relative">
        <div className="col-span-5 flex h-32">
          <span className="cursor-pointer">
            <ImageRank imgSrc={profileImage} imgSize={100} score={0} />
          </span>
        </div>
        <div className="items-start flex justify-end col-span-1">
          <button
            onClick={() => setShowEditProfile(true)}
            className="text-gray-800 font25"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
