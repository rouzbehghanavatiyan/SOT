import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../../../../hooks/hook";

const userIdFromSStorage = sessionStorage.getItem("userId");

interface PropsType {
  movieData: any;
}

const Operational: React.FC<PropsType> = ({ movieData }) => {
  const { main } = useAppSelector((state) => state);
  const socket = main?.socketConfig;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const handlePick = (id: number) => {
    setSelectedId(id);
  };

  const handleConfirmUser = asyncWrapper(async (item: any) => {
    const postInvite = {
      parentId: item?.id,
      userId: userIdFromSStorage,
      movieId: movieData?.movieId,
    };

    setIsLoadingBtn(true);
    socket.emit("add_invite", postInvite);
    // const res = await addInvite(postInvite);
    setIsLoadingBtn(false);
    // console.log(res);
  });

  //--------------------------------------------------------------------------------------------------------------------------------------> باییییییید لایو کاربرها ایجاد شود

  const handleReceiveUsers = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("user_entered_operational", { userId: userIdFromSStorage });
    }
  }, [socket]);

  useEffect(() => {
    socket.on("add_invite", handleReceiveUsers);
    return () => {
      if (socket) {
        socket.off("add_invite", handleReceiveUsers);
      }
    };
  }, [socket]);

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col">
          {["items"]?.map((item: any, index: number) => {
            console.log(item);
            return (
              <div key={index} className="flex flex-col items-center w-full">
                <span
                  className="w-full border-b-2"
                  onClick={() => handlePick(index)}
                >
                  <div className="relative">
                    <ImageRank
                      imgSrc={item.profileImageBott}
                      profileName="rabert5012_3"
                      profileFontColor="black"
                      rankWidth={45}
                      starWidth={6}
                    />
                    {selectedId === index && (
                      <div className="absolute right-0 top-5 mb-2">
                        <Button
                          loading={isLoadingBtn}
                          onClick={() => handleConfirmUser(item)}
                          className=""
                          variant={"green"}
                          label="Send invite"
                        />
                      </div>
                    )}
                  </div>
                </span>
              </div>
            );
          })}
        </div>
        <div
          className={`inset-0 flex justify-center items-center transition-opacity h-11 w-full gap-2 z-50`}
        >
          <div className=" w-10 h-10 flex justify-center items-center shadow-xl rounded-lg">
            <div className="loader-userFinding   w-16 h-16"> </div>
          </div>
          <span> Finding users</span>
          <div className="text-gray-800">
            <span className="loader-dot text-red"> </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Operational;
