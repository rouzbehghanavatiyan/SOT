import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const OptionWatchs: React.FC = ({ parent, child, handleLiked }: any) => {
  const [likedVideos, setLikedVideos] = useState<any>(null);
  return (
    <div className="flex   justify-between mx-3 items-center mt-4">
      <div className="flex gap-4 ">
        <ThumbUpOffAltIcon
          className={`font35 cursor-pointer transition-transform duration-300 ${likedVideos ? "text-blue" : "text-white"}`}
          onClick={() => handleLiked(parent?.movieId)}
        />
        {/* <FlareIcon className="text-white font25 cursor-pointer" /> */}
      </div>
      <div className="flex items-center">
        <span className="p-2 text-white border cursor-pointer">Follow</span>
        {/* <MoreVertIcon className="text-white font25 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default OptionWatchs;
