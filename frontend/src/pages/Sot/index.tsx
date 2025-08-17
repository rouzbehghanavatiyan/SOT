import React, { useEffect, useState } from "react";
import Arena from "./Arena";
import Skill from "./Skill";
import Gear from "./Gear";
import Mode from "./Mode";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  modeList,
  subCategoryList,
  subSubCategoryList,
} from "../../services/dotNet";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";

const Sot: React.FC = () => {
  const [stepsData, setStepsData] = useState([
    { title: "", icon: "" },
    { title: "", icon: "" },
    { title: "", icon: "" },
    { title: "", icon: "" },
  ]);
  const [allSubCategory, setAllSubCategory] = useState<any>();
  const [currentStep, setCurrentStep] = useState({
    number: 1,
    arena: null,
    skill: null,
    gear: null,
    mode: null,
  });

  const updateStepData = (stepNumber: number, data: any) => {
    const updatedSteps = stepsData?.map((step, index) =>
      index === stepNumber - 1 ? { title: data.name, icon: data.icon } : step
    );
    setStepsData(updatedSteps);

    setCurrentStep((prev) => ({
      ...prev,
      [stepNumber === 1
        ? "arena"
        : stepNumber === 2
          ? "skill"
          : stepNumber === 3
            ? "gear"
            : stepNumber === 4
              ? "mode"
              : ""]: data,
      number: stepNumber + 1,
    }));
  };

  const renderCurrentStep = () => {
    switch (currentStep.number) {
      case 1:
        return (
          <Arena
            allSubCategory={allSubCategory}
            setAllSubCategory={setAllSubCategory}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            updateStepData={updateStepData}
          />
        );
      case 2:
        return (
          <Skill
            allSubCategory={allSubCategory}
            setAllSubCategory={setAllSubCategory}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            updateStepData={updateStepData}
          />
        );
      case 3:
        return (
          <Gear
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            updateStepData={updateStepData}
          />
        );
      case 4:
        return (
          <Mode
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            updateStepData={updateStepData}
          />
        );
      default:
        return (
          <Mode
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            updateStepData={updateStepData}
          />
        );
    }
  };

  const checkChoiceSot = async () => {
    if (!!localStorage.getItem("arenaId")) {
      setCurrentStep((prv) => ({
        ...prv,
        number: 2,
      }));
      setStepsData([
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
      ]);
      const res = await subCategoryList(localStorage.getItem("arenaId"));
      const { data, status } = res?.data;
      if (status === 0) {
        setAllSubCategory(data || []);
      }
    }

    if (
      !!localStorage.getItem("arenaId") &&
      !!localStorage.getItem("skillId")
    ) {
      setCurrentStep((prv) => ({
        ...prv,
        number: 2,
      }));
      setStepsData([
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
      ]);
      const res = await subSubCategoryList(localStorage.getItem("skillId"));
      const { data, status } = res?.data;
      if (status === 0) {
        setAllSubCategory(data || []);
      }
    }

    if (
      !!localStorage.getItem("gearId") &&
      !!localStorage.getItem("skillId") &&
      !!localStorage.getItem("arenaId")
    ) {
      setCurrentStep((prv) => ({
        ...prv,
        number: 2,
      }));
      setStepsData([
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
        { title: "Solo", icon: <EmojiEventsIcon className="text-2xl" /> },
      ]);
      const res = await modeList();
      const { data, status } = res?.data;
      if (status === 0) {
        setAllSubCategory(data || []);
      }
    }
  };

  useEffect(() => {
    checkChoiceSot();
  }, []);

  return (
    <>
      <section className="mt-4 mb-3 w-full gap-10 flex flex-col items-center">
        <div className="flex gap-4">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className={`w-14 h-14 rounded-full cursor-pointer ${
                index + 1 <= currentStep.number ? "bg-green" : "bg-gray-200"
              }`}
              onClick={() =>
                setCurrentStep({ ...currentStep, number: index + 1 })
              }
            >
              <div className="h-full flex font8 text-white flex-col items-center justify-center">
                {step.icon}
                <span className="font10 font-bold">{step.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <span>{renderCurrentStep()}</span>
    </>
  );
};

export default Sot;
