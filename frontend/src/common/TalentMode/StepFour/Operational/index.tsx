import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import ImageRank from "../../../../components/ImageRank";
import "swiper/css";
import "swiper/css/pagination";
import asyncWrapper from "../../../AsyncWrapper";
import { useAppSelector } from "../../../../hooks/hook";
import RequestModal from "./RequestModal";

const userIdFromSStorage = sessionStorage.getItem("userId");

interface PropsType {
  movieData: any;
  setShowEditMovie: any;
}

const Operational: React.FC<PropsType> = ({ movieData, setShowEditMovie }) => {
  const { main } = useAppSelector((state) => state);
  const socket = main?.socketConfig;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [findUser, setFindUser] = useState<any>([]);
  const [dataUserRequestInfo, setDataUserRequestInfo] = useState<any>({});

  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const [isLoadingSearchUser, setIsLoadingSearchUser] = useState<boolean>(true);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;

  const handlePick = (id: number) => {
    setSelectedId(id);
  };

  const handleSendInviteUser = asyncWrapper(async (item: any) => {
    const postUserInfo = {
      userIdSender:
        Number(userIdFromSStorage) || Number(main?.userLogin?.userId),
      userName: main?.userLogin?.userName,
      userImage: findImg,
      userAnswer: null,
      userIdReciever: item?.userIdJoin,
    };

    setIsLoadingBtn(true);
    socket.emit("add_invite_optional", postUserInfo);
  });

  const handleGetUsers = (dataList: any[]) => {
    const filterMe = dataList?.filter(
      (item) => Number(item?.userIdJoin) !== Number(main?.userLogin?.userId)
    );
    setFindUser(filterMe);
  };

  const handleGetRequestUsers = (data: any) => {
    console.log(data);
    if (
      data?.userIdSender !== Number(userIdFromSStorage) &&
      data?.userIdReciever === Number(userIdFromSStorage)
    ) {
      setDataUserRequestInfo(data);
      setShowRequestModal(true);
    }
    if (data?.userAnswer === false) {
      setIsLoadingBtn(false);
    }
  };

  useEffect(() => {
    const postUserInfo = {
      userIdJoin: Number(userIdFromSStorage) || Number(main?.userLogin?.userId),
      userName: main?.userLogin?.userName,
      userImage: findImg,
      userAnswer: null,
    };
    if (socket) {
      socket.emit("user_entered_optional", postUserInfo);
      socket.on("user_entered_optional_response", handleGetUsers);
      socket.on("add_invite_optional_response", handleGetRequestUsers);
    }
    return () => {
      if (socket) {
        socket.off("user_entered_optional_response", handleGetUsers);
        socket.off("add_invite_optional_response", handleGetRequestUsers);
      }
    };
  }, [socket]);

  const filteredFindUser = findUser.filter(
    (user: any) => user.id !== Number(userIdFromSStorage)
  );

  const handleClose = () => {
    if (socket) {
      socket.emit("user_left_optional", {
        userId: Number(userIdFromSStorage) || Number(main?.userLogin?.userId),
      });
    }
    setShowEditMovie(false);
  };

  return (
    <>
      <div className="px-4">
        <div className={`flex flex-col`}>
          {filteredFindUser?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex  flex-col items-center w-full">
                <span className="w-full " onClick={() => handlePick(index)}>
                  <div className="flex  justify-between items-center my-2">
                    <ImageRank
                      imgSize={60}
                      rankStyle="w-8 h-8"
                      imgSrc={item.userImage}
                      userName={item?.userName}
                      iconProfileStyle="font60 text-gray-800"
                    />
                    {selectedId === index && (
                      <Button
                        loading={isLoadingBtn}
                        onClick={() => handleSendInviteUser(item)}
                        className=""
                        variant={"green"}
                        label="Send invite"
                      />
                    )}
                  </div>
                </span>
              </div>
            );
          })}
        </div>
        <div
          className={`inset-0 flex my-4 justify-center items-center transition-opacity h-11 w-full gap-2 z-50`}
        >
          {isLoadingSearchUser && (
            <>
              <div className=" w-10 h-10  flex justify-center items-center shadow-xl rounded-lg">
                <div className="loader-userFinding w-16 h-16"> </div>
              </div>
              <span> Finding users</span>
              <div className="text-gray-800">
                <span className="loader-dot text-red"> </span>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-around">
          <Button
            className="border"
            onClick={handleClose}
            variant={"outLine_secondary"}
            label="Close"
          />
        </div>
      </div>
      {showRequestModal && (
        <RequestModal
          setIsLoadingBtn={setIsLoadingBtn}
          socket={socket}
          showRequestModal={showRequestModal}
          setShowRequestModal={setShowRequestModal}
          dataUserRequestInfo={dataUserRequestInfo}
        />
      )}
    </>
  );
};

export default Operational;
