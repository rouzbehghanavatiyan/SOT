import React, { useEffect, useState } from "react";
import Started from "../../assets/ranks/start_question.png";
import bronseBase1 from "../../assets/ranks/bronze-1.png";
import bronseBase2 from "../../assets/ranks/bronze-2.png";
import bronseBase3 from "../../assets/ranks/bronze-3.png";
import silver1 from "../../assets/ranks/silver-1.png";
import silver2 from "../../assets/ranks/silver-2.png";
import silver3 from "../../assets/ranks/silver-3.png";
import gold1 from "../../assets/ranks/gold-1.png";
import gold2 from "../../assets/ranks/gold-2.png";
import gold3 from "../../assets/ranks/gold-3.png";
import silverbase from "../../assets/ranks/silverBase2.png";
import goldBase from "../../assets/ranks/goldBase.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

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

const rankPositionSettings = {
  bronse: { bottom: "-20%", left: "-20%" },
  silver: { bottom: "-25%", left: "-25%" },
  gold: { bottom: "-30%", left: "-30%" },
};

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
  const [rankData, setRankData] = useState<{
    base: string;
    stars: number;
    starType: "bronse" | "silver" | "gold" | "";
  }>({ base: Started, stars: 0, starType: "" });
  const rankSize = Math.floor(imgSize * 0.6);
  const navigate = useNavigate();

  const determineRank = () => {
    if (score === 0) {
      return { base: bronseBase1, stars: 1, starType: "bronse" as const };
    } else if (score > 0 && score < 100) {
      return { base: bronseBase1, stars: 1, starType: "bronse" as const };
    } else if (score >= 100 && score < 200) {
      return { base: bronseBase2, stars: 2, starType: "bronse" as const };
    } else if (score >= 200 && score < 300) {
      return { base: bronseBase3, stars: 3, starType: "bronse" as const };
    } else if (score >= 300 && score < 400) {
      return { base: silverbase, stars: 1, starType: "silver" as const };
    } else if (score >= 400 && score < 500) {
      return { base: silverbase, stars: 2, starType: "silver" as const };
    } else if (score >= 500 && score < 600) {
      return { base: silverbase, stars: 3, starType: "silver" as const };
    } else if (score >= 600 && score < 700) {
      return { base: goldBase, stars: 1, starType: "gold" as const };
    } else if (score >= 700 && score < 800) {
      return { base: goldBase, stars: 2, starType: "gold" as const };
    } else if (score >= 800 && score < 900) {
      return { base: goldBase, stars: 3, starType: "gold" as const };
    } else {
      return { base: Started, stars: 0, starType: "" as const };
    }
  };

  useEffect(() => {
    setRankData(determineRank());
  }, [score]);

  const shortenUserName = (name: string | undefined): string => {
    if (!name) return "";
    return name.length > 15 ? `${name.slice(0, 15)}...` : name;
  };

  const handleClick = () => {
    if (!showProfile) return;

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
      onClick={handleClick}
      className="flex items-center m-1 relative cursor-pointer"
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
        {score >= 0 && rankData.starType && (
          <div
            className=""
            style={{
              position: "absolute",
              bottom: rankPositionSettings[rankData.starType]?.bottom,
              left: rankPositionSettings[rankData.starType]?.left,
              width: `${rankSize}px`,
              height: `${rankSize}px`,
              zIndex: 10,
            }}
          >
            <img
              src={rankData.base}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
              alt="Rank"
            />
          </div>
        )}
      </div>
      {userName && (
        <span
          className={`ms-2 font-bold ${
            !userNameStyle ? "text-gray-800" : userNameStyle
          }`}
        >
          {shortenUserName(userName)}
        </span>
      )}
    </div>
  );
};

export default ImageRank;
