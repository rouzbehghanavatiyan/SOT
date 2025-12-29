import React from "react";
import { Button } from "../../components/Button";
import { ButtonTimer } from "../../components/Timer/ButtonTimer";
import { useAppSelector } from "../../hooks/reduxHookType";

interface CoverConfirmStepProps {
  coverImage: string;
  onBack: () => void;
  onAccept: () => void;
  isLoading: boolean;
}

const VIDEO_CONTAINER_STYLE = {
  width: "400px",
  height: "300px",
  objectFit: "contain" as const,
  backgroundColor: "#000",
};

export const CoverConfirmStep: React.FC<CoverConfirmStepProps> = ({
  coverImage,
  onBack,
  onAccept,
  isLoading,
}) => {
  const showTimerButtn = useAppSelector((state) => state.main.showTimerButtn);

  return (
    <div className="p-5">
      {coverImage && (
        <>
          <span className="my-4 font-bold">Your cover: </span>
          <img
            src={coverImage}
            alt="Video Cover"
            style={VIDEO_CONTAINER_STYLE}
            className="rounded-sm mx-auto"
          />
        </>
      )}

      <div className="mt-4 flex justify-between">
        <Button
          className="border"
          variant={"outLine_secondary"}
          label="Back"
          onClick={onBack}
        />

        <Button
          className="border"
          variant={"green"}
          label={showTimerButtn ? <ButtonTimer show={showTimerButtn} /> : "Start"}
          onClick={onAccept}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
