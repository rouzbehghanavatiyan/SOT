import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import LearningStepOne from "./LearningStepOne";
import LearningStepTwo from "./LearningStepTwo";
import LearningStepThree from "./LearningStepThree";
import LearningStepFour from "./LearningFour";
import LearningStepFive from "./LearningStepFive";

const LearningSot: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <LearningStepOne />;
      case 2:
        return <LearningStepTwo />;
      case 3:
        return <LearningStepThree />;
      case 4:
        return <LearningStepFour />;
      case 5:
        return <LearningStepFive />;
      default:
        return <LearningStepOne />;
    }
  };

  return (
    <section className=" w-full gap-10 flex flex-col items-center pt-8">
      {renderCurrentStep()}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full ${
              step <= currentStep ? "bg-green" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="flex gap-3">
        <Button
          className="select-none"
          variant="ghost"
          label="Skip"
          onClick={handleSkip}
        />
        <Button
          className="select-none"
          variant="green"
          label={currentStep === 5 ? "Finish" : "Next"}
          onClick={handleNext}
        />
      </div>
    </section>
  );
};

export default LearningSot;
