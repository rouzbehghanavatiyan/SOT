import React from "react";
import ProgressBar from "../../components/ProgressBar";

interface ProfileBioProps {
  bio: string;
  location: string;
  website: string;
  rankPercentage: number;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  bio,
  location,
  website,
  rankPercentage,
}) => (
  <div className="flex flex-col items-center mb-5">
    <div className="font-bold mb-2  text-gray-800">Rank score</div>
    <div className="w-full relative h-4 bg-gray-200 rounded-xl overflow-hidden">
      <ProgressBar percentage={rankPercentage} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold font10 text-white text-xs z-10">
          {rankPercentage}%
        </span>
      </div>
    </div>
    <div className="flex flex-col w-full mt-5  items-start">
      <div className="mb-4">
        <span className="text-gray-800">{bio}</span>
      </div>
      <div className="mb-4">
        <span className="text-gray-800">{location}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold text-dark_blue">{website}</span>
      </div>
    </div>
  </div>
);

export default ProfileBio;
