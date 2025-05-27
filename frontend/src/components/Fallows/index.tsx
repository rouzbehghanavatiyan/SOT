import React from "react";
import { addFollower } from "../../services/dotNet";

interface PropTypes {
  onClick: any;
  title: string;
  bgColor: string;
  handleFollow: any;
}

const Follows: React.FC<PropTypes> = ({
  onClick,
  title,
  bgColor = "bg-orange-ghost",
  handleFollow,
}) => {
  const handleAddFollow = async () => {
    const postData = {
      userId: 1,
      followerId: 2,
    };
    const res = await addFollower(postData);
  };

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
