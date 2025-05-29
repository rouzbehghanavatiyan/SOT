import React from "react";
import logo from "../../../assets/img/1724181984017.jpg";

const LearningStepOne: React.FC = () => {
  return (
    <section className="w-full gap-10 flex flex-col items-center pt-8">
      <img
        width={200}
        height={200}
        alt="Logo"
        className="cursor-pointer rounded-full mb-4"
        src={String(logo)}
      />
      <h1 className="font25 flex justify-center font-bold text-center ">
        Personalized talent connections at your fingertips
      </h1>
      <p> Easy to navigate, visually appealing design. </p>
    </section>
  );
};

export default LearningStepOne;
