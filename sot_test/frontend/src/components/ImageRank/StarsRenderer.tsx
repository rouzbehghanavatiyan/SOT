import React from "react";
import bronseStar from "../../assets/ranks/bronseStar.png";
import silverStar from "../../assets/svg/silverStar.svg";
import goldStar from "../../assets/svg/goldStar.svg";

interface StarsRendererProps {
  starType: "bronse" | "silver" | "gold";
  stars: number;
  rankSize: number;
  starSize?: number; // سایز ستاره‌ها به صورت پویا
  customPositions?: { left: number; top: number; size?: number }[]; // تنظیمات موقعیت دلخواه
}

// تنظیمات پیش‌فرض سایز ستاره‌ها
const defaultStarSizes = {
  bronse: {
    small: 8,
    large: 13,
  },
  silver: {
    small: 60,
    large: 90,
  },
  gold: {
    small: 70,
    large: 100,
  },
};

const defaultStarPositions = {
  bronse: {
    oneStar: [{ left: 40, top: 36 }],
    twoStars: [
      { left: 40, top: 20 },
      { left: 60, top: 20 },
    ],
    threeStars: [
      { left: 43, top: 25 },
      { left: 34, top: 50 },
      { left: 55, top: 50 },
    ],
  },
  silver: {
    oneStar: [{ left: 50, top: 15 }],
    twoStars: [
      { left: 45, top: 15 },
      { left: 55, top: 15 },
    ],
    threeStars: [
      { left: 50, top: 5 },
      { left: 40, top: 40 },
      { left: 60, top: 40 },
    ],
  },
  gold: {
    oneStar: [{ left: 50, top: 10 }],
    twoStars: [
      { left: 45, top: 10 },
      { left: 55, top: 10 },
    ],
    threeStars: [
      { left: 50, top: 0 },
      { left: 40, top: 40 },
      { left: 60, top: 40 },
    ],
  },
};

const StarsRenderer: React.FC<StarsRendererProps> = ({
  starType,
  stars,
  rankSize,
  starSize,
  customPositions,
}) => {
  if (stars === 0) return null;

  const getStarImage = () => {
    switch (starType) {
      case "bronse":
        return bronseStar;
      case "silver":
        return silverStar;
      case "gold":
        return goldStar;
      default:
        return "";
    }
  };

  const starImage = getStarImage();

  // سایز ستاره‌ها (اگر `starSize` ارسال شود، از آن استفاده می‌شود)
  const smallStarSize = starSize || defaultStarSizes[starType].small;
  const largeStarSize = starSize
    ? starSize * 1.5
    : defaultStarSizes[starType].large;

  // موقعیت ستاره‌ها (اگر `customPositions` ارسال شود، از آن استفاده می‌شود)
  const defaultPositions = defaultStarPositions[starType];
  const starPositions =
    customPositions ||
    (stars === 1
      ? defaultPositions.oneStar
      : stars === 2
        ? defaultPositions.twoStars
        : defaultPositions.threeStars);

  return (
    <>
      {starPositions.map((pos, index) => (
        <img
          key={index}
          src={starImage}
          style={{
            position: "absolute",
            width: `${pos.size || (stars === 1 ? largeStarSize : smallStarSize)}px`, // اگر `size` موجود باشد از آن استفاده شود
            height: `${pos.size || (stars === 1 ? largeStarSize : smallStarSize)}px`,
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          alt="Star"
        />
      ))}
    </>
  );
};

export default StarsRenderer;
