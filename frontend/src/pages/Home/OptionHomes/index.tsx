import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Image from "../../../components/Image";
import ImageRank from "../../../components/ImageRank";

const OptionHomes = ({ result, profile }: any) => {
  return (
    <div className="w-full bg_profile">
      <div className="flex   items-center justify-between m-2">
        <ImageRank
          imgSrc={profile?.img}
          profileName="jack"
          profileFontColor="white"
          type={profile?.rank}
          level={2}
          rankWidth={45}
          starWidth={6}
          className="absolute bottom-0"
        />
        {result ? (
          <div className="top-2 left-36 w-36 flex justify-center items-center">
            {profile.type.toLowerCase() === "success" ? (
              <>
                <VerifiedIcon
                  className={`flex items-center text-${profile.color} font-bold font35`}
                />
                <span className="text-green font18 font-bold">
                  {profile.type}
                </span>
              </>
            ) : (
              <>
                <DangerousIcon className="flex items-center text-red font-bold font35" />
                <span className="text-red font18 font-bold">
                  {profile.type}
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div className="  flex justify-end items-center col-span-1">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-1 text-white">
              <ThumbUpOffAltIcon className="font35 font-bold text-gray-200" />
              <span className="text-gray-200">{profile.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionHomes;
