import React from "react";

interface PropTypes {
  onClick: any;
  title: string;
  bgColor: string;
}

const Follows: React.FC<PropTypes> = ({
  onClick,
  title,
  bgColor = "bg-orange-ghost",
}) => {
  return (
    <div className="flex justify-center items-center">
      <span
        onClick={onClick}
        className={`p-1 px-3 ${bgColor}  text-mainBlack-dark  text-dark rounded-lg cursor-pointer `}
      >
        {title}
      </span>
    </div>
  );
};

export default Follows;
