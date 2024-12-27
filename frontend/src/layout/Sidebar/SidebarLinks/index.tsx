import { PropTypes } from "./Types";
import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoTC from "../../../assets/img/1724181984017.jpg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SmartToyIcon from '@mui/icons-material/SmartToy';

type Props = PropTypes;

const SidebarLinks: React.FC<Props> = ({ open }) => {
  return (
    <>
      <div className="bg-white fixed shadow-lg px-4 h-screen ">
        <div className="my-10">
          <span className="flex items-center justify-center">
            <ArrowForwardIosIcon />
          </span>
          <Link to={"/solo"}>
            <div className="my-8 flex justify-center">
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
                <GroupsIcon className="flex justify-center font40 text-orange-hover" />
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
      </div>
    </>
  );
};

export default SidebarLinks;