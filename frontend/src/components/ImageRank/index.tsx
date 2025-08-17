import React, { useEffect, useState } from "react";
import Started from "../../assets/ranks/start_question.png";
import Bronze3 from "../../assets/ranks/Bronze_3.png";
import Gold3 from "../../assets/ranks/Gold_3.png";
import wordOne from "../../assets/ranks/wordOne.png";
import emerald from "../../assets/ranks/emerald.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";

interface ProfileWithRankProps {
  userInfo?: any;
  imgSrc?: string | any;
  userName?: string;
  score?: number;
  imgSize?: number;
  userNameStyle?: string;
  positionVideo?: number;
  showProfile?: boolean;
}

const ImageRank: React.FC<ProfileWithRankProps> = ({
  imgSrc,
  showProfile = true,
  userNameStyle,
  positionVideo,
  userName,
  score = -1,
  imgSize = 40,
  userInfo,
}) => {
  const [rankSrc, setRankSrc] = useState<string>("");
  const main = useAppSelector((state) => state?.main);
  const rankSize = Math.floor(imgSize * 0.6);
  const navigate = useNavigate();

  const determineRank: any = () => {
    if (score === 0) {
      return Bronze3;
    } else if (score > 0 && score < 100) {
      return Gold3;
    } else if (score > 100 && score < 200) {
      return emerald;
    } else if (score > 200 && score < 300) {
      return wordOne;
    } else if (score > 300 && score < 400) {
      return Bronze3;
    } else if (score > 40 && score < 50) {
      return Bronze3;
    } else if (score > 50 && score < 60) {
      return Bronze3;
    } else if (score > 60 && score < 70) {
      return Bronze3;
    } else if (score > 70 && score < 80) {
      return Bronze3;
    } else if (score > 80 && score < 90) {
      return Bronze3;
    } else if (score > 90 && score < 100) {
      return Bronze3;
    } else if (score > 100 && score < 110) {
      return Bronze3;
    } else if (score > 110 && score < 120) {
      return Bronze3;
    } else if (score > 120 && score < 130) {
      return Bronze3;
    } else if (score > 130 && score < 140) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else if (score > 140 && score < 150) {
      return Started;
    } else {
      return Started;
    }
  };

  useEffect(() => {
    setRankSrc(determineRank());
  }, [score]);

  const shortenUserName = (name: string | undefined): string => {
    if (!name) return "";
    return name.length > 15 ? `${name.slice(0, 15)}...` : name;
  };

  const handleClick = () => {
    console.log(userInfo);

    const userData = {
      profile:
        positionVideo === 0
          ? userInfo?.profileInserted
          : positionVideo === 1
            ? userInfo?.profileMatched
            : userInfo?.userProfile,
      user:
        positionVideo === 0
          ? userInfo?.userInserted
          : positionVideo === 1
            ? userInfo?.userMatched
            : userInfo?.user,
      score:
        positionVideo === 0
          ? userInfo?.scoreInserted
          : positionVideo === 1
            ? userInfo?.scoreMatched
            : userInfo?.score,
    };
    navigate(`/profile`, {
      state: {
        userData,
      },
    });
  };

  return (
    <div
      onClick={showProfile ? handleClick : null}
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
