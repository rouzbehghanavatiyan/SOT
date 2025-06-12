import React, { useEffect, useState } from "react";
import per_bronze_3 from "../../assets/ranks/per_bronze_3.webp";
import normal_silver_1 from "../../assets/ranks/normal_silver_1.webp";
import normal_silver_2 from "../../assets/ranks/normal_silver_2.webp";
import per_gold_1 from "../../assets/ranks/per_gold_1.webp";
import normal_gold_3 from "../../assets/ranks/normal_gold_3.png";
import silverRank from "../../assets/img/rank5.webp";
import goldRank1 from "../../assets/img/rank7.webp";
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
  rankStyle?: any;
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
  const [rankSrc, setRankSrc] = useState<string>(per_bronze_3);

  const fixScore = () => {
    let newRankSrc: string;
    let newStars: JSX.Element[];
    if (score >= 0 && score < 10) {
      newRankSrc = per_bronze_3;
      newStars = Array(1).fill(
        <img
          className="rounded-full  shadow-lg"
          style={{ width: `${starWidth}px`, height: `${starHeight}px` }}
          src={per_bronze_3}
          alt="Star"
        />
      );
    } else if (score >= 10 && score < 20) {
      newRankSrc = silverRank;
      newStars = Array(2).fill(
        <img
          className="rounded-full  shadow-lg"
          style={{ width: `${starWidth}px`, height: `${starHeight}px` }}
          src={normal_silver_1}
          alt="Star"
        />
      );
    } else if (score >= 20 && score < 30) {
      newRankSrc = goldRank1;
      newStars = Array(2).fill(
        <img
          className="rounded-full  shadow-lg"
          style={{ width: `${starWidth}px`, height: `${starHeight}px` }}
          src={normal_silver_2}
          alt="Star"
        />
      );
    } else {
      newRankSrc = normal_gold_3;
      newStars = Array(3).fill(
        <img
          className="rounded-full  shadow-lg"
          style={{ width: `${starWidth}px`, height: `${starHeight}px` }}
          src={per_gold_1}
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
        <div className={`absolute h-4 bottom-0 left-0 z-10 justify-center`}>
          <img className={rankStyle} src={rankSrc} alt="My Rank" />
          {/* <span className="flex gap-1 justify-center">{stars}</span> */}
        </div>
      )}
    </div>
  );
};

export default ImageRank;
