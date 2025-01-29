import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const OptionHomes = ({ result, profile }: any) => {
  return (
    <div className="absolute top-0 w-full bg_options">
      <div className="grid grid-cols-3 mx-2 items-start">
        <div className="flex col-span-1 justify-start items-center">
          <div className="flex flex-col items-start gap-1">
            <div className="relative ">
              <img
                className="rounded-full"
                src={profile.img}
                width={50}
                height={50}
                alt="Profile"
              />
              <span className="absolute bottom-0 ">
                <img
                  className="right-0 bottom-0"
                  src={profile.rank}
                  width={25}
                  height={25}
                  alt="Rank"
                />
              </span>
            </div>
            <span className="font-bold text-black">
              {profile.username.length > 12
                ? `${profile.username.slice(0, 12)} ...`
                : profile.username}
            </span>
          </div>
        </div>
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
            <div className="flex items-center gap-1 text-black">
              <ThumbUpOffAltIcon className="font20 font-bold text-black" />
              <span>{profile.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionHomes;
