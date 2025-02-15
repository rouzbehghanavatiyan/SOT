import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import { Button } from "../../../../components/Button";
import ImageRank from "../../../../components/ImageRank";
import "swiper/css";
import "swiper/css/pagination";
import cook4 from "../../../../assets/img/cook2.jpg";
import cooking1 from "../../../../assets/img/cooking1.webp";
import cooking2 from "../../../../assets/img/cooking2.jpeg";
import cook1 from "../../../../assets/img/cook1.jpg";
import roberto from "../../../../assets/img/roberto.avif";
import gymM3 from "../../../../assets/img/gymM3.jpg";
import violon from "../../../../assets/img/kidViolon2.avif";
import violon2 from "../../../../assets/img/violinKid4.jpg";
import menGym2 from "../../../../assets/img/menGym2.png";
import blackProfile from "../../../../assets/img/1-intro-photo-final.jpg";
import womenGymPro1 from "../../../../assets/img/womenGym1.jpg";
import womenGym from "../../../../assets/img/women-AI-Profile-Picture.jpg";
import { addInvite } from "../../../../services/dotNet";
import asyncWrapper from "../../../AsyncWrapper";
const userIdFromSStorage = sessionStorage.getItem("userId");

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

const Operational: React.FC = () => {
  const [profileData, setProfileData] = useState({});
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handlePick = (id: number) => {
    setSelectedId(id);
  };

  const handleConfirmUser = asyncWrapper(async () => {
    const postInvite = {
      parentId: null,
      userId: userIdFromSStorage,
      movieId: movieData?.id,
    };

    const res = await addInvite(postData);
  });

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col">
          {items?.map((item: any, index: number) => (
            <div key={item.id} className="flex flex-col items-center w-full">
              <span
                className="w-full border-b-2"
                onClick={() => handlePick(index)}
              >
                <div className="relative">
                  <ImageRank
                    imgSrc={item.profileImageBott}
                    profileName="rabert5012_3"
                    profileFontColor="black"
                    type={item.rankTypeBott}
                    level={item.rankLevelBott}
                    rankWidth={45}
                    starWidth={6}
                  />
                  {selectedId === index && (
                    <div className="absolute right-0 top-5 mb-2">
                      <Button
                        onClick={handleConfirmUser}
                        className=""
                        variant={"green"}
                        label="Send invite"
                      />
                    </div>
                  )}
                </div>
              </span>
            </div>
          ))}
        </div>
        <div
          className={`inset-0 flex justify-center items-center transition-opacity h-11 w-full gap-2 z-50`}
        >
          <div className=" w-10 h-10 flex justify-center items-center shadow-xl rounded-lg">
            <div className="loader-text w-16 h-16"> </div>
          </div>
          <div className="text-gray-800">
            <span> Finding users</span>
            <span className="loader-dot text-red" >  </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Operational;
