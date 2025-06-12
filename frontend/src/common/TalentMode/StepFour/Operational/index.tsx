import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import ImageRank from "../../../../components/ImageRank";
import "swiper/css";
import "swiper/css/pagination";
import asyncWrapper from "../../../AsyncWrapper";
import { useAppSelector } from "../../../../hooks/hook";
import { userList } from "../../../../services/dotNet";

const userIdFromSStorage = sessionStorage.getItem("userId");

interface PropsType {
  movieData: any;
  setShowEditMovie: any;
}

const Operational: React.FC<PropsType> = ({ movieData, setShowEditMovie }) => {
  const { main } = useAppSelector((state) => state);
  const socket = main?.socketConfig;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [findUser, setFindUser] = useState<any>([]);
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;

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
    // setIsLoadingBtn(false);
  });

  const handleGetUsers = (dataList: any[]) => {
    // dataList.forEach((data: any) => {
    //   // if (data.userId === main?.userLogin?.userId) {
    //   //   return;
    //   // }

    // });
    const filterMe = dataList?.filter(
      (item) => Number(item?.userId) !== Number(main?.userLogin?.userId)
    );
    setFindUser(filterMe);
  };

  const handleFindUsers = asyncWrapper(async () => {
    if (socket) {
      const res = await userList();
      const { data, message, status } = res?.data;
      if (status === 0) {
        setAllUsers(data);
      }
    }
  });

  useEffect(() => {
    handleFindUsers();
  }, []);

  // console.log(main);

  useEffect(() => {
    if (allUsers.length > 0 && socket) {
      socket.emit("user_entered_optional", {
        userId: Number(userIdFromSStorage) || Number(main?.userLogin?.userId),
        userName: main?.userLogin?.userName,
        userImage: findImg,
      });

      socket.on("user_entered_optional_response", handleGetUsers);
      // socket.on("add_invite", handleReceiveUsers);
    }
    return () => {
      if (socket) {
        socket.off("user_entered_optional_response", handleGetUsers);
        // socket.off("add_invite", handleReceiveUsers);
      }
    };
  }, [allUsers, socket]);

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
      <div className="p-2">
        <div className={`flex flex-col`}>
          {filteredFindUser?.map((item: any, index: number) => {
            console.log(item);
            return (
              <div key={index} className="flex  flex-col items-center w-full">
                <span className="w-full " onClick={() => handlePick(index)}>
                  <div className="flex  justify-between my-2">
                    <ImageRank
                      imgSize={60}
                      rankStyle="w-8 h-8"
                      imgSrc={item.userImage}
                      userName={item?.userName}
                      iconProfileStyle="font60 text-gray-800"
                    />
                    {selectedId === index && (
                      <div className=" ">
                        <Button
                          loading={isLoadingBtn}
                          onClick={() => handleConfirmUser(item)}
                          className=""
                          variant={"white"}
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
          className={`inset-0 flex my-4 justify-center items-center transition-opacity h-11 w-full gap-2 z-50`}
        >
          {!isLoadingBtn && (
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
    </>
  );
};

export default Operational;
