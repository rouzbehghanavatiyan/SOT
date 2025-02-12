import React from "react";
import Image from "../../../components/Image";
import ImageRank from "../../../components/ImageRank";
import Like from "../../../components/Like";

const OptionShow: React.FC = () => {
  return (
    <div className="flex mx-2 items-center justify-between  ">
      <ImageRank />
      <ThumbUpOffAltIcon className="font35 font-bold text-white" />
    </div>
  );
};

export default OptionShow;
