import React, { useEffect, useState } from "react";
import Arena from "./Arena";
import Skill from "./Skill";
import Gear from "./Gear";
// import Mode from "./Mode"; // حذف شد
import { subCategoryList, subSubCategoryList } from "../../services/dotNet";
import { Icon } from "../../components/Icon";

const initialSteps = [
  { title: "", icon: "", session: "Arena" },
  { title: "", icon: "", session: "Skill" },
  { title: "", icon: "", session: "Gear" },
];

const initialCurrentStep = {
  number: 1,
  arena: null,
  skill: null,
  gear: null,
};

const Sot: React.FC = () => {
  const [stepsData, setStepsData] = useState(initialSteps);
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    return localStorage.getItem("rememberMe") === "true";
  });

  const [allSubCategory, setAllSubCategory] = useState<any>();
  const [currentStep, setCurrentStep] = useState(initialCurrentStep);

  useEffect(() => {
    localStorage.setItem("rememberMe", String(rememberMe));
  }, [rememberMe]);

  const updateStepData = (stepNumber: number, data: any) => {
    const updatedSteps: any = stepsData?.map((step, index) =>
      index === stepNumber - 1 ? { title: data.name, icon: data.icon } : step,
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
            : ""]: data,
      number: stepNumber + 1,
    }));
  };

  const resetSot = () => {
    setStepsData(initialSteps);
    setCurrentStep(initialCurrentStep);
    setAllSubCategory([]);
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
      default:
        return (
          <Gear
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            updateStepData={updateStepData}
          />
        );
    }
  };

  const checkChoiceSot = async () => {
    if (!rememberMe) {
      localStorage.removeItem("arenaId");
      localStorage.removeItem("skillId");
      localStorage.removeItem("gearId");
      localStorage.removeItem("arenaIconName");
      localStorage.removeItem("skillIconName");
      localStorage.removeItem("gearIconName");
      localStorage.removeItem("arenaName");
      localStorage.removeItem("skillName");
      localStorage.removeItem("gearName");
      resetSot();
      return;
    }

    try {
      const arenaId = localStorage.getItem("arenaId");
      const skillId = localStorage.getItem("skillId");
      const arenaIconName = localStorage.getItem("arenaIconName");
      const skillIconName = localStorage.getItem("skillIconName");
      const arenaName = localStorage.getItem("arenaName");
      const skillName = localStorage.getItem("skillName");

      if (arenaId) {
        const res = await subCategoryList(arenaId);
        const { data, status } = res?.data;
        if (status === 0) {
          setAllSubCategory(data || []);
          const arenaData = (data || []).find(
            (item: any) => item.id === parseInt(arenaId),
          );
          setCurrentStep((prev: any) => ({
            ...prev,
            number: 2,
            arena: arenaData,
          }));
          setStepsData((prev: any) => [
            { title: arenaName, icon: arenaIconName },
            prev[1],
            prev[2],
          ]);
        }
      }

      if (arenaId && skillId) {
        const res = await subSubCategoryList(skillId);
        const { data, status } = res?.data;
        if (status === 0) {
          setAllSubCategory(data || []);
          const skillData = (data || []).find(
            (item: any) => item.subCategoryId === parseInt(skillId),
          );
          setCurrentStep((prev: any) => ({
            ...prev,
            number: 3,
            skill: skillData,
          }));
          setStepsData((prev: any) => [
            prev[0],
            { title: skillName, icon: skillIconName },
            prev[2],
          ]);
        }
      }
    } catch (error) {
      console.error("server error:", error);
    }
  };

  useEffect(() => {
    checkChoiceSot();
  }, []);

  return (
    <div className="h-[calc(100svh-100px)] sm:w-full lg:w-3/4">
      <div className="mt-3 lg:my-5">
        <div className="ms-2 flex gap-2 items-center justify-center">
          <input
            checked={rememberMe}
            onChange={(e) => {
              setRememberMe(e.target.checked);
              if (!e.target.checked) resetSot();
            }}
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-5 w-5 text-blue-600 focus:text-gray-800 border-gray-300 rounded"
          />
          <label className="font14 font-bold">Remember talent</label>
        </div>
      </div>
      <section className="mt-3 lg:mb-5 gap-10 flex flex-col justify-center items-center">
        <div className="flex gap-4 overflow-auto">
          {stepsData.map((step, index) => {
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full cursor-pointer ${
                    index < currentStep.number ? "bg-green" : "bg-gray-200"
                  }`}
                  onClick={() =>
                    setCurrentStep({ ...currentStep, number: index + 1 })
                  }
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-white">
                    <Icon name={step?.icon} className="font30" />
                    <span className="font11 leading-none mt-1">
                      {step?.title}
                    </span>
                  </div>
                </div>
                <span className="text-xs font13 my-2 text-gray-600">
                  {["Arena", "Skill", "Gear"][index]}
                </span>
              </div>
            );
          })}
        </div>
      </section>
      <span>{renderCurrentStep()}</span>
    </div>
  );
};

export default Sot;
