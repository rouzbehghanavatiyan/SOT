import Modal from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import ImageRank from "../../../../../components/ImageRank";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useMemo } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

interface PropsType {
  showRequestModal: boolean;
  setShowRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataUserRequestInfo: any[];
  setIsLoadingBtn: React.Dispatch<React.SetStateAction<boolean>>;
  socket: any;
  userId: number; // اضافه کردن userId برای شناسایی کاربر جاری
}

const RequestModal: React.FC<PropsType> = ({
  showRequestModal,
  setShowRequestModal,
  setIsLoadingBtn,
  dataUserRequestInfo,
  socket,
  userId,
}) => {
  const handleCancel = () => {
    setIsLoadingBtn(false);
    setShowRequestModal(false);
    socket.off("add_invite_optional_response");
    socket.off("add_invite_optional");

    socket.emit("add_invite_optional", {
      ...dataUserRequestInfo,
      userAnswer: false,
    });
  };

  const handleAccept = (userInfo: any) => {
    socket.emit("add_invite_optional", {
      ...userInfo,
      userAnswer: true,
    });
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off("add_invite_optional_response");
      }
      setIsLoadingBtn(false);
    };
  }, [socket]);

  // حذف کاربر جاری و داده‌های تکراری از dataUserRequestInfo
  const filteredDataUserRequestInfo = useMemo(() => {
    // حذف تکراری‌ها و کاربر جاری
    const uniqueUsers = dataUserRequestInfo.filter(
      (user, index, self) =>
        user.userIdSender !== userId && // حذف کاربر جاری
        self.findIndex((u) => u.userIdSender === user.userIdSender) === index // حذف تکراری‌ها
    );
    return uniqueUsers;
  }, [dataUserRequestInfo, userId]);

  console.log(filteredDataUserRequestInfo);

  return (
    <Modal
      isOpen={showRequestModal}
      setIsOpen={setShowRequestModal}
      padding={0}
      onClose={() => setShowRequestModal(false)}
      className="rounded-2xl bg-white p-6 shadow-lg"
      title="Request user"
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-[220px] w-full"
      >
        {filteredDataUserRequestInfo?.map((userInfo, index) => {
          return (
            <SwiperSlide key={index} className="flex flex-col items-center">
              <ImageRank
                score={20}
                imgSize={60}
                userNameStyle="text-gray-800"
                imgSrc={userInfo.userImage}
                userName={userInfo.userName}
              />
              <div className="flex flex-row mt-10">
                Make a request to you. Would you like to accept?
              </div>
              <div className="flex p-3 justify-center gap-2 mt-5">
                <Button
                  onClick={() => handleAccept(userInfo)}
                  type="button"
                  variant={"green"}
                  label="Accept"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className="mb-5 flex justify-center">
        <Button
          className="border"
          onClick={() => handleCancel()}
          variant={"outLine_secondary"}
          label="Cancel"
        />
      </span>
    </Modal>
  );
};

export default RequestModal;
