import React, { forwardRef, useCallback, useRef, useState } from "react";
import ImageRank from "../../components/ImageRank";
import { Link } from "react-router-dom";
import EditImage from "../../components/EditImage";
import { addAttachment, profileAttachment } from "../../services/dotNet";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { RsetGetImageProfile } from "../../common/Slices/main";

interface ProfileHeaderProps {
  userImage?: string;
  userName?: string;
  followersCount?: number;
  followingCount?: number;
  score?: number;
  setProfileImage?: (image: string) => void; // نوع را اصلاح کردم
}

const ProfileHeader = forwardRef<HTMLSpanElement, ProfileHeaderProps>(
  (
    {
      userImage,
      userName,
      score,
      followersCount,
      followingCount,
      setProfileImage,
    },
    ref
  ) => {
    const dispatch = useAppDispatch();
    const main = useAppSelector((state) => state?.main);
    const [editingImage, setEditingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const userId = main?.userLogin?.user?.id;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadProfileImage = useCallback(
      async (croppedImage: string) => {
        try {
          // بررسی وجود تابع قبل از فراخوانی
          if (setProfileImage && typeof setProfileImage === 'function') {
            setProfileImage(croppedImage);
          }
          
          setEditingImage(false);
          const base64Data = croppedImage.split(",")[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const file = new File([byteArray], "profile.jpg", {
            type: "image/jpeg",
          });

          const formData = new FormData();
          formData.append("formFile", file);
          formData.append("attachmentId", userId);
          formData.append("attachmentType", "pf");
          formData.append("attachmentName", "profile");
          const resAttachment = await addAttachment(formData);
          const { status: attachmentStatus, data: attachmentData } =
            resAttachment?.data;
          if (attachmentStatus === 0) {
            const resProfileAttachment = await profileAttachment(userId);
            const { status, data } = resProfileAttachment?.data;
            if (status === 0) {
              dispatch(RsetGetImageProfile(data));
            }
          }
          return { attachmentStatus, attachmentData };
        } catch (error) {
          console.error("Error uploading profile image:", error);
          throw error;
        }
      },
      [userId, dispatch, setProfileImage]
    );

    const handleImageProfileUpload = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const imageData = e.target.result as string;
            console.log(imageData);
            
            // بررسی وجود تابع قبل از فراخوانی
            if (setProfileImage && typeof setProfileImage === 'function') {
              setProfileImage(imageData);
            }
            
            setSelectedImage(imageData);
            setEditingImage(true);
          }
        };
        reader.readAsDataURL(file);
        
        if (event.target) {
          event.target.value = "";
        }
      },
      [setProfileImage]
    );

    const handleProfile = useCallback(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, []);

    return (
      <>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageProfileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        {editingImage && (
          <EditImage
            src={selectedImage}
            onCropComplete={uploadProfileImage}
            onCancel={() => setEditingImage(false)}
            circularCrop={true}
          />
        )}
        <div className="grid grid-cols-6 relative">
          <div className="col-span-5 flex h-32">
            <span ref={ref} onClick={handleProfile} className="cursor-pointer">
              <ImageRank score={score} imgSrc={userImage} imgSize={100} />
            </span>
            <div className="flex flex-col gap-2 ms-2">
              <span className="font20 font-bold">{userName}</span>
              <div className="flex">
                <Link
                  to="/followers"
                  className="mx-2 border border-gray-150 flex flex-col py-1 px-2 rounded-2xl"
                >
                  <span className="font-bold text-gray-800">
                    {followersCount || 0}
                  </span>
                  <span className="font-bold text-gray-800 py-1 rounded text-xs">
                    Followers
                  </span>
                </Link>
                <Link
                  to="/following"
                  className="mx-2 border border-gray-150 flex flex-col py-1 px-2 rounded-2xl"
                >
                  <span className="font-bold text-gray-800">
                    {followingCount || 0}
                  </span>
                  <span className="font-bold text-gray-800 py-1 rounded text-xs">
                    Following
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ProfileHeader;