import React, { useEffect, useState } from "react";
import per_bronze_3 from "../../assets/ranks/per_bronze_3.webp";
import normal_gold_3 from "../../assets/ranks/normal_gold_3.png";
import silverRank from "../../assets/img/rank5.webp";
import goldRank1 from "../../assets/img/rank7.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface ProfileWithRankProps {
  imgSrc?: string | any;
  userName?: string;
  score?: number;
  imgSize?: number;
  userNameStyle?: string;
}

const ImageRank: React.FC<ProfileWithRankProps> = ({
  imgSrc,
  userNameStyle,
  userName,
  score = -1,
  imgSize = 40,
}) => {
  const [rankSrc, setRankSrc] = useState<string>("");
  const rankSize = Math.floor(imgSize * 0.6);

  const determineRank = () => {
    if (score === 0) {
      return per_bronze_3;
    } else if (score >= 10 && score < 20) {
      return silverRank;
    } else if (score >= 20 && score < 30) {
      return goldRank1;
    } else {
      return normal_gold_3;
    }
  };

  useEffect(() => {
    setRankSrc(determineRank());
  }, [score]);

  return (
    <div
      className="flex items-center  m-1 relative"
      style={{ height: `${imgSize}px` }}
    >
      <div
        className="relative"
        style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
      >
        {!imgSrc ||
        imgSrc?.includes("undefined") ||
        imgSrc === "" ||
        imgSrc === null ? (
          <AccountCircleIcon
            className="text-gray-200 w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        ) : (
          <img
            className="rounded-full object-cover"
            src={imgSrc}
            style={{
              width: "100%",
              height: "100%",
            }}
            alt="Profile"
          />
        )}

        {score >= 0 && (
          <div
            style={{
              position: "absolute",
              bottom: `-${rankSize * 0.3}px`,
              left: `-${rankSize * 0.3}px`,
              width: `${rankSize}px`,
              height: `${rankSize}px`,
              zIndex: 10,
            }}
          >
            <img
              className="rounded-full  object-cover"
              src={rankSrc}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="Rank"
            />
          </div>
        )}
      </div>
      {userName && (
        <span
          className={`ms-2 font-bold ${!userNameStyle ? "text-gray-200" : userNameStyle}`}
          style={{ fontSize: `${Math.max(12, imgSize * 0.35)}px` }}
        >
          {userName}
        </span>
      )}
    </div>
  );
};

export default ImageRank;
