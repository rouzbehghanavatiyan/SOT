import { useEffect, useRef, useState } from "react";
import ImageRank from "../../components/ImageRank";
import { addComment, commentList } from "../../services/dotNet";
import { useAppSelector } from "../../hooks/hook";
import MessageInput from "../../pages/ChatRoom/PrivateChat/MessageInput";
import CloseIcon from "@mui/icons-material/Close";
import StringHelpers from "../../utils/helpers/StringHelper";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Comments: React.FC<any> = ({
  setClosingComments,
  handleShowCMT,
  showComments,
  positionVideo,
  setShowComments,
  closingComments,
  movieInfo,
}) => {
  const main = useAppSelector((state) => state?.main);
  const [title, setTitle] = useState<string>("");
  const [allComments, setAllComments] = useState<any>([]);
  const [showStickers, setShowStickers] = useState(false);
  const [answerInfo, setAnswerInfo] = useState<any>(null);
  const [answerData, setAnswerData] = useState<any>({});
  const titleInputRef = useRef<HTMLInputElement>(null);

  const getMovieId =
    positionVideo === 0
      ? movieInfo?.attachmentInserted?.attachmentId
      : movieInfo?.attachmentMatched?.attachmentId;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title !== "") {
      const postData: any = {
        userId: main?.userLogin?.user?.id,
        movieId: getMovieId,
        desc: title.trim(),
        ParentId: answerData?.id || null,
      };
      const res = await addComment(postData);
      const { data, status } = res?.data;
      if (status === 0) {
        setTitle("");
        handleGetAllList();
        titleInputRef.current?.focus();
        setAnswerInfo(null);
      }
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setTitle((prev: any) => prev + emoji.emoji);
    setShowStickers(false);
  };

  const handleGetAllList = async () => {
    try {
      const res = await commentList(getMovieId);
      const { data, status } = res?.data;
      console.log(data);

      if (status === 0) {
        const commentsHierarchy = data.reduce((acc: any, comment: any) => {
          if (!comment.parentId) {
            acc.push({ ...comment, replies: [] });
          } else {
            const parentComment = acc.find(
              (c: any) => c.id === comment.parentId
            );
            if (parentComment) {
              parentComment.replies.push(comment);
            }
          }
          return acc;
        }, []);
        setAllComments(commentsHierarchy);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllList();
  }, [showComments]);

  useEffect(() => {
    if (showComments) {
      document.body.style.overflow = "hidden";

      const swiperContainer = document.querySelector(".swiper-container");
      if (swiperContainer) {
        swiperContainer.style.pointerEvents = "none";
      }
    } else {
      document.body.style.overflow = "auto";

      const swiperContainer = document.querySelector(".swiper-container");
      if (swiperContainer) {
        swiperContainer.style.pointerEvents = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
      const swiperContainer = document.querySelector(".swiper-container");
      if (swiperContainer) {
        swiperContainer.style.pointerEvents = "auto";
      }
    };
  }, [showComments]);

  const handleInputFocus = (e: React.FocusEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setClosingComments(true);
    setTimeout(() => {
      setShowComments(false);
      setClosingComments(false);
    }, 150);
  };

  const toggleComments = () => {
    if (closingComments) return;
    handleClose();
  };

  const handleAnswerComments = (item: any) => {
    setAnswerInfo((prev: any) => (prev?.id === item?.id ? null : item));
    setAnswerData(item);
    titleInputRef.current?.focus();
  };

  return (
    <>
      {showComments && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          style={{ pointerEvents: "all" }}
          onClick={(e) => e.stopPropagation()}
        ></div>
      )}

      <div
        className={`fixed inset-0 flex flex-col justify-end bg-opacity-70 z-50`}
      >
        <div
          className={`bg-white relative shadow-card w-full h-[70vh] overflow-hidden ${
            closingComments ? "animate-slideDown" : "animate-slideUp"
          }`}
        >
          <div
            className="h-full overflow-y-auto"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="text-center fixed w-full z-20 border-b-[1px] mb-4 font-bold font15 bg-gray-100 p-2">
              <div className="grid grid-cols-5 items-center">
                <div className="col-span-1 flex justify-start">
                  <ImageRank
                    className="rounded-full object-cover"
                    rankStyle="w-9 h-9"
                    userNameStyle="text-black"
                    iconProfileStyle="font35"
                    imgSize={45}
                    userName={
                      positionVideo === 0
                        ? movieInfo?.userInserted?.userName
                        : movieInfo?.userMatched?.userName
                    }
                    imgSrc={
                      positionVideo === 0
                        ? StringHelpers.getProfile(movieInfo?.profileInserted)
                        : StringHelpers.getProfile(movieInfo?.profileMatched)
                    }
                  />
                </div>

                <div className="col-span-3 flex justify-center">
                  <span>Comments</span>
                </div>

                <div className="col-span-1 flex justify-end">
                  <CloseIcon
                    onClick={toggleComments}
                    className="text-primary font20 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="py-20">
              {allComments.length > 0 ? (
                allComments.map((item: any) => (
                  <div key={item?.id}>
                    <div className="py-1 p-2  border-b-[1px] border-gray-150">
                      <ImageRank
                        userNameStyle="text-black"
                        imgSize={35}
                        userName={item.userName}
                        score={item.score}
                        imgSrc={StringHelpers.getProfile(item.profile)}
                      />
                      <div className="flex justify-between items-center">
                        <p className="col-span-6 m-2 container_message text-gray-800">
                          {item.desc}
                        </p>
                        <ArrowForwardIosIcon
                          onClick={() => handleAnswerComments(item)}
                          className="m-2 font15 cursor-pointer"
                        />
                      </div>
                    </div>
                    {answerInfo?.id === item?.id && (
                      <div className="p-4 bg-gray-100 flex gap-2">
                        <span className="font-bold">
                          @{main?.userLogin?.user?.userName}
                        </span>
                        <span className=" text-gray-800 container_message">
                          {title}
                        </span>
                      </div>
                    )}
                    {item?.replies?.length > 0 &&
                      item?.replies?.map((reply: any) => (
                        <div
                          key={reply.id}
                          className="ml-6 pl-4 bg-gray-100  border-gray-300"
                        >
                          <ImageRank
                            userNameStyle="text-black"
                            imgSize={30}
                            userName={reply.userName}
                            score={reply.score}
                            imgSrc={StringHelpers.getProfile(reply.profile)}
                          />
                          <p className="text-sm container_message text-gray-800">
                            {reply.desc}
                          </p>
                        </div>
                      ))}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center p-4">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="w-full bg-gray-100 fixed bottom-0">
          <MessageInput
            title={title}
            setTitle={setTitle}
            handleSendMessage={(e) => handleSendMessage(e)}
            titleInputRef={titleInputRef}
            setShowStickers={setShowStickers}
            onEmojiSelect={handleEmojiSelect}
            showStickers={showStickers}
            onInputFocus={handleInputFocus}
          />
        </span>
      </div>
    </>
  );
};

export default Comments;
