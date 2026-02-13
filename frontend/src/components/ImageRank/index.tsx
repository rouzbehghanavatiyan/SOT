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
import ruby from "../../assets/ranks/ruby.png";
import gem from "../../assets/ranks/gem.png";
import word from "../../assets/ranks/worldMain.png";
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
  iconClass?: string;
}

const rankPositionSettings = {
  bronse: { bottom: "-20%", left: "-20%" },
  silver: { bottom: "-23%", left: "-23%" },
  gold: { bottom: "-23%", left: "-23%" },
  gem: { bottom: "-23%", left: "-23%" },
  ruby: { bottom: "-23%", left: "-23%" },
  word: { bottom: "-23%", left: "-23%" },
};

const ImageRank: React.FC<ProfileWithRankProps> = ({
  imgSrc,
  showProfile = true,
  userNameStyle,
  positionVideo,
  userName,
  iconClass = "text-gray-200 font40 w-full h-full rounded-full",
  score = -1,
  imgSize = 40,
  userInfo,
}) => {
  const [rankData, setRankData] = useState<{
    base: string;
    stars: number;
    starType: "bronse" | "silver" | "gold" | "gem" | "ruby" | "word" | "";
    displayNumber?: number;
  }>({ base: Started, stars: 0, starType: "" });
  const rankSize = Math.floor(imgSize * 0.6);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

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
      return { base: silver1, stars: 1, starType: "silver" as const };
    } else if (score >= 400 && score < 500) {
      return { base: silver2, stars: 2, starType: "silver" as const };
    } else if (score >= 500 && score < 600) {
      return { base: silver3, stars: 3, starType: "silver" as const };
    } else if (score >= 600 && score < 700) {
      return { base: gold1, stars: 1, starType: "gold" as const };
    } else if (score >= 700 && score < 800) {
      return { base: gold2, stars: 2, starType: "gold" as const };
    } else if (score >= 800 && score < 900) {
      return { base: gold3, stars: 3, starType: "gold" as const };
    } else if (score >= 900 && score < 1000) {
      return { base: ruby, stars: 1, starType: "ruby" as const };
    } else if (score >= 1000 && score < 1100) {
      return { base: ruby, stars: 2, starType: "ruby" as const };
    } else if (score >= 1100 && score < 1200) {
      return { base: ruby, stars: 3, starType: "ruby" as const };
    } else if (score >= 1200 && score < 1300) {
      return { base: ruby, stars: 1, starType: "ruby" as const };
    } else if (score >= 1300 && score < 1400) {
      return { base: ruby, stars: 2, starType: "ruby" as const };
    } else if (score >= 1400 && score < 1500) {
      return { base: ruby, stars: 3, starType: "ruby" as const };
    } else if (score >= 1500 && score < 1600) {
      return {
        base: word,
        stars: 1,
        starType: "word" as const,
        displayNumber: 900,
      };
    } else if (score >= 1600 && score < 1700) {
      return {
        base: word,
        stars: 1,
        starType: "word" as const,
        displayNumber: 850,
      };
    } else if (score >= 1700 && score < 1800) {
      return {
        base: word,
        stars: 2,
        starType: "word" as const,
        displayNumber: 800,
      };
    } else if (score >= 1800 && score < 1850) {
      return {
        base: word,
        stars: 2,
        starType: "word" as const,
        displayNumber: 750,
      };
    } else if (score >= 1850 && score < 1900) {
      return {
        base: word,
        stars: 3,
        starType: "word" as const,
        displayNumber: 700,
      };
    } else if (score >= 1900 && score < 1950) {
      return {
        base: word,
        stars: 3,
        starType: "word" as const,
        displayNumber: 650,
      };
    } else if (score >= 1950 && score < 2000) {
      return {
        base: word,
        stars: 3,
        starType: "word" as const,
        displayNumber: 600,
      };
    } else if (score >= 2000) {
      return {
        base: word,
        stars: 3,
        starType: "word" as const,
        displayNumber: 550,
      };
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

  const userImg = typeof imgSrc === "string" ? imgSrc : "";

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
        {!userImg ||
        userImg?.includes("undefined") ||
        imgSrc === "" ||
        imageError ||
        imgSrc === null ? (
          <AccountCircleIcon className={iconClass} />
        ) : (
          <img
            className="w-full h-full rounded-full object-cover"
            src={imgSrc}
            alt="Profile"
            onError={() => setImageError(true)}
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

            {rankData.starType === "word" && rankData.displayNumber && (
              <div className="rank-number">{rankData.displayNumber}</div>
            )}
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
