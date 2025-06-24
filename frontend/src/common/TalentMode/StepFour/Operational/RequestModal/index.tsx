import Modal from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import ImageRank from "../../../../../components/ImageRank";
import { useEffect } from "react";

interface PropsType {
  showRequestModal: boolean;
  setShowRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataUserRequestInfo: any;
  setIsLoadingBtn: React.Dispatch<React.SetStateAction<boolean>>;
  socket: any;
}

const RequestModal: React.FC<PropsType> = ({
  showRequestModal,
  setShowRequestModal,
  setIsLoadingBtn,
  dataUserRequestInfo,
  socket,
}) => {
  const handleCancel = () => {
    setShowRequestModal(false);
    socket.off("add_invite_optional_response");
    socket.emit("add_invite_optional", {
      ...dataUserRequestInfo,
      userAnswer: false,
    });
  };

  const handleAccept = () => {
    // const postInvite = {
    //   parentId: item?.id,
    //   userId: userIdFromSStorage,
    //   movieId: movieData?.movieId,
    // };
    // socket.off("add_invite_optional_response");
    socket.emit("add_invite_optional", {
      ...dataUserRequestInfo,
      userAnswer: true,
    });
    setShowRequestModal(false);
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off("add_invite_optional_response");
      }
      setIsLoadingBtn(false);
    };
  }, [socket]);

  return (
    <Modal
      isOpen={showRequestModal}
      setIsOpen={setShowRequestModal}
      padding={0}
      className="rounded-2xl"
      title="Request user"
      footer={[
        <div className="flex p-3 justify-center gap-2">
          <Button
            onClick={handleAccept}
            type="button"
            variant={"green"}
            label="Accept"
          />
          <Button
            onClick={handleCancel}
            type="button"
            variant={"outLine_secondary"}
            label="Cancel"
          />
        </div>,
      ]}
    >
      <div className="container justify-between items-center my-2">
        <ImageRank
          imgSize={60}
          rankStyle="w-8 h-8"
          imgSrc={dataUserRequestInfo.userImage}
          userName={dataUserRequestInfo?.userName}
          iconProfileStyle="font60 text-gray-800"
        />
        <div className="flex flex-row mt-10 ">
          A user has sent you a request. Would you like to accept?
        </div>
      </div>
    </Modal>
  );
};

export default RequestModal;
