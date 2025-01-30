import React from "react";
import starRank from "../../assets/img/rank1.avif";
import goldPer1 from "../../assets/img/rank10.webp";
import bronze3 from "../../assets/img/rank11.webp";
import gold1 from "../../assets/img/rank3.webp";
import blue4 from "../../assets/img/rank4.png";
import white1 from "../../assets/img/rank5.webp";
import purple1 from "../../assets/img/rank6.webp";
import goldSircle1 from "../../assets/img/rank7.webp";
import silver2 from "../../assets/img/rank8.webp";
import silverPer2 from "../../assets/img/rank9.webp";
import silverSircle2 from "../../assets/img/silverRank2.jpg";

const Rank: React.FC = ({
  starWidth = 15,
  starHeight = 15,
  rankWidth = 50,
  rankHeight = 50,
}: any) => {
  return (
    <span className="bg-red">
      <img width={rankWidth} height={rankHeight} src={goldPer1} alt="My Rank" />
      <span className="flex mt-1 bg-blue gap-1">
        <img
          className="rounded-full shadow-lg"
          width={starWidth}
          height={starHeight}
          src={starRank}
          alt="My Rank"
        />
        <img
          className="rounded-full shadow-lg"
          width={starWidth}
          height={starHeight}
          src={starRank}
          alt="My Rank"
        />
        <img
          className="rounded-full shadow-lg"
          width={starWidth}
          height={starHeight}
          
          src={starRank}
          alt="My Rank"
        />
      </span>
    </span>
  );
};

export default Rank;
