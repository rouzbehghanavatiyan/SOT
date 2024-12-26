import { PropTypes } from "./Types";
import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoTC from "../../../assets/img/1724181984017.jpg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = PropTypes;

const SidebarLinks: React.FC<Props> = ({ open }) => {
  return (
    <>
      <div className="bg-white shadow-lg px-4 h-full"> {/* Set h-full here */}
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
            <div className="my-8 flex justify-center">
              <GroupsIcon />
            </div>
          </Link>
          <Link to={"/cup"}>
            <div className="my-8 flex justify-center">
              <EmojiEventsIcon />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SidebarLinks;