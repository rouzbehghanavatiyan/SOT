import { PropTypes } from "./Types";
import React from "react";
import { Link } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoTC from "../../assets/img/1724181984017.jpg";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/tw-utils";

type Props = PropTypes;

const SidebarLinks: React.FC<Props> = () => {
  return (
    <nav className="bg-gray-900 w-[10%] select-none shadow-card h-full border-gray-100 border-e px-6">
      <div className="fixed">
        <NavLink
          to="/sot"
          className={({ isActive }) =>
            cn(
              "flex items-center justify-center mt-8",
              isActive ? "text-primary " : "text-gray-200"
            )
          }
        >
          <img
            src={LogoTC}
            alt="Logo"
            className="rounded-full"
            width={35}
            height={35}
          />
        </NavLink>

        <NavLink
          to="/friendly"
          className={({ isActive }) =>
            cn(
              "flex items-center justify-center",
              isActive ? "text-primary" : "text-gray-200"
            )
          }
        >
          <div className="mt-8 flex flex-col justify-center">
            <span className="flex justify-center">
              <HandshakeIcon className="flex justify-center font40 text-dark" />
            </span>
            <span className="flex justify-center font-bold">Friendly</span>
          </div>
        </NavLink>
        <NavLink
          to="/cup"
          className={({ isActive }) =>
            cn(
              "flex items-center justify-center",
              isActive ? "text-primary" : "text-gray-200"
            )
          }
        >
          <div className="mt-8 flex flex-col justify-center">
            <span className=" flex justify-center">
              <EmojiEventsIcon className="flex justify-center font40 text-dark" />
            </span>
            <span className="flex justify-center font-bold ">Cup</span>
          </div>
        </NavLink>
        <NavLink
          to="/robot"
          className={({ isActive }) =>
            cn(
              "flex items-center justify-center",
              isActive ? "text-primary" : "text-gray-200"
            )
          }
        >
          <div className="mt-8 flex flex-col justify-center">
            <span className=" flex justify-center">
              <SmartToyIcon className="flex justify-center font40 text-dark" />
            </span>
            <span className="flex justify-center font-bold">Robot</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default SidebarLinks;
