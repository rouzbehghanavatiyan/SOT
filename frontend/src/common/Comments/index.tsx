import ImageRank from "../../components/ImageRank";
import ChatFields from "../ChatFields";

const image =
  "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg";

const Comments: React.FC = ({ handleShowCMT, closingComments }) => {
  return (
    <div>
      <div
        className={`fixed inset-0 flex flex-col justify-end bg-opacity-70 z-40`}
        onClick={handleShowCMT}
      >
        <div
          className={`bg-white shadow-2xl shadow-card w-full h-[80vh] rounded-t-lg overflow-hidden ${closingComments ? "animate-slideDown" : "animate-slideUp"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto ">
            <h2 className="text-center bg-gray-100 p-4">Comments</h2>
            {[...Array(10)].map((_, index) => (
              <div key={index}>
                <div className="grid-cols-6 grid p-2">
                  <ImageRank
                    className={`rounded-full h-[10px] w-[10px] object-cover `}
                    rankStyle="w-7 h-7"
                    imgSize={35}
                    iconProfileStyle="font20 text-gray-200"
                    score={20}
                    imgSrc={image}
                  />
                  <p className="col-span-6 m-2 ">
                    test test test test test test test test test test test test
                    test test test test test test test test test test test test
                    test test test test test test test test test test test test
                    test test test test test test test test test test test test
                    test test test test test test test test test test test test
                    test test test test test
                  </p>
                </div>
                <hr className="my-2" />
              </div>
            ))}
          </div>
        </div>
        <ChatFields />
      </div>
    </div>
  );
};

export default Comments;
