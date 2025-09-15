import React from "react";
import starRank from "../../assets/img/rank1.avif";
import goldPer1 from "../../assets/img/rank10.webp";
import goldStar2 from "../../assets/img/goldStar.webp";
import gold from "../../assets/img/rank3.webp";
import silverRank from "../../assets/img/rank8.webp";

interface RankProps {
  type?: "bronze" | "silver" | "gold";
  level?: 1 | 2 | 3;
  className?: string;
  starWidth?: number;
  starHeight?: number;
  rankWidth?: number;
  rankHeight?: number;
}

const Rank: React.FC<RankProps> = ({
  type = "bronze",
  level = 1,
  className,
  starWidth = 10,
  starHeight = 10,
  rankWidth = 50,
  rankHeight = 50,
}) => {
  const rankImage = type === "bronze" ? gold : type === "gold" ? goldPer1 : silverRank;

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
    <div className={`${className} z-10 flex flex-col justify-center w-7`}>
      <img
        className=""
        width={rankWidth}
        height={rankHeight}
        src={rankImage}
        alt="My Rank"
      />
      <span className="flex gap-1 justify-center">{stars}</span>
    </div>
  );
};

export default Rank;