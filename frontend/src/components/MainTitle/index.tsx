import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PropType {
  title: string;
  handleBack?: () => void;
}

const MainTitle: React.FC<PropType> = ({ title, handleBack }) => {
  return (
    <div className=" grid grid-cols-3 bg-gray-150 py-2 mt-6">
      <span className="col-span-1 ms-6 flex items-center">
        {handleBack && (
          <ArrowBackIcon onClick={handleBack} className="text-primary font25" />
        )}
      </span>
      <span className="ms-2 font20 col-span-1 flex justify-center items-center text-gray-800">
        {title}
      </span>
    </div>
  );
};

export default MainTitle;
