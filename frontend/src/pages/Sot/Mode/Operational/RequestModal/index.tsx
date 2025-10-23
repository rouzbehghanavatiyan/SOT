import Modal from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import ImageRank from "../../../../../components/ImageRank";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useEffect, useMemo } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useAppSelector } from "../../../../../hooks/reduxHookType";
import { addAttachment, addInvite } from "../../../../../services/dotNet";
import asyncWrapper from "../../../../../common/AsyncWrapper";
import { useNavigate } from "react-router-dom";

interface PropsType {
  showRequestModal: boolean;
  setShowRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataUserRequestInfo: any[];
  setIsLoadingBtn: any;
  socket: any;
  userId: number;
  isLoadingBtn: any;
  resMovieData: any;
  allFormData: any;
  setShowEditMovie: any;
  userIdLogin: any;
  movieData: any;
  setMovieData: any;
}

const RequestModal: React.FC<PropsType> = ({
  showRequestModal,
  resMovieData,
  setShowEditMovie,
  setShowRequestModal,
  setIsLoadingBtn,
  dataUserRequestInfo,
  socket,
  allFormData,
  userIdLogin,
  movieData,
  isLoadingBtn,
  setMovieData,
}) => {
  const main = useAppSelector((state) => state?.main);
  const currentUserId = main?.userLogin?.user?.id;
  const navigate = useNavigate();
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

  const handleAttachment = useCallback(
    asyncWrapper(async () => {
      const formData = new FormData();
      if (allFormData?.video) {
        formData.append("formFile", allFormData.video);
      }
      if (allFormData?.imageCover) {
        formData.append("formFile", allFormData.imageCover);
      }
      formData.append("attachmentId", resMovieData?.id);
      formData.append("attachmentType", "mo");
      formData.append("attachmentName", "movies");
      const resAttachment = await addAttachment(formData);
      const { status: attachmentStatus, data: attachmentData } =
        resAttachment?.data;
      return { attachmentStatus, attachmentData };
    }),
    [allFormData]
  );

  const handleMatched = asyncWrapper(async () => {
    const { attachmentStatus } = await handleAttachment();
    if (attachmentStatus === -1) {
      console.log("Invalid video dimensions.");
      return;
    }
    if (attachmentStatus === 0) {
      const postInvite = {
        parentId: null,
        userId: userIdLogin || null,
        movieId: resMovieData?.id || null,
        status: 0,
      };
      const resInvite = await addInvite(postInvite);
      console.log(resInvite);
      setIsLoadingBtn({ show: false, userId: 0 });
      const { status: inviteStatus, data: inviteData } = resInvite?.data;
      setMovieData((prev: any) => ({
        ...prev,
        userId: userIdLogin || null,
        movieId: Number(resMovieData?.id),
        inviteId: inviteData,
      }));
      console.log(resInvite?.data);

      if (inviteData?.userId !== 0) {
        socket.emit("add_invite_offline", inviteData);
        setShowEditMovie(false);
        navigate(`/profile`);
      } else {
        setIsLoadingBtn(true);
      }
    }
  });

  const handleAccept = async (userInfo: any) => {
    const userId = userInfo.userIdSender;
    setIsLoadingBtn({ show: true, userId: userInfo?.userIdJoin });
    handleMatched();
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
                    loading={isLoadingBtn?.show}
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
