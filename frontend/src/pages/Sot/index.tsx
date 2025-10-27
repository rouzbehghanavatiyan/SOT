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
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Icon } from "../../components/Icon";

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
    try {
      const arenaId = localStorage.getItem("arenaId");
      const skillId = localStorage.getItem("skillId");
      const gearId = localStorage.getItem("gearId");

      const arenaIconName = localStorage.getItem("arenaIconName");
      const skillIconName = localStorage.getItem("skillIconName");
      const gearIconName = localStorage.getItem("gearIconName");

      const arenaName = localStorage.getItem("arenaName");
      const skillName = localStorage.getItem("skillName");
      const gearName = localStorage.getItem("gearName");

      if (arenaId) {
        const res = await subCategoryList(arenaId);
        const { data, status } = res?.data;
        if (status === 0) {
          setAllSubCategory(data || []);
          const arenaData = data.find(
            (item: any) => item.id === parseInt(arenaId)
          );
          setCurrentStep((prev: any) => ({
            ...prev,
            number: 2,
            arena: arenaData,
          }));
          setStepsData((prev: any) => [
            {
              title: arenaData?.name || arenaName,
              icon: <Icon name={arenaIconName} className="text-2xl" />,
            },
            prev[1],
            prev[2],
            prev[3],
          ]);
        }
      }

      if (arenaId && skillId) {
        const res = await subSubCategoryList(skillId);
        const { data, status } = res?.data;
        if (status === 0) {
          setAllSubCategory(data || []);
          const skillData = data.find(
            (item: any) => item.id === parseInt(skillId)
          );
          setCurrentStep((prev: any) => ({
            ...prev,
            number: 3,
            skill: skillData,
          }));
          setStepsData((prev: any) => [
            prev[0],
            {
              title: skillData?.name || skillName,
              icon: <Icon name={skillIconName} className="text-2xl" />,
            },
            prev[2],
            prev[3],
          ]);
        }
      }

      if (arenaId && skillId && gearId) {
        const res = await modeList();
        const { data, status } = res?.data;
        if (status === 0) {
          setAllSubCategory(data || []);
          const gearData = data.find(
            (item: any) => item.id === parseInt(gearId)
          );
          setCurrentStep((prev: any) => ({
            ...prev,
            number: 4,
            gear: gearData,
          }));
          setStepsData((prev: any) => [
            prev[0],
            prev[1],
            {
              title: gearData?.name || gearName,
              icon: <Icon name={gearIconName} className="text-2xl" />,
            },
            prev[3],
          ]);
        }
      }
    } catch (error) {
      console.error("خطا در بررسی ذخیره‌سازی:", error);
    }
  };

  useEffect(() => {
    checkChoiceSot();
  }, []);

  return (
    <>
      <section className="mt-2 mb-3 w-full gap-10 flex flex-col items-center">
        <div className="flex gap-4 overflow-auto ">
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
