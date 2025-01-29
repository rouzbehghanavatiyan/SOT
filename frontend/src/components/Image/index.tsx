import React from "react";

const Image: React.FC = ({ imgSrc, rankSrc }: any) => {
  return (
    <div className="relative ">
      <img
        className="rounded-full"
        src={imgSrc}
        width={50}
        height={50}
        alt="Profile"
      />
      <span className="absolute bottom-0 ">
        <img
          className="right-0 bottom-0"
          src={rankSrc}
          width={25}
          height={25}
          alt="Rank"
        />
      </span>
    </div>
  );
};

export default Image;
