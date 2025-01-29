import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CommentIcon from "@mui/icons-material/Comment";
import gymW1 from "../../../assets/img/womenGym1.jpg";
import gymM1 from "../../../assets/img/menGym1.png";
import gymM2 from "../../../assets/img/menGym2.png";
import gymM3 from "../../../assets/img/gymM3.jpg";
import inv1 from "../../../assets/img/inv1.jpg";
import inv3 from "../../../assets/img/inv3.jpeg";
import cook1 from "../../../assets/img/cook1.jpg";
import cook2 from "../../../assets/img/cook2.jpg";
import cook3 from "../../../assets/img/cook3.jpg";
import cook4 from "../../../assets/img/cook4.jpg";
import inv5 from "../../../assets/img/inv5.jpg";
import Image from "../../../components/Image";
import rank1 from "../../assets/img/rank10.webp";
import rank2 from "../../assets/img/rank3.webp";
import rank3 from "../../../assets/img/rank5.webp";

const OptionWatchs: React.FC = ({
  parent,
  child,
  handleLiked,
  imgSrc,
  rankSrc,
  profileName,
}: any) => {
  const [likedVideos, setLikedVideos] = useState<any>(null);
  return (
    <div className="flex justify-between mx-3 items-center">
      <div className="flex gap-3 items-center">
        <div>
          <Image imgSrc={imgSrc} rankSrc={rankSrc} />
          <span className="font-bold text-white">
            {profileName.length > 12
              ? `${profileName.slice(0, 12)} ...`
              : profileName}
          </span>
        </div>
        <span className="p-2 text-white border cursor-pointer">Follow</span>
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
