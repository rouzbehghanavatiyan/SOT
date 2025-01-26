import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";

const Sot: React.FC = () => {
  return (
    <section className="grid justify-center">
      <div className="w-screen md:w-full  h-screen md:h-full">
        <div className="border-b-2 px-3 flex justify-between text-center items-center">
          <ResponsiveMaker hiddenWidth={975}>
            <Link to={"/sot"}>
              <ArrowBackIcon className="font20" />
            </Link>
          </ResponsiveMaker>
          <span className="font-bold text-2xl flex justify-start">SOT</span>
          <SettingsInputCompositeIcon
            // onClick={handleSettingSolo}
            className="flex cursor-pointer justify-between text-center items-center"
          />
        </div>
        <Link to={"/solo"}>
          <div className=" bg-green-dark w-full md:min-w-52 py-2 my-2 flex justify-start items-center text-white cursor-pointers">
            <span className="mx-3 flex justify-center col-span-1 ">
              <PersonIcon className="font25 flex justify-center text-white" />
            </span>
            <span className="text-white flex  items-center col-span-2 font20">
              Solo
            </span>
          </div>
        </Link>
        <Link to={"/group"}>
          <div className=" bg-green-dark w-full md:min-w-52 py-2 my-2 flex justify-start items-center text-white cursor-pointers">
            <span className="mx-3 flex justify-center col-span-1 ">
              <GroupsIcon className="font25 flex justify-center text-white" />
            </span>
            <span className="text-white flex  items-center col-span-2 font20">
              Group
            </span>
          </div>
        </Link>
        <Link to={"/friendly"}>
          <div className=" bg-green-dark w-full md:min-w-52 py-2 my-2 flex justify-start items-center text-white cursor-pointers">
            <span className="mx-3 flex justify-center col-span-1 ">
              <HandshakeIcon className="font25 flex justify-center text-white" />
            </span>
            <span className="text-white flex  items-center col-span-2 font20">
              Friendly
            </span>
          </div>
        </Link>
        <Link to={"/cup"}>
          <div className=" bg-green-dark w-full md:min-w-52 py-2 my-2 flex justify-start items-center text-white cursor-pointers">
            <span className="mx-3 flex justify-center col-span-1 ">
              <EmojiEventsIcon className="font25 flex justify-center text-white" />
            </span>
            <span className="text-white flex  items-center col-span-2 font20">
              Cup
            </span>
          </div>
        </Link>
        <Link to={"/robot"}>
          <div className=" bg-green-dark w-full md:min-w-52 py-2 my-2 flex justify-start items-center text-white cursor-pointers">
            <span className="mx-3 flex justify-center col-span-1 ">
              <SmartToyIcon className="font25 flex justify-center text-white" />
            </span>
            <span className="text-white flex  items-center col-span-2 font20">
              Robot
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Sot;

//   <div className="border-b-2 px-3 flex justify-between text-center items-center">
//     <ResponsiveMaker hiddenWidth={975}>
//       <Link to={"/sot"}>
//         <ArrowBackIcon className="font20" />
//       </Link>
//     </ResponsiveMaker>
//     <span className="font-bold text-2xl flex justify-start">Solo</span>
//     <SettingsInputCompositeIcon
//       onClick={handleSettingSolo}
//       className="flex cursor-pointer justify-between text-center items-center"
//     />
//   </div>
//   {allCategory.map((category) => (
//     <span
//       key={category.id}
//       onClick={() => handleAcceptCategory(category.name.toLowerCase())}
//       className="bg-green-dark w-full md:min-w-52 my-2 flex justify-start items-center text-white cursor-pointer"
//     >
//       {iconMap[category.name.toLowerCase()]}{" "}
//       <span className="font20 py-2">{category.name}</span>
//     </span>
//   ))}
// </div>
// </div>
