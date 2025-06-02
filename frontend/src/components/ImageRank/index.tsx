import React, { useEffect, useState } from "react";
import goldPer1 from "../../assets/img/rank10.webp";
import goldStar2 from "../../assets/img/Silver.png";
import silverRank from "../../assets/img/rank8.webp";
import ranktest from "../../assets/img/Silver.png";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAppSelector } from "../../hooks/hook";

interface ProfileWithRankProps {
  imgSrc?: string | any;
  classUserName?: string;
  userName?: any;
  score?: number;
  className?: string;
  starWidth?: number;
  starHeight?: number;
  rankWidth?: number;
  rankHeight?: number;
  showRank?: boolean;
  iconProfileStyle?: string;
  imgSize?: number; // New prop for base image size
}

const ImageRank: React.FC<ProfileWithRankProps> = ({
  imgSrc,
  showRank = true,
  userName,
  iconProfileStyle,
  classUserName = "white",
  score = 1,
  starWidth = 10,
  starHeight = 10,
  imgSize = 40, // Default base size for the profile image
}) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);
  const [rankSrc, setRankSrc] = useState<string>(goldPer1);

  // Calculate proportional sizes
  const userNameWidth = imgSize / 3;
  const rankSize = imgSize / 2;

  const fixScore = () => {
    let newRankSrc: string;
    let newStars: JSX.Element[];
    if (score >= 0 && score < 10) {
      newRankSrc = goldPer1;
      newStars = Array(1).fill(
        <img
          className="rounded-full  shadow-lg"
          style={{ width: `${starWidth}px`, height: `${starHeight}px` }}
          src={goldStar2}
          alt="Star"
        />
      );
    } else if (score >= 10 && score < 20) {
      newRankSrc = silverRank;
      newStars = Array(2).fill(
        <img
          className="rounded-full  shadow-lg"
          style={{ width: `${starWidth}px`, height: `${starHeight}px` }}
          src={goldStar2}
          alt="Star"
        />
      );
    } else {
      newRankSrc = goldPer1;
      newStars = Array(3).fill(
        <img
          className="rounded-full  shadow-lg"
          style={{ width: `${starWidth}px`, height: `${starHeight}px` }}
          src={goldStar2}
          alt="Star"
        />
      );
    }

    setRankSrc(newRankSrc);
    setStars(newStars);
  };

  useEffect(() => {
    fixScore();
  }, [score, starWidth, starHeight]);

  return (
    <div className="flex relative" style={{ height: `${imgSize}px` }}>
      <div className="flex ms-1 items-center">
        {!imgSrc || imgSrc.includes("undefined") || imgSrc === "" ? (
          <AccountCircleIcon className={iconProfileStyle} />
        ) : (
          <img
            className="rounded-full"
            src={imgSrc}
            style={{
              width: `${imgSize}px`,
              height: `${imgSize}px`,
            }}
            alt="Profile"
          />
        )}
        {userName && (
          <span
            className={`ms-1 ${classUserName}`}
            style={{
              fontSize: `${userNameWidth * 0.7}px`, // Adjust font size proportionally
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {userName}
          </span>
        )}
      </div>
        <div
          className="absolute bottom-0 left-0 z-10 justify-center"
          style={{ width: `${rankSize}px` }}
        >
          <img
            // style={{
            //   width: `${rankSize}px`,
            //   height: `${rankSize}px`,
            // }}
            className="h-10 w-10"
            src={ranktest}
            alt="My Rank"
          />
          {/* <span className="flex gap-1 justify-center">{stars}</span> */}
        </div>
    </div>
  );
};

export default ImageRank;
