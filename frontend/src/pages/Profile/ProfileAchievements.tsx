import React from "react";
import cupLevel from "../../assets/img/cupLevel.webp";
import cup3 from "../../assets/img/cup5.png";
import cup4 from "../../assets/img/cup3.png";

const ProfileAchievements: React.FC = () => (
  <div className="flex my-2 items-center">
    {[
      { img: cupLevel, label: "City" },
      { img: cup3, label: "Country" },
      { img: cup4, label: "Region" },
    ].map((cup, index) => (
      <div key={index} className="flex flex-col items-center justify-end">
        <img className="w-14" src={cup.img} alt={`Cup ${cup.label}`} />
        <span className="font-bold text-gray-800">{cup.label}</span>
      </div>
    ))}
  </div>
);

export default ProfileAchievements;
