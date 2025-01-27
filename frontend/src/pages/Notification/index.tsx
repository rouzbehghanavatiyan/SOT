import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";

const Notification: React.FC = () => {
  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <section className="grid justify-center">
          <div className="w-screen md:w-full  h-screen md:h-full">
            <span className="border-b-2 font-bold text-2xl flex justify-center">
              Notification
            </span>
          </div>
          <div className=" px-3 flex justify-between text-center items-center"></div>
        </section>
      </ResponsiveMaker>
    </>
  );
};

export default Notification;
