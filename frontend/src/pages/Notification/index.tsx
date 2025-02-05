import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import ImageRank from "../../components/ImageRank";
import { Button } from "../../components/Button";

const Notification: React.FC = () => {
  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <section className="grid justify-center">
          <div className="w-screen p-2 md:w-full  h-screen md:h-full">
            <ImageRank profileFontColor="black" profileName="rabert_igo" />
            <div className="flex justify-end gap-3">
              <Button variant={"green"} label="Confirm" />
              <Button
                className=""
                variant={"outLine_secondary"}
                label="Cancel"
              />
            </div>
            <ImageRank profileFontColor="black" profileName="rabert_igo" />
            <div className="flex justify-end gap-3">
              <Button variant={"green"} label="Confirm" />
              <Button
                className=""
                variant={"outLine_secondary"}
                label="Cancel"
              />
            </div>
            <ImageRank profileFontColor="black" profileName="rabert_igo" />
            <div className="flex justify-end gap-3">
              <Button variant={"green"} label="Confirm" />
              <Button
                className=""
                variant={"outLine_secondary"}
                label="Cancel"
              />
            </div>
          </div>
          <div className=" px-3 flex justify-between text-center items-center"></div>
        </section>
      </ResponsiveMaker>
    </>
  );
};

export default Notification;
