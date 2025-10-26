import React from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import MainTitle from "../../../components/MainTitle";
import SoftLink from "../../../hoc/SoftLinks";
import { useAppSelector } from "../../../hooks/reduxHookType";

const Arena: React.FC<any> = ({ updateStepData }) => {
  const iconClass = "mx-3 font25";
  const disabledIconClass = "text-gray-200 mx-3 font25";
  const main = useAppSelector((state) => state?.main);

  const arenaIconMap: Record<string, JSX.Element> = {
    cup: <EmojiEventsIcon className={disabledIconClass} />,
    friendly: <HandshakeIcon className={disabledIconClass} />,
    group: <GroupsIcon className={iconClass} />,
    robot: <SmartToyIcon className={disabledIconClass} />,
    solo: <PersonIcon className={iconClass} />,
  };

  const handleAcceptCategory = (data: any) => {
    updateStepData(1, {
      name: data.name,
      id: data.id,
      icon: arenaIconMap[data.icon],
    });
    if (data.icon === "robot") {
      return;
    }
    localStorage.setItem("arenaId", data.id);
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
