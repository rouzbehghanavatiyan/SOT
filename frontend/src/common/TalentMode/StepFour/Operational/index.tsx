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

  const handleReceiveUsers = (data: any) => {
    console.log(data);
  };

  const handleGetUsers = (dataList: any[]) => {
    console.log(dataList);

    dataList.forEach((data: any) => {
      if (data.userId === main?.userLogin?.userId) {
        return;
      }

      const filtered = allUsers.filter(
        (user: any) => data?.userId === user?.id
      );
      setFindUser((prevFindUser: any) => {
        const isDuplicate = prevFindUser.some(
          (user: any) => user.id === filtered[0]?.id
        );

        if (!isDuplicate && filtered.length > 0) {
          return [...prevFindUser, ...filtered];
        }
        return prevFindUser;
      });
    });
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

  useEffect(() => {
    if (allUsers.length > 0 && socket) {
      socket.emit("user_entered_optional", {
        userId: Number(userIdFromSStorage) || Number(main?.userLogin?.userId),
      });
      socket.on("user_entered_optional_response", handleGetUsers);
      socket.on("add_invite", handleReceiveUsers);
    }
    return () => {
      if (socket) {
        socket.off("user_entered_optional_response", handleGetUsers);
        socket.off("add_invite", handleReceiveUsers);
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
    // setShowEditMovie(false);
  };

  return (
    <>
      <div className="p-2">
        <div className={`flex flex-col`}>
          {filteredFindUser?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex flex-col items-center w-full">
                <span
                  className="w-full border-b-2"
                  onClick={() => handlePick(index)}
                >
                  <div className="relative">
                    <ImageRank
                      imgSrc={item.profileImageBott}
                      profileName={item?.userName}
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
          {!isLoadingBtn && (
            <>
              <div className=" w-10 h-10 flex justify-center items-center shadow-xl rounded-lg">
                <div className="loader-userFinding   w-16 h-16"> </div>
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
