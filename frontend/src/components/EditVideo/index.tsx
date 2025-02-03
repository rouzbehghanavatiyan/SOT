import React, { useState } from "react";
import Input from "../Input";
import { Button } from "../Button";
import SlideRange from "../SlideRange";
import Modal from "../Modal";
import asyncWrapper from "../../common/AsyncWrapper";
import { addMovie } from "../../services/dotNet";

const EditVideo: React.FC = ({
  showEditMovie,
  setShowEditMovie,
  coverImage,
  allFormData,
}: any) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rate, setRate] = useState(0);

  console.log(allFormData);
  const handleAccept = asyncWrapper(async () => {
    const res = await addMovie(allFormData);
    console.log("داده‌ها با موفقیت ارسال شدند:", res.data);
  });

  return (
    <Modal isOpen={showEditMovie} onClose={setShowEditMovie}>
      <div className="border-b-2 px-3 flex justify-between text-center items-center">
        <span className="font-bold text-2xl flex justify-start">SOT</span>
      </div>
      <div className="flex flex-col">
        <div className="border p-1">
          {coverImage && (
            <img
              src={coverImage}
              alt="Video Cover"
              className="w-full h-full rounded-sm"
            />
          )}
        </div>
        <span className="mb-1 mt-4 ">Title</span>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <span className="mb-1 mt-4 ">Description</span>
        <textarea
          className="resize-y border focus:border-none outline-mainGray-dark px-5 py-1"
          rows={6}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <SlideRange
          rangeValue={rate}
          setRangeValue={(e) => setRate(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <Button
          className="border"
          onClick={handleAccept}
          variant={"green"}
          label="Accept"
        />
        <Button
          className="border"
          onClick={() => setShowEditMovie(false)}
          variant={"outLine_secondary"}
          label="Close"
        />
      </div>
    </Modal>
  );
};

export default EditVideo;
