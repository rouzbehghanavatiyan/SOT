// ProfileHeader.tsx
import React from "react";
import ImageRank from "../../components/ImageRank";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  userImage: string;
  userName: string;
  followersCount: number;
  followingCount: number;
  onImageClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userImage,
  userName,
  followersCount,
  followingCount,
  onImageClick,
}) => (
  <div className="grid grid-cols-6 mt-1 relative">
    <div className="col-span-5 flex h-32">
      <span onClick={onImageClick} className="cursor-pointer">
        <ImageRank imgSrc={userImage}  imgSize={100} />
      </span>
      <div className="flex flex-col gap-2 ms-2">
        <span className="font20 font-bold">{userName}</span>
        <div className="flex">
          <Link
            to="/followers"
            className="mx-2 bg-gray-150 py-1 px-2 rounded-2xl"
          >
            <span className="font-bold text-gray-800">{followersCount}</span>
            <span className="font-bold text-gray-800 py-1 rounded text-xs ml-1">
              Followers
            </span>
          </Link>
          <Link
            to="/following"
            className="mx-2 bg-gray-150 py-1 px-2 rounded-2xl"
          >
            <span className="font-bold text-gray-800">{followingCount}</span>
            <span className="font-bold text-gray-800 py-1 rounded text-xs ml-1">
              Following
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
