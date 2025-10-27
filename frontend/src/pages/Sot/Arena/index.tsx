import React, { useState } from "react";
import MainTitle from "../../../components/MainTitle";
import SoftLink from "../../../hoc/SoftLinks";
import { useAppSelector } from "../../../hooks/reduxHookType";
import { Icon } from "../../../components/Icon";

const Arena: React.FC<any> = ({ updateStepData }) => {
  const main = useAppSelector((state) => state?.main);
  const [arenaName, setArenaName] = useState<any>({});
  const iconClass = "mx-3 font25";
  const disabledIconClass = "text-gray-200 mx-3 font25";

  const iconNameMap: Record<string, string> = {
    cup: "EmojiEvents",
    friendly: "Handshake",
    group: "Groups",
    robot: "SmartToy",
    solo: "Person",
  };

  const arenaIconMap: Record<string, JSX.Element> = {
    cup: <Icon name="EmojiEvents" className={disabledIconClass} />,
    friendly: <Icon name="Handshake" className={disabledIconClass} />,
    group: <Icon name="Groups" className={iconClass} />,
    robot: <Icon name="SmartToy" className={disabledIconClass} />,
    solo: <Icon name="Person" className={iconClass} />,
  };

  const handleAcceptCategory = (data: any) => {
    const actualIconName = iconNameMap[data.icon] || data.icon;

    updateStepData(1, {
      name: data.name,
      id: data.id,
      icon: arenaIconMap[data.icon],
    });

    if (data.icon === "robot") {
      return;
    }

    localStorage.setItem("arenaId", data.id);
    localStorage.setItem("arenaIconName", actualIconName);
    localStorage.setItem("arenaName", data.name);
    setArenaName({ iconName: actualIconName });
  };

  const categoriesWithIcons = main?.category?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
  }));

  return (
    <div className="lg:shadow-card">
      <MainTitle title="Arena" />
      <SoftLink
        iconMap={arenaIconMap}
        handleAcceptCategory={handleAcceptCategory}
        categories={categoriesWithIcons || []}
      />
    </div>
  );
};

export default Arena;
