import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Image from "../../../components/Image";

const OptionHomes = ({ result, profile }: any) => {
  return (
    <div className="w-full bg-black">
      <div className="grid grid-cols-3 m-2 items-start">
        <Image imgSrc={profile?.img} rankSrc={profile?.rank} />
        {result ? (
          <div className="col-span-1 flex justify-center items-center">
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
              <ThumbUpOffAltIcon className="font35 font-bold text-white" />
              <span>{profile.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionHomes;
