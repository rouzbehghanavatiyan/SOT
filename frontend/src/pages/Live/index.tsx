import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const rank5 =
  "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp";
const pro2 = "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp";
const pro3 =
  "https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995e13_66236537d4f46682e079b6ce_Casual%2520Portrait.webp";
const pro4 =
  "https://img.freepik.com/premium-photo/photo-young-beautiful-woman-playing-violin_812426-14931.jpg";

const items = [
  {
    icon: <AudiotrackIcon />,
    title: "Violon",
    matches: [
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "12:30",
      },
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "12:30",
      },
    ],
  },
  {
    icon: <SportsKabaddiIcon />,
    title: "Gym",
    matches: [
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "20:00",
      },
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "20:00",
      },
    ],
  },
  {
    icon: <PrecisionManufacturingIcon />,
    title: "Inventor",
    matches: [
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "10:25",
      },
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "10:25",
      },
    ],
  },
  {
    icon: <OutdoorGrillIcon />,
    title: "Cook",
    matches: [
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "10:12",
      },
      {
        player1: pro2,
        player1Name: "harison520",
        player2: pro4,
        player2Name: "saraLuc32",
        time: "10:12",
      },
    ],
  },
];

const Live = () => {
  return (
    <div className="border my-10 flex max-h-full min-h-full bg-white p-4">
      <div className="grid">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 inset-1 py-5 rounded-md"
          >
            <div className="col-span-1 flex justify-center items-center me-4">
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </div>
            {item.matches.map((match, matchIndex) => (
              <div
                key={matchIndex}
                className="py-2 border rounded-lg flex justify-around transform transition-transform duration-500 hover:scale-105 items-center mx-2 col-span-3 cursor-pointer hover:bg-gray-100"
              >
                <div className="col-span-3">
                  <div className="relative">
                    <div className="absolute rounded-full"></div>
                    <img
                      className="rounded-full relative"
                      src={match.player1}
                      width={60}
                      height={60}
                      alt="Profile"
                    />
                    <img
                      className="absolute bottom-0"
                      src={rank5}
                      width={20}
                      height={20}
                      alt="Rank"
                    />
                  </div>
                  <span>{match.player1Name}</span>
                </div>
                {"Vs"}
                <div className="col-span-3">
                  <div className="relative">
                    <img
                      className="rounded-full"
                      src={match.player2}
                      width={60}
                      height={60}
                      alt="Profile"
                    />
                    <img
                      className="absolute bottom-0"
                      src={rank5}
                      width={20}
                      height={20}
                      alt="Rank"
                    />
                  </div>
                  <span>{match.player2Name}</span>
                </div>
              </div>
            ))}
            <div className="items-center flex justify-center col-span-2">
              <span className="font25 font-bold ">
                <span className="flex justify-center items-center">
                  <HourglassTopIcon />
                </span>
                {item.matches[0].time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Live;
