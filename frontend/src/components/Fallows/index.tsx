import React from "react";

interface PropTypes {
  onFollowClick: any;
  title: string;
  bgColor: string;
}

const Follows: React.FC<PropTypes> = ({
  onFollowClick,
  title,
  bgColor = "text-white",
}) => {
  return (
    <div className="flex  justify-center items-center">
      <span
        onClick={onFollowClick}
        className={`p-1 border-b-[1px] px-3 ${bgColor} border-gray-200 rounded-lg font-bold font12 cursor-pointer `}
      >
        {title}
      </span>
    </div>
  );
};

export default Follows;
