import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

type Props = {};

const TalentMode: FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { main } = useAppSelector((state) => state);

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
      <div className="grid justify-center mt-12">
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
