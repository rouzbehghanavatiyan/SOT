import { useEffect, useRef, useState } from "react";
import ImageRank from "../../components/ImageRank";
import ChatFields from "../ChatFields";
import { addComment, commentList } from "../../services/dotNet";
import { useAppSelector } from "../../hooks/hook";
import MessageInput from "../../pages/ChatRoom/PrivateChat/MessageInput";

const Comments: React.FC<any> = ({
  handleShowCMT,
  closingComments,
  movieInfo,
}) => {
  const { main } = useAppSelector((state) => state);
  const [title, setTitle] = useState<any>("");
  const [allComments, setAllComments] = useState<any>([]);
  const [showStickers, setShowStickers] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData: any = {
      userId: Number(main?.userLogin?.userId),
      movieId: movieInfo?.movieId,
      desc: title,
    };
    const res = await addComment(postData);
    const { data, status } = res?.data;
    console.log(data);
    if (status === 0) {
      setTitle("");
      titleInputRef.current?.focus();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setTitle((prev: any) => prev + emoji.emoji);
    setShowStickers(false);
  };

  const handleGetAllList = async () => {
    try {
      const res = await commentList();
      const { data, status } = res?.data;
      if (status === 0) {
        setAllComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllList();
  }, []);

  const handleInputFocus = (e: React.FocusEvent) => {
    e.stopPropagation();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      titleInputRef.current &&
      !titleInputRef.current.contains(e.target as Node)
    ) {
      // handleShowCMT();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`fixed inset-0 mb-24 flex flex-col justify-end bg-opacity-70 z-40`}
      >
        <div
          ref={commentsRef}
          className={`bg-white  relative shadow-card  w-full h-[60vh]  overflow-hidden ${closingComments ? "animate-slideDown" : "animate-slideUp"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full  overflow-y-auto  ">
            <div className="text-center fixed w-full z-20 border-b-[1px] mb-4 font-bold font15 bg-gray-100 p-4">
              <div className=" ">
                <span className=" ">Comments</span>
              </div>
            </div>
            {allComments > 0 &&
              allComments.map((item: any, index: number) => (
                <div key={index}>
                  <div className=" grid-cols-6 grid p-2 border-b-[1px] border-gray-150 mb-4">
                    <ImageRank
                      className={`rounded-full h-[10px] w-[10px] object-cover `}
                      rankStyle="w-9 h-9"
                      imgSize={35}
                      userName="userName"
                      iconProfileStyle="font60 text-gray-200"
                      score={20}
                      imgSrc={""}
                    />
                    <p className="col-span-6 mt-5 m-2 ">test</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <span className="w-full bg-gray-100 fixed bottom-0">
          <MessageInput
            title={title}
            setTitle={setTitle}
            handleSendMessage={handleSendMessage}
            titleInputRef={titleInputRef}
            setShowStickers={setShowStickers}
            onEmojiSelect={handleEmojiSelect}
            showStickers={showStickers}
            onInputFocus={handleInputFocus}
          />
        </span>
      </div>
    </div>
  );
};

export default Comments;
