import HandshakeIcon from "@mui/icons-material/Handshake";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import { useAppSelector } from "../../hooks/hook";
import SoftLink from "../../hoc/SoftLinks";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";

const TalentMode = () => {
  const iconClass = "text-2xl mx-3 font25";
  const { main } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  const iconMap: Record<string, JSX.Element> = {
    cup: <EmojiEventsIcon className={iconClass} />,
    friendly: <HandshakeIcon className={iconClass} />,
    group: <GroupsIcon className={iconClass} />,
    robot: <SmartToyIcon className={iconClass} />,
    solo: <PersonIcon className={iconClass} />,
  };

  const handleAcceptCategory = (data: any) => {
    const newPath = `${location.pathname}/${data?.name}`;
    navigate(newPath, { state: { category: data } });
  };

  const categoriesWithIcons = main?.category?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
  }));

  return (
    <SoftLink
      iconMap={iconMap}
      handleAcceptCategory={handleAcceptCategory}
      categories={categoriesWithIcons || []}
      isLoading={false}
    />
  );
};

export default TalentMode;
