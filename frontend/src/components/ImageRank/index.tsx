import React from "react";
import starRank from "../../assets/img/rank1.avif";
import goldPer1 from "../../assets/img/rank10.webp";
import goldStar2 from "../../assets/img/goldStar.webp";
import gold from "../../assets/img/rank3.webp";
import silverRank from "../../assets/img/rank8.webp";

interface ProfileWithRankProps {
  imgSrc: string;
  rankSrc?: string;
  profileName?: string;
  profileFontColor?: string;
  type?: "bronze" | "silver" | "gold";
  level?: 1 | 2 | 3;
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
  type = "bronze",
  level = 1,
  className = "",
  starWidth = 10,
  starHeight = 10,
  rankWidth = 50,
  rankHeight = 50,
}) => {
  const rankImage =
    type === "bronze" ? gold : type === "gold" ? goldPer1 : silverRank;

  const stars = Array(level).fill(
    <img
      className="rounded-full shadow-lg"
      width={starWidth}
      height={starHeight}
      src={goldStar2}
      alt="Star"
    />
  );

  return (
    <span
      className={`${className} ${showBackground && "bg_profile"} block top-0 w-full h-[76px]`}
    >
      <span className="relative h-16 flex  ">
        <div className="flex items-center">
          <img
            className="rounded-full"
            src={imgSrc}
            width={45}
            height={45}
            alt="Profile"
          />
          <span className={`font-bold text-${profileFontColor} ms-1`}>
            {profileName.length > 12
              ? `${profileName.slice(0, 12)} ...`
              : profileName}
          </span>
        </div>
        <div className="z-10 absolute bottom-0 justify-center w-7">
          <img
            className=""
            width={rankWidth}
            height={rankHeight}
            src={rankImage}
            alt="My Rank"
          />
          <span className="flex gap-1 justify-center">{stars}</span>
        </div>
      </span>
    </span>
  );
};

export default ImageRank;
