import React from "react";

interface PropType {
  title: string;
}

const MainTitle: React.FC<PropType> = ({ title }) => {
  return (
    <div className="font-bold  bg-gray-100 py-2">
      <span className="ms-2 font20 text-gray-200">{title}</span>
    </div>
  );
};

export default MainTitle;
