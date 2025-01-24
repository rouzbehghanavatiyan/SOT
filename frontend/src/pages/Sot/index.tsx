import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
const Sot = () => {
  return (
    <section className="w-full flex-col h-screen justify-center">
      <Link to={"/solo"}>
        <div className=" grid grid-cols-3">
          <span className="flex justify-center col-span-1">
            <PersonIcon className="font100 flex justify-center text-green-dark" />
          </span>
          <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
            solo
          </span>
        </div>
      </Link>
      <Link to={"/friendly"}>
        <div className="grid grid-cols-3">
          <span className="flex justify-center col-span-1">
            <GroupsIcon className="font100 flex justify-center text-green-dark" />
          </span>
          <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
            Friendly
          </span>
        </div>
      </Link>
      <Link to={"/cup"}>
        <div className="grid grid-cols-3">
          <span className="flex justify-center col-span-1">
            <EmojiEventsIcon className="font100 flex justify-center text-green-dark" />
          </span>
          <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
            Cup
          </span>
        </div>
      </Link>
      <div className="grid grid-cols-3">
        <span className="flex justify-center col-span-1">
          <SmartToyIcon className="font100 flex justify-center text-green-dark" />
        </span>
        <span className="text-gray-800 flex  items-center col-span-2 font20 font-bold">
          Robot
        </span>
      </div>
    </section>
  );
};

export default Sot;
