import React, { useEffect, useState } from "react";
import silverRank from "../../assets/img/rank5.webp";
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

  const determineRank: void = () => {
    if (score === 0) {
      return silverRank;
    } else if (score > 0 && score < 10) {
      return silverRank;
    } else if (score > 20 && score < 30) {
    } else if (score > 10 && score < 20) {
      return silverRank;
    } else if (score > 30 && score < 40) {
      return silverRank;
    } else if (score > 40 && score < 50) {
      return silverRank;
    } else if (score > 50 && score < 60) {
      return silverRank;
    } else if (score > 60 && score < 70) {
      return silverRank;
    } else if (score > 70 && score < 80) {
      return silverRank;
    } else if (score > 80 && score < 90) {
      return silverRank;
    } else if (score > 90 && score < 100) {
      return silverRank;
    } else if (score > 100 && score < 110) {
      return silverRank;
    } else if (score > 110 && score < 120) {
      return silverRank;
    } else if (score > 120 && score < 130) {
      return silverRank;
    } else if (score > 130 && score < 140) {
      return silverRank;
    } else if (score > 140 && score < 150) {
      return silverRank;
    } else {
      return silverRank;
    }
  };

  useEffect(() => {
    setRankSrc(determineRank());
  }, [score]);

  const shortenUserName = (name: string | undefined): string => {
    if (!name) return "";
    return name.length > 15 ? `${name.slice(0, 15)}...` : name;
  };

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
          className={`ms-2 font-bold ${!userNameStyle ? "text-gray-800" : userNameStyle}`}
        >
          {shortenUserName(userName)}
        </span>
      )}
    </div>
  );
};

export default ImageRank;
