import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import cook4 from "../../assets/img/cook2.jpg";
import cooking1 from "../../assets/img/cooking1.webp";
import cooking2 from "../../assets/img/cooking2.jpeg";
import cooking3 from "../../assets/img/cooking3.jpg";
import cook1 from "../../assets/img/cook1.jpg";
import roberto from "../../assets/img/roberto.avif";
import gymM3 from "../../assets/img/gymM3.jpg";
import violon from "../../assets/img/kidViolon2.avif";
import violon2 from "../../assets/img/violinKid4.jpg";
import menGym2 from "../../assets/img/menGym2.png";
import blackProfile from "../../assets/img/1-intro-photo-final.jpg";
import womenGymPro1 from "../../assets/img/womenGym1.jpg";
import womenGym from "../../assets/img/women-AI-Profile-Picture.jpg";
import Rank from "../../components/Rank";
import Image from "../../components/Image";
import ImageRank from "../../components/ImageRank";
import Input from "../../components/Input";
import SearchIcon from "@mui/icons-material/Search";

const items = [
  {
    id: 1,
    imageTop: cooking1,
    imageBott: cooking2,
    profileImageTop: cook4,
    profileImageBott: cook1,
    alt: "Image 1",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 2,
    imageTop: menGym2,
    imageBott: womenGymPro1,
    profileImageTop: gymM3,
    profileImageBott: womenGym,
    alt: "Image 2",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: blackProfile,
    profileImageBott: roberto,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 3,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 3",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
  {
    id: 4,
    imageTop: violon,
    imageBott: violon2,
    profileImageTop: cook4,
    profileImageBott: cook4,
    alt: "Image 4",
    rankTypeTop: "gold",
    rankLevelTop: 3,
    rankTypeBott: "silver",
    rankLevelBott: 2,
  },
];

const StepOne: React.FC = () => {
  const [activeProfiles, setActiveProfiles] = useState<Set<number>>(new Set());
  const [lastTap, setLastTap] = useState<number>(0);
  const [searching, setSearching] = useState<string>("");

  const handleShowProfile = (id: number) => {
    setActiveProfiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDoubleTap = (index: number) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      console.log(`Double-tap detected on item with index: ${index}`);
      setLastTap(0);
    } else {
      handleShowProfile(index);
      setLastTap(now);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-[1px] p-[1px]">
        {items.map((item, index: number) => (
          <div
            key={index}
            onClick={() => handleDoubleTap(index)}
            className="my-1 flex-1 flex flex-col"
          >
            <div className="flex-1">
              <span className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                <img
                  src={item.imageTop}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                {activeProfiles.has(index) && (
                  <ImageRank
                    showBackground
                    imgSrc={item.profileImageTop}
                    profileName="jack"
                    profileFontColor="white"
                    type={item.rankTypeTop}
                    level={item.rankLevelTop}
                    rankWidth={45}
                    starWidth={6}
                    className="absolute bottom-0"
                  />
                )}
              </span>
            </div>
            <div className="flex-1 bg-white">
              <div className="flex-1">
                <span className="relative block w-[calc(50vw - 2px)] h-[calc(35vw - 2px)]">
                  <img
                    src={item.imageBott}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                  {activeProfiles.has(index) && (
                    <ImageRank
                      showBackground
                      imgSrc={item.profileImageBott}
                      profileName="jack"
                      profileFontColor="white"
                      type={item.rankTypeBott}
                      level={item.rankLevelBott}
                      rankWidth={45}
                      starWidth={6}
                      className="absolute bottom-0"
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StepOne;
