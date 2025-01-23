import React from "react";

const Comments = ({ handleShowCMT, closingComments }) => {
  return (
    <div
      className={`fixed inset-0 flex items-end justify-center bg-black bg-opacity-70 z-50`}
      onClick={handleShowCMT}
    >
      <div
        className={`bg-white w-full h-1/2 rounded-t-lg ${closingComments ? "animate-slideDown" : "animate-slideUp"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center p-4">Comments</h2>
        <button
          onClick={handleShowCMT}
          className="m-4 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Comments;