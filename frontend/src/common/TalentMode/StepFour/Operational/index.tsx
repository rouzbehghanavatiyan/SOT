import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import ImageRank from "../../../../components/ImageRank";

import asyncWrapper from "../../../AsyncWrapper";
import { useAppSelector } from "../../../../hooks/hook";
import RequestModal from "./RequestModal";
import StringHelpers from "../../../../utils/helpers/StringHelper";
const userIdFromSStorage = sessionStorage.getItem("userId");
interface PropsType {
  setShowEditMovie: any;
}

const Operational: React.FC<PropsType> = ({ setShowEditMovie }) => {
  const main = useAppSelector((state) => state?.main);
  const socket = main?.socketConfig;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [findUser, setFindUser] = useState<any>([]);
  const [dataUserRequestInfo, setDataUserRequestInfo] = useState<any>({});
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const [isLoadingSearchUser, setIsLoadingSearchUser] = useState<boolean>(true);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const getProfileImage = main?.userLogin?.profile;
  const findImg = StringHelpers.getProfile(getProfileImage);

  const handlePick = (id: number) => {
    setSelectedId(id);
  };
  console.log(isLoadingBtn);

  const handleSendInviteUser = asyncWrapper(async (item: any) => {
    const postUserInfo = {
      userIdSender:
        Number(userIdFromSStorage) || Number(main?.userLogin?.user?.id),
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
      (item) => Number(item?.userIdJoin) !== Number(main?.userLogin?.user?.id)
    );
    setFindUser(filterMe);
  };

  const handleGetRequestUsers = (data: any) => {
    console.log(data);

    // بررسی اینکه آیا داده‌ها یک آرایه هستند
    if (Array.isArray(data)) {
      // پردازش تمام کاربران درخواست‌دهنده
      const allReqUsers = data.map((item: any) => {
        return {
          userIdSender: item?.userIdSender,
          userIdReciever: item?.userIdReciever,
          userName: item?.userName,
          userImage: item?.userImage,
          userAnswer: item?.userAnswer,
        };
      });

      // بررسی کاربران و تنظیم وضعیت برای نمایش مودال
      const filteredUsers = allReqUsers.filter(
        (item) =>
          item?.userIdSender !== Number(userIdFromSStorage) &&
          item?.userIdReciever === Number(userIdFromSStorage)
      );

      if (filteredUsers.length > 0) {
        setDataUserRequestInfo(filteredUsers); // تنظیم لیست کاربران برای نمایش در مودال
        setShowRequestModal(true); // نمایش مودال
      }
    }

    // بررسی وضعیت پاسخ کاربران
    if (data?.userAnswer === false) {
      setIsLoadingBtn(false);
    }
  };

  useEffect(() => {
    const postUserInfo = {
      userIdJoin: Number(userIdFromSStorage) || Number(main?.userLogin?.user?.id),
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
        userId: Number(userIdFromSStorage) || Number(main?.userLogin?.user?.id),
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
                      score={20}
                      userNameStyle="text-gray-800"
                      imgSrc={item.userImage}
                      userName={item?.userName}
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
        <div className="flex mb-7 justify-around">
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
