import React from "react";

interface PropTypes {
  onFollowClick: any;
  title: string;
  bgColor: string;
}

const Follows: React.FC<PropTypes> = ({
  onFollowClick,
  title,
  bgColor = "bg-orange-ghost",
}) => {
  return (
    <div className="flex  justify-center items-center">
      <span
        onClick={onFollowClick}
        className={`p-1 border-b-2 px-3 ${bgColor}  text-white font-bold font12  text-dark rounded-lg cursor-pointer `}
      >
        {title}
      </span>
    </div>
  );
};

export default Follows;
