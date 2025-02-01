import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import cook4 from "../../assets/img/cook4.jpg";
import gymM3 from "../../assets/img/gymM3.jpg";
import violon from "../../assets/img/kidViolon2.avif";
import violon2 from "../../assets/img/violinKid4.jpg";
import menGym2 from "../../assets/img/menGym2.png";
import blackProfile from "../../assets/img/1-intro-photo-final.jpg";
import womenGymPro1 from "../../assets/img/womenGym1.jpg";
import womenGym from "../../assets/img/women-AI-Profile-Picture.jpg";
import Rank from "../../components/Rank";
import Image from "../../components/Image";

const StepOne: React.FC = () => {
    const items = [
        { id: 1, imageTop: violon, imageBott: violon2, profileImageTop: cook4, profileImageBott: cook4, alt: "Image 1", rankTypeTop: "gold", rankLevelTop: 3, rankTypeBott: "silver", rankLevelBott: 2 },
        { id: 2, imageTop: menGym2, imageBott: womenGymPro1, profileImageTop: gymM3, profileImageBott: womenGym, alt: "Image 2", rankTypeTop: "gold", rankLevelTop: 3, rankTypeBott: "silver", rankLevelBott: 2 },
        { id: 3, imageTop: violon, imageBott: violon2, profileImageTop: blackProfile, profileImageBott: cook4, alt: "Image 3", rankTypeTop: "gold", rankLevelTop: 3, rankTypeBott: "silver", rankLevelBott: 2 },
        { id: 3, imageTop: violon, imageBott: violon2, profileImageTop: cook4, profileImageBott: cook4, alt: "Image 3", rankTypeTop: "gold", rankLevelTop: 3, rankTypeBott: "silver", rankLevelBott: 2 },
        { id: 3, imageTop: violon, imageBott: violon2, profileImageTop: cook4, profileImageBott: cook4, alt: "Image 3", rankTypeTop: "gold", rankLevelTop: 3, rankTypeBott: "silver", rankLevelBott: 2 },
        { id: 3, imageTop: violon, imageBott: violon2, profileImageTop: cook4, profileImageBott: cook4, alt: "Image 3", rankTypeTop: "gold", rankLevelTop: 3, rankTypeBott: "silver", rankLevelBott: 2 },
        { id: 4, imageTop: violon, imageBott: violon2, profileImageTop: cook4, profileImageBott: cook4, alt: "Image 4", rankTypeTop: "gold", rankLevelTop: 3, rankTypeBott: "silver", rankLevelBott: 2 },
    ];

    return (
        <div className=" grid grid-cols-2 gap-[1px] bg-gray-300 p-[1px]">
            {items.map((item) => (
                <div key={item.id} className=" flex-1 flex flex-col">
                    <div className="flex-1">
                        <span className="relative ">
                            <img
                                src={item.imageTop}
                                alt={item.alt}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-0">
                                <span className="relative h-16 flex">
                                    <Image profileName="jack" imgSrc={item.profileImageTop} className="" />
                                    <Rank
                                        type={item.rankTypeTop}
                                        level={item.rankLevelTop}
                                        rankWidth={45}
                                        starWidth={6}
                                        className="absolute bottom-0"
                                    />
                                </span>
                            </span>
                        </span>
                    </div>
                    <div className="flex-1 bg-white">
                        <div className="flex-1">
                            <span className="relative">
                                <img
                                    src={item.imageBott}
                                    alt={item.alt}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-0">
                                    <span className="relative h-16 flex">
                                        <Image profileName="jack" imgSrc={item.profileImageBott} className="" />
                                        <Rank
                                            type={item.rankTypeBott}
                                            level={item.rankLevelBott}
                                            rankWidth={45}
                                            starWidth={6}
                                            className="absolute bottom-0"
                                        />
                                    </span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StepOne;