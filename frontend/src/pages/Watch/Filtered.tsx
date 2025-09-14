import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const Filtered: React.FC = () => {
  return (
    <div className="scrollable-container flex gap-4 px-2 pt-3 pb-2 bg-white whitespace-nowrap scrollbar-hide w-full z-10">
      <span className="rounded-full flex items-center border-2 border-gray-200 bg-white flex-shrink-0">
        <span className="font-bold text-gray-200 px-4">All</span>
      </span>
      <span className="rounded-full border-2 border-primary bg-white flex-shrink-0">
        <AudiotrackIcon className="my-3 mx-3 text-primary  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <SportsKabaddiIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <PrecisionManufacturingIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <OutdoorGrillIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <LocalSeeIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <ArchitectureIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <SportsEsportsIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <InsertEmoticonIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
      <span className="rounded-full border-2  flex-shrink-0 bg-white">
        <ColorLensIcon className="my-3 mx-3 text-gray-200  font25" />
      </span>
    </div>
  );
};

export default Filtered;
