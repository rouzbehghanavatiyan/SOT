import Modal from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import ImageRank from "../../../../../components/ImageRank";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useMemo } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useAppSelector } from "../../../../../hooks/reduxHookType";

interface PropsType {
  showRequestModal: boolean;
  setShowRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataUserRequestInfo: any[];
  setIsLoadingBtn: React.Dispatch<React.SetStateAction<boolean>>;
  socket: any;
  userId: number;
  isLoadingBtn: any;
}

const RequestModal: React.FC<PropsType> = ({
  showRequestModal,
  setShowRequestModal,
  setIsLoadingBtn,
  dataUserRequestInfo,
  socket,
}) => {
  const main = useAppSelector((state) => state?.main);
  const currentUserId = main?.userLogin?.user?.id;

  const handleCancel = (userId: number) => {
    setIsLoadingBtn((prev: any) => ({ ...prev, [userId]: true }));
    setShowRequestModal(false);
    const userInfo = dataUserRequestInfo.find(
      (user) => user.userIdSender === userId
    );
    socket.emit("add_invite_optional", {
      ...userInfo,
      userAnswer: false,
    });

    socket.emit("remove_invite_optional", {
      userIdSender: userId,
    });
  };

  const handleAccept = (userInfo: any) => {
    const userId = userInfo.userIdSender;
    setIsLoadingBtn((prev: any) => ({ ...prev, [userId]: true }));

    socket.emit("add_invite_optional", {
      ...userInfo,
      userAnswer: true,
    });

    socket.emit("remove_invite_optional", {
      userIdSender: userId,
    });
  };

  useEffect(() => {
    if (!showRequestModal) {
      setIsLoadingBtn({ show: false });
    }

    return () => {
      if (socket) {
        socket.off("add_invite_optional_response");
      }

      setIsLoadingBtn({ show: false });
    };
  }, [socket, showRequestModal]);

  console.log(dataUserRequestInfo);

  const filteredDataUserRequestInfo = useMemo(() => {
    return dataUserRequestInfo.filter(
      (user) => user.userIdReciever === currentUserId
    );
  }, [dataUserRequestInfo, currentUserId]);

  useEffect(() => {
    if (filteredDataUserRequestInfo.length === 0 && showRequestModal) {
      setShowRequestModal(false);
    }
  }, [filteredDataUserRequestInfo, showRequestModal]);

  if (filteredDataUserRequestInfo.length === 0) {
    return null;
  }

  return (
    <Modal
      isOpen={showRequestModal}
      setIsOpen={setShowRequestModal}
      padding={0}
      onClose={() => setShowRequestModal(false)}
      title="Request user"
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-[220px] w-full"
      >
        {filteredDataUserRequestInfo?.map((userInfo, index) => {
          return (
            <SwiperSlide key={index} className="px-12">
              <div className="container">
                <ImageRank
                  score={20}
                  imgSize={60}
                  userNameStyle="text-gray-800"
                  imgSrc={userInfo.userImage}
                  userName={userInfo.userName}
                />
                <div className="flex my-6">
                  Make a request to you. Would you like to accept?
                </div>
                <div className="flex px-3 justify-center gap-2">
                  <Button
                    onClick={() => handleAccept(userInfo)}
                    type="button"
                    variant={"green"}
                    label="Accept"
                  />
                  <Button
                    className="border"
                    onClick={() => handleCancel(userInfo?.userIdSender)}
                    variant={"outLine_secondary"}
                    label="Cancel"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Modal>
  );
};

export default RequestModal;
