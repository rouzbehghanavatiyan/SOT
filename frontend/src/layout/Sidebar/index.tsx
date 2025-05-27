import { PropTypes } from "./Types";
import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoTC from "../../assets/img/1724181984017.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import HandshakeIcon from "@mui/icons-material/Handshake";

type Props = PropTypes;

const SidebarLinks: React.FC<Props> = () => {
  return (
    <div className="bg-gray-100 shadow sticky top-20 px-3">
      <Link to={"/solo"}>
        <div className="my-4 flex justify-center">
          <img
            src={LogoTC}
            alt="Logo"
            className="rounded-full"
            width={35}
            height={35}
          />
        </div>
      </Link>
      <Link to={"/friendly"}>
        <div className="my-8 flex flex-col justify-center">
          <span className=" flex justify-center">
            <HandshakeIcon className="flex justify-center font40 text-orange-hover" />
          </span>
          <span className="flex justify-center font-bold text-gray-800">
            Friendly
          </span>
        </div>
      </Link>
      <Link to={"/cup"}>
        <div className="my-8 flex flex-col justify-center">
          <span className="flex justify-center">
            <EmojiEventsIcon className="flex justify-center font40 text-orange-hover" />
          </span>
          <span className="flex justify-center font-bold text-gray-800">
            Cup
          </span>
        </div>
      </Link>
      <Link to={"/robot"}>
        <div className="my-8 flex flex-col justify-center">
          <span className="flex justify-center">
            <SmartToyIcon className="flex justify-center font40 text-orange-hover" />
          </span>
          <span className="flex justify-center font-bold text-gray-800">
            Robot battle
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLinks;
