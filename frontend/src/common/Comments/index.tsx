import React from "react";
import ChatFields from "../ChatFields";

const image =
  "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg";

const Comments = ({ handleShowCMT, closingComments }) => {
  return (
    <div>
      <div
        className={`fixed inset-0 flex flex-col justify-end bg-opacity-70 z-40`}
        onClick={handleShowCMT}
      >
        <div
          className={`bg-white w-full h-[80vh] rounded-t-lg overflow-hidden ${closingComments ? "animate-slideDown" : "animate-slideUp"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto">
            <h2 className="text-center p-4">Comments</h2>
            {[...Array(10)].map((_, index) => (
              <div key={index}>
                <div className="grid-cols-6 grid p-2">
                  <img
                    className="rounded-full ms-2"
                    src={image}
                    width={50}
                    height={50}
                    alt="Rank"
                  />
                  <span className="font-bold">Sara510</span>
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
