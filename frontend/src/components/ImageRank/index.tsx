import React, { useEffect, useState } from "react";
import Started from "../../assets/ranks/start_question.png";
import Bronze3 from "../../assets/ranks/Bronze_3.png";
import bronseBase from "../../assets/ranks/bronseBase.png";
import silverbase from "../../assets/ranks/silverbase.png";
import goldBase from "../../assets/ranks/goldBase.png";
import bronseStar from "../../assets/svg/bronseStar.svg";
import silverStar from "../../assets/svg/silverStar.svg";
import goldStar from "../../assets/svg/goldStar.svg";
import Gold3 from "../../assets/ranks/Gold_3.png";
import wordOne from "../../assets/ranks/wordOne.png";
import emerald from "../../assets/ranks/emerald.png";
import gem from "../../assets/ranks/gem.png";
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
  const [rankData, setRankData] = useState<{
    base: string;
    stars: number;
    starType: string;
  }>({ base: Started, stars: 0, starType: "" });
  const rankSize = Math.floor(imgSize * 0.6);
  const navigate = useNavigate();

  const determineRank = () => {
    if (score === 0) {
      return { base: Bronze3, stars: 0, starType: "" };
    } else if (score > 0 && score < 100) {
      return { base: bronseBase, stars: 1, starType: "bronse" };
    } else if (score >= 100 && score < 200) {
      return { base: bronseBase, stars: 2, starType: "bronse" };
    } else if (score >= 200 && score < 300) {
      return { base: bronseBase, stars: 3, starType: "bronse" };
    } else if (score >= 300 && score < 400) {
      return { base: silverbase, stars: 1, starType: "silver" };
    } else if (score >= 400 && score < 500) {
      return { base: silverbase, stars: 2, starType: "silver" };
    } else if (score >= 500 && score < 600) {
      return { base: silverbase, stars: 3, starType: "silver" };
    } else if (score >= 600 && score < 700) {
      return { base: goldBase, stars: 1, starType: "gold" };
    } else if (score >= 700 && score < 800) {
      return { base: goldBase, stars: 2, starType: "gold" };
    } else if (score >= 800 && score < 900) {
      return { base: goldBase, stars: 3, starType: "gold" };
    } else {
      return { base: Started, stars: 0, starType: "" };
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

  const getStarImage = () => {
    switch (rankData.starType) {
      case "bronse":
        return bronseStar;
      case "silver":
        return silverStar;
      case "gold":
        return goldStar;
      default:
        return "";
    }
  };

  const renderStars = () => {
    if (rankData.stars === 0) return null;

    const starImage = getStarImage();
    const starSize = rankSize * 0.12;
    const largeStarSize = rankSize * 0.25;
    const baseCenter = rankSize / 2;
    const starCenter = starSize / 2;
    const largeStarCenter = largeStarSize / 3;

    const positions = [];
    if (rankData.stars === 1) {
      positions.push({
        left: baseCenter - largeStarCenter - starSize * 0.2,
        top: baseCenter - largeStarCenter - largeStarSize * 0.9,
        size: largeStarSize,
      });
    } else if (rankData.stars === 2) {
      positions.push({
        left: baseCenter - starCenter - starSize * 0.5,
        top: baseCenter - starCenter - starSize * 1.4,
        size: starSize,
      });
      positions.push({
        left: baseCenter - starCenter + starSize * 0.8,
        top: baseCenter - starCenter - starSize * 1.4,
        size: starSize,
      });
    } else if (rankData.stars === 3) {
      positions.push({
        left: baseCenter - largeStarCenter - starSize * 0.2,
        top: baseCenter - largeStarCenter - largeStarSize * 1.2,
        size: largeStarSize,
      });

      positions.push({
        left: baseCenter - starCenter - starSize * 0.5,
        top: baseCenter - starCenter - starSize * 0.7,
        size: starSize,
      });
      positions.push({
        left: baseCenter - starCenter + starSize * 0.8,
        top: baseCenter - starCenter - starSize * 0.7,
        size: starSize,
      });
    } else if (rankData.stars === 4) {
      positions.push({
        left: baseCenter - starCenter - starSize * 0.4,
        top: baseCenter - starCenter - starSize * 0.8,
        size: starSize,
      });
      positions.push({
        left: baseCenter - starCenter + starSize * 0.7,
        top: baseCenter - starCenter - starSize * 0.8,
        size: starSize,
      });
      positions.push({
        left: baseCenter - starCenter + starSize * 0.7,
        top: baseCenter - starCenter - starSize * 2,
        size: starSize,
      });
      positions.push({
        left: baseCenter - starCenter - starSize * 0.4,
        top: baseCenter - starCenter - starSize * 2,
        size: starSize,
      });
    }

    return positions.map((pos, index) => (
      <img
        key={index}
        src={starImage}
        style={{
          position: "absolute",
          width: `${pos.size}px`,
          height: `${pos.size}px`,
          left: `${pos.left}px`,
          top: `${pos.top}px`,
        }}
        alt="Star"
      />
    ));
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
              src={rankData.base}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
              alt="Rank"
            />
            {renderStars()}
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
