import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import ImageRank from "../../components/ImageRank";

const Notification: React.FC = () => {
  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <section className="grid justify-center">
          <div className="w-screen p-2 md:w-full md:h-full">
            <div className=" flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green text-white font-bold flex items-center px-6 py-1 rounded-md">
                  Accept
                </span>
                <span className="bg-white text-red border-red border-2 flex items-center px-6 py-1 rounded-md">
                  Cancel
                </span>
              </div>
            </div>
            <div className=" flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green text-white font-bold flex items-center px-6 py-1 rounded-md">
                  Accept
                </span>
                <span className="bg-white text-red border-red border-2 flex items-center px-6 py-1 rounded-md">
                  Cancel
                </span>
              </div>
            </div>
            <div className=" flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green text-white font-bold flex items-center px-6 py-1 rounded-md">
                  Accept
                </span>
                <span className="bg-white text-red border-red border-2 flex items-center px-6 py-1 rounded-md">
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </section>
      </ResponsiveMaker>
    </>
  );
};

export default Notification;
