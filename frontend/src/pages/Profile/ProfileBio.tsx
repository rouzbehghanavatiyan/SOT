import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import StringHelpers from "../../utils/helpers/StringHelper";
import Dropdown from "../../components/Dropdown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// import images
import bronseBase1 from "../../assets/ranks/bronze-1.png";
import bronseBase2 from "../../assets/ranks/bronze-2.png";
import bronseBase3 from "../../assets/ranks/bronze-3.png";
import silver1 from "../../assets/ranks/silver-1.png";
import silver2 from "../../assets/ranks/silver-2.png";
import silver3 from "../../assets/ranks/silver-3.png";
import gold1 from "../../assets/ranks/gold-1.png";
import gold2 from "../../assets/ranks/gold-2.png";
import gold3 from "../../assets/ranks/gold-3.png";

interface ProfileBioProps {
  bio: string;
  location: string;
  website: string;
  rankPercentage: number;
  rankScore: number;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  bio,
  location,
  website,
  rankScore,
  rankPercentage,
}) => {
  const [isBioRankDropdownOpen, setIsBioRankDropdownOpen] = useState(false);

  const bioRankDropdownItems = [
    {
      label: "rankScore",
      icon: <span className="font20 font-bold">{rankScore}</span>,
      onClick: () => console.log("Rank Score clicked"),
    },
    {
      label: "Bronze 1",
      icon: <img src={bronseBase1} alt="Bronze 1" className="w-10 h-10" />,
      onClick: () => console.log("Bronze 1 selected"),
    },
    {
      label: "Bronze 2",
      icon: <img src={bronseBase2} alt="Bronze 2" className="w-10 h-10" />,
      onClick: () => console.log("Bronze 2 selected"),
    },
    {
      label: "Bronze 3",
      icon: <img src={bronseBase3} alt="Bronze 3" className="w-10 h-10" />,
      onClick: () => console.log("Bronze 3 selected"),
    },
    {
      label: "Silver 1",
      icon: <img src={silver1} alt="Silver 1" className="w-10 h-10" />,
      onClick: () => console.log("Silver 1 selected"),
    },
    {
      label: "Silver 2",
      icon: <img src={silver2} alt="Silver 2" className="w-10 h-10" />,
      onClick: () => console.log("Silver 2 selected"),
    },
    {
      label: "Silver 3",
      icon: <img src={silver3} alt="Silver 3" className="w-10 h-10" />,
      onClick: () => console.log("Silver 3 selected"),
    },
    {
      label: "Gold 1",
      icon: <img src={gold1} alt="Gold 1" className="w-10 h-10" />,
      onClick: () => console.log("Gold 1 selected"),
    },
    {
      label: "Gold 2",
      icon: <img src={gold2} alt="Gold 2" className="w-10 h-10" />,
      onClick: () => console.log("Gold 2 selected"),
    },
    {
      label: "Gold 3",
      icon: <img src={gold3} alt="Gold 3" className="w-10 h-10" />,
      onClick: () => console.log("Gold 3 selected"),
    },
  ];

  const handleBioRank = () => {
    setIsBioRankDropdownOpen(!isBioRankDropdownOpen);
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="font-bold mb-2 text-gray-800 relative flex items-center justify-between w-full">
        <span className="flex ms-2 w-full justify-center" >Rank score</span>
        <Dropdown
          isOpenOptions={isBioRankDropdownOpen}
          setIsOpenOptions={setIsBioRankDropdownOpen}
          items={bioRankDropdownItems}
          position="right"
          className="ml-4"
          iconOnly={true}
          showRank={true}
          />
      </div>

      <div
        onClick={handleBioRank}
        className="w-full relative h-4 bg-gray-200 rounded-xl overflow-hidden cursor-pointer"
      >
        <ProgressBar percentage={rankPercentage} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold font10 text-white text-xs z-10">
            {rankPercentage}%
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full mt-5 items-start">
        <div className="mb-4">
          <span className="text-gray-800">{bio}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-800">{location}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold text-dark_blue">{website}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;