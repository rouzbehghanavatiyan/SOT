import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";

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
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;

    if (isLoading) {
      setTimer(60);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

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
          label={timer}
          onClick={onAccept}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
