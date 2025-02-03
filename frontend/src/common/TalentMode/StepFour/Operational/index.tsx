import React from "react";
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

const Operational: React.FC = ({ showOperational, setShowOperational }) => {
  return (
    <Modal isOpen={showOperational} onClose={setShowOperational}>
      <span className="text-gray-800"> Choose your match . . .</span>
      <div className="flex flex-col">
        {items?.map((item) => (
          <div key={item.id} className="flex flex-col  items-center w-full">
            <span className="w-full border-b-2">
              <ImageRank
                imgSrc={item.profileImageBott}
                profileName="rabert5012_3"
                profileFontColor="black"
                type={item.rankTypeBott}
                level={item.rankLevelBott}
                rankWidth={45}
                starWidth={6}
                className="mb-2"
              />
            </span>
            <span className="w-full border-b-2">
              <ImageRank
                imgSrc={item.profileImageTop}
                profileName="smitH03_53"
                profileFontColor="black"
                type={item.rankTypeTop}
                level={item.rankLevelTop}
                rankWidth={45}
                starWidth={6}
              />
            </span>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setShowOperational(false)}
        className="border mt-4 z-50 w-60 right-16"
        variant={"outLine_secondary"}
        label="Close"
      />
    </Modal>
  );
};

export default Operational;
