import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <div
      className={` fixed inset-0 flex justify-center items-center transition-opacity z-50 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-primary border w-24 h-24 flex justify-center items-center shadow-xl rounded-lg">
        <div className="lds-dual-ring w-16 h-16 "></div>
      </div>
    </div>
  );
};

export default Loading;
