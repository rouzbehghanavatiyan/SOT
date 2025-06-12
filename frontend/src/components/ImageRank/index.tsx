import React, { useEffect, useState } from "react";
import goldPer1 from "../../assets/img/rank10.webp";
import goldStar2 from "../../assets/img/rank11.webp";
import silverRank from "../../assets/img/rank8.webp";
import ranktest from "../../assets/img/rank9.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  iconProfileStyle?: string;
  imgSize?: number;
  rankStyle?: string | boolean;
}

const ImageRank: React.FC<ProfileWithRankProps> = ({
  imgSrc,
  rankStyle,
  userName,
  iconProfileStyle,
  classUserName = "white",
  score = 1,
  starWidth = 10,
  starHeight = 10,
  imgSize = 40,
}) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);
  const [rankSrc, setRankSrc] = useState<string>(goldPer1);

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
      <div className="flex items-center">
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
          <span className={`ms-1 ${classUserName}`}>{userName}</span>
        )}
      </div>
      {!!rankStyle && (
        <div className={`absolute h-2 bottom-3 left-0 z-10 justify-center`}>
          <img className={rankStyle} src={ranktest} alt="My Rank" />
          {/* <span className="flex gap-1 justify-center">{stars}</span> */}
        </div>
      )}
    </div>
  );
};

export default ImageRank;
