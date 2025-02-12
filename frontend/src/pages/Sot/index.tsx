import React, { FC, useEffect, useState } from "react";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import asyncWrapper from "../../common/AsyncWrapper";
import { categoryList } from "../../services/dotNet";
import Loading from "../../components/Loading";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RsetCategory } from "../../common/Slices/main";

type Props = {};

const TalentMode: FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { main } = useAppSelector((state) => state);

  const [allCategory, setAllCategory] = useState<any[]>([]);
  const [showSettingSolo, setShowSettingSolo] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSettingSolo = () => {
    setShowSettingSolo(true);
  };

  const handleAcceptCategory = (data: any) => {
    console.log(data);
    const newPath = `${location.pathname}/${data?.name}`;
    navigate(newPath, { state: { category: data } });
  };

  const iconMap: { [key: string]: JSX.Element } = {
    cup: <EmojiEventsIcon className="text-2xl mx-3 font25" />,
    friendly: <HandshakeIcon className="text-2xl mx-3 font25" />,
    group: <GroupsIcon className="text-2xl mx-3 font25" />,
    robot: <SmartToyIcon className="text-2xl mx-3 font25" />,
    solo: <PersonIcon className="text-2xl mx-3 font25" />,
  };

  return (
    <>
      <Loading isLoading={isLoading ? true : false} />
      <div className="grid justify-center">
        <div className="w-screen md:w-full h-screen md:h-full ">
          {main?.category?.map((category) => (
            <span
              key={category?.id}
              onClick={() => handleAcceptCategory(category)}
              className="bg-green-dark w-full md:min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
            >
              {iconMap?.[category?.name.toLowerCase()]}{" "}
              <span className="font20 py-2">{category?.name}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TalentMode;
