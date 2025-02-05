import React, { useEffect, useState } from "react";
import goldPer1 from "../../assets/img/rank10.webp";
import goldStar2 from "../../assets/img/goldStar.webp";
import silverRank from "../../assets/img/rank8.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
interface ProfileWithRankProps {
  imgSrc: string;
  profileName?: string;
  profileFontColor?: string;
  score?: number;
  className?: string;
  starWidth?: number;
  starHeight?: number;
  rankWidth?: number;
  rankHeight?: number;
  showBackground?: boolean;
}

const ImageRank: React.FC<ProfileWithRankProps> = ({
  imgSrc,
  showBackground = false,
  profileName = "profileName",
  profileFontColor = "white",
  score = 1,
  className = "",
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
          className="rounded-full shadow-lg"
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
          className="rounded-full shadow-lg"
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
          className="rounded-full shadow-lg"
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
    <span
      className={`${className} ${
        showBackground ? "bg_profile" : ""
      } block top-0 w-full h-[76px]`}
    >
      <span className="relative h-16 flex">
        <div className="flex ms-1 items-center">
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
        <div className="z-10 absolute bottom-0 justify-center w-7">
          <img
            width={rankWidth}
            height={rankHeight}
            src={rankSrc}
            alt="My Rank"
          />
          <span className="flex gap-1 justify-center">{stars}</span>
        </div>
      </span>
    </span>
  );
};

export default ImageRank;
