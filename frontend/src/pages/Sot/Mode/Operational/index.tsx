import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import ImageRank from "../../../../components/ImageRank";
import { useAppSelector } from "../../../../hooks/reduxHookType";
import RequestModal from "./RequestModal";
import StringHelpers from "../../../../utils/helpers/StringHelper";
import asyncWrapper from "../../../../common/AsyncWrapper";

interface PropsType {
  setShowEditMovie: any;
}

const Operational: React.FC<PropsType> = ({ setShowEditMovie }) => {
  const main = useAppSelector((state) => state?.main);
  const socket = main?.socketConfig;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [findUser, setFindUser] = useState<any>([]);
  const [dataUserRequestInfo, setDataUserRequestInfo] = useState<any>({});
  const [isLoadingBtn, setIsLoadingBtn] = useState<any>({
    show: false,
    userId: 0,
  });
  const [isLoadingSearchUser, setIsLoadingSearchUser] = useState<boolean>(true);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const getProfileImage = main?.userLogin?.profile;
  const findImg = StringHelpers.getProfile(getProfileImage);

  const handlePick = (id: number) => {
    setSelectedId(id);
  };

  const handleSendInviteUser = (item: any) => {
    const postUserInfo = {
      userIdSender: main?.userLogin?.user?.id,
      userName: main?.userLogin?.user?.userName,
      userImage: findImg,
      userAnswer: null,
      userIdReciever: item?.userIdJoin,
    };

    setIsLoadingBtn({ show: true, userId: item?.userIdJoin });

    // این یک عملیات synchronous است، نیازی به async نیست
    socket.emit("add_invite_optional", postUserInfo);
  };

  const handleGetRequestUsers = (data: any) => {
    console.log("Received request data:", data);

    if (data && typeof data === "object" && !Array.isArray(data)) {
      if (data.userIdReciever === main?.userLogin?.user?.id) {
        setDataUserRequestInfo([data]);
        setShowRequestModal(true);
      }

      if (data.userAnswer !== null && data.userAnswer !== undefined) {
        socket.emit("remove_invite_optional", {
          userIdSender: data.userIdSender,
        });
      }
    }

    if (data?.userAnswer === false) {
      setIsLoadingBtn({ show: false, userId: 0 });
    }
  };

  const handleGetUsers = (dataList: any[]) => {
    const filterMe = dataList?.filter(
      (item) => Number(item?.userIdJoin) !== main?.userLogin?.user?.id
    );
    setFindUser(filterMe);
    setIsLoadingSearchUser(false); // حتماً loading را false کنید
  };
  const filteredFindUser = findUser.filter(
    (user: any) => user.id !== main?.userLogin?.user?.id
  );

  const handleClose = () => {
    if (socket) {
      // حذف درخواست‌های کاربر از سرور
      socket.emit("remove_invite_optional", {
        userIdSender: main?.userLogin?.user?.id,
      });

      socket.emit("user_left_optional", {
        userId: main?.userLogin?.user?.id,
      });
    }
    setShowEditMovie(false);
  };

  useEffect(() => {
    const postUserInfo = {
      userIdJoin: main?.userLogin?.user?.id,
      userName: main?.userLogin?.user?.userName,
      userImage: findImg,
      score: main?.userLogin?.score,
      userAnswer: null,
    };

    if (socket) {
      socket.emit("user_entered_optional", postUserInfo);
      socket.on("user_entered_optional_response", handleGetUsers);
      socket.on("add_invite_optional_response", handleGetRequestUsers);
    }

    return () => {
      if (socket) {
        // از asyncWrapper در cleanup هم استفاده نکنید
        socket.emit("remove_invite_optional", {
          userIdSender: main?.userLogin?.user?.id,
        });

        socket.emit("user_left_optional", {
          userId: main?.userLogin?.user?.id,
        });

        socket.off("user_entered_optional_response", handleGetUsers);
        socket.off("add_invite_optional_response", handleGetRequestUsers);
      }
    };
  }, [socket]);

  return (
    <>
      <div className="px-4">
        <div className="flex flex-col">
          {filteredFindUser?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex  flex-col items-center w-full">
                <span className="w-full " onClick={() => handlePick(index)}>
                  <div className="flex  justify-between items-center my-2">
                    <ImageRank
                      showProfile={false}
                      imgSize={60}
                      score={item.score}
                      userNameStyle="text-black"
                      imgSrc={item.userImage}
                      userName={item?.userName}
                    />
                    {selectedId === index && (
                      <Button
                        loading={isLoadingBtn?.show}
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
        <div className="inset-0 flex my-4 justify-center items-center transition-opacity h-11 w-full gap-2 z-50">
          {isLoadingSearchUser && (
            <>
              <div className="w-10 h-10 flex justify-center items-center rounded-lg">
                <div className="loader-userFinding w-16 h-16" />
              </div>
              <span> Finding users</span>
            </>
          )}
        </div>
        <span className="flex mb-7 justify-around">
          <Button
            className="border"
            onClick={handleClose}
            variant={"outLine_secondary"}
            label="Close"
          />
        </span>
      </div>
      {showRequestModal && (
        <RequestModal
          setIsLoadingBtn={setIsLoadingBtn}
          socket={socket}
          isLoadingBtn={isLoadingBtn}
          showRequestModal={showRequestModal}
          setShowRequestModal={setShowRequestModal}
          dataUserRequestInfo={dataUserRequestInfo}
        />
      )}
    </>
  );
};

export default Operational;
