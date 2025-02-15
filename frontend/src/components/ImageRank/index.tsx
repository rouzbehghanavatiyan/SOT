import React, { useEffect, useState } from "react";
import goldPer1 from "../../assets/img/rank10.webp";
import goldStar2 from "../../assets/img/goldStar.webp";
import silverRank from "../../assets/img/rank8.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
interface ProfileWithRankProps {
  imgSrc?: string;
  profileName?: string;
  profileFontColor?: string;
  score?: number;
  className?: string;
  starWidth?: number;
  starHeight?: number;
  rankWidth?: number;
  rankHeight?: number;
}

const ImageRank: React.FC<ProfileWithRankProps> = ({
  imgSrc,
  profileName = "profileName",
  profileFontColor = "white",
  score = 1,
  starWidth = 10,
  starHeight = 10,
  rankWidth = 50,
  rankHeight = 50,
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
          className="rounded-full shadow-lg w-2"
          width={starWidth}
          height={starHeight}
          src={goldStar2}
          alt="Star"
        />
      );
    } else if (score >= 10 && score < 20) {
      newRankSrc = silverRank;
      newStars = Array(2).fill(
        <img
          className="rounded-full shadow-lg w-2"
          width={starWidth}
          height={starHeight}
          src={goldStar2}
          alt="Star"
        />
      );
    } else {
      newRankSrc = goldPer1;
      newStars = Array(3).fill(
        <img
          className="rounded-full shadow-lg w-2"
          width={starWidth}
          height={starHeight}
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
    <div className="flex relative h-16">
      <div className="flex ms-1 items-center ">
        {imgSrc ? (
          <img
            className="rounded-full"
            src={imgSrc}
            width={45}
            height={45}
            alt="Profile"
          />
        ) : (
          <AccountCircleIcon className="text-gray-200 bg-white rounded-full font40" />
        )}
        <span className={`font-bold text-${profileFontColor} ms-1`}>
          {profileName.length > 12
            ? `${profileName.slice(0, 12)}...`
            : profileName}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 z-10 justify-center w-7">
        <img
          width={rankWidth}
          height={rankHeight}
          src={rankSrc}
          alt="My Rank"
        />
        <span className="flex gap-1 justify-center">{stars}</span>
      </div>
    </div>
  );
};

export default ImageRank;
