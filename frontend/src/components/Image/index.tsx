import React from "react";

const Image: React.FC = ({
  imgSrc,
  rankSrc,
  profileName = "profileName",
}: any) => {
  return (
    <div className="relative  flex">
      <div>
        <img
          className="rounded-full"
          src={imgSrc}
          width={60}
          height={60}
          alt="Profile"
        />
        <img
          className="absolute bottom-0 left-0"
          src={rankSrc}
          width={30}
          height={30}
          alt="Rank"
        />
      </div>

      <span className="font-bold ms-1 text-white">
        {profileName.length > 12
          ? `${profileName.slice(0, 12)} ...`
          : profileName}
      </span>
    </div>
  );
};

export default Image;
