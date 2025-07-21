import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Image from "../../../components/Image";

const OptionWatchs: React.FC<any> = ({
  parent,
  child,
  handleLiked,
  imgSrc,
  rankSrc,
  profileName,
}: any) => {
  const [likedVideos, setLikedVideos] = useState<any>(null);
  return (
    <div className="flex justify-between mx-3  items-center">
      <div className="flex gap-3 items-center ">
        <div className="">
          <Image profileName={profileName} imgSrc={imgSrc} rankSrc={rankSrc} />
        </div>
        <span className="p-2  text-white border cursor-pointer">Follow</span>
        {/* <MoreVertIcon className="text-white font25 cursor-pointer" /> */}
      </div>

      <div className="flex ">
        <ThumbUpOffAltIcon
          className={`font35 cursor-pointer transition-transform duration-300 ${likedVideos ? "text-blue" : "text-white"}`}
          onClick={() => handleLiked(parent?.movieId)}
        />
        {/* <FlareIcon className="text-white font25 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default OptionWatchs;
