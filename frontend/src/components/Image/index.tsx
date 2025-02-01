import React from "react";
import Rank from "../Rank";
interface ImageProps {
  imgSrc: string; // آدرس تصویر پروفایل
  rankSrc: string; // آدرس تصویر رنک
  profileName?: string; // نام پروفایل (اختیاری)
  type?: "bronze" | "silver" | "gold";
  level?: 1 | 2 | 3;
  className?: string;
  starWidth?: number;
  starHeight?: number;
  rankWidth?: number;
  rankHeight?: number;

}

const Image: React.FC<ImageProps> = ({
  imgSrc,
  profileName = "profileName",
  className,
}) => {
  return (
    <div className={`${className} flex`}>
      <div className=" " >
        <img
          className="rounded-full"
          src={imgSrc}
          width={45}
          height={45}
          alt="Profile"
        />
      </div>
      <span className="font-bold ms-1">
        {profileName.length > 12
          ? `${profileName.slice(0, 12)} ...`
          : profileName}
      </span>
    </div>
  );
};

export default Image;
