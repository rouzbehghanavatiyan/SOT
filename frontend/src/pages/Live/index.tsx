import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import kidViolon from "../../assets/img/violonKid3.jpg";
import kidViolon4 from "../../assets/img/violinKid4.jpg";
import gymW1 from "../../assets/img/womenGym1.jpg";
import gymM1 from "../../assets/img/menGym1.png";
import gymM2 from "../../assets/img/menGym2.png";
import gymM3 from "../../assets/img/gymM3.jpg";
import inv1 from "../../assets/img/inv1.jpg";
import inv2 from "../../assets/img/inv2.jpg";
import inv3 from "../../assets/img/inv3.jpeg";
import cook1 from "../../assets/img/cook1.jpg";
import cook2 from "../../assets/img/cook2.jpg";
import cook3 from "../../assets/img/cook3.jpg";
import cook4 from "../../assets/img/cook4.jpg";
import inv5 from "../../assets/img/inv5.jpg";
import { useEffect, useState } from "react";

const rank5 =
  "https://cdn3d.iconscout.com/3d/premium/thumb/first-rank-badge-3d-icon-download-in-png-blend-fbx-gltf-file-formats--gold-medal-tag-reward-and-badges-pack-team-sports-icons-6878280.png?f=webp";
const pro2 = "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp";
const pro4 =
  "https://img.freepik.com/premium-photo/photo-young-beautiful-woman-playing-violin_812426-14931.jpg";

const Live = () => {
  const [seconds, setSeconds] = useState(60);

  const items = [
    {
      icon: <AudiotrackIcon />,
      title: "Violon",
      matches: [
        {
          player1: kidViolon,
          player1Name: "harison520",
          player2: pro4,
          player2Name: "saraLuc32",
          time: `12:${seconds > 0 ? seconds : null}`,
        },
        {
          player1: pro2,
          player1Name: "harison520",
          player2: kidViolon4,
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
          player1: gymW1,
          player1Name: "harison520",
          player2: gymM1,
          player2Name: "saraLuc32",
          time: "20:00",
        },
        {
          player1: gymM2,
          player1Name: "harison520",
          player2: gymM3,
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
          player1: inv1,
          player1Name: "harison520",
          player2: inv2,
          player2Name: "saraLuc32",
          time: "10:25",
        },
        {
          player1: inv3,
          player1Name: "harison520",
          player2: inv5,
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
          player1: cook1,
          player1Name: "harison520",
          player2: cook2,
          player2Name: "saraLuc32",
          time: "10:12",
        },
        {
          player1: cook3,
          player1Name: "harison520",
          player2: cook4,
          player2Name: "saraLuc32",
          time: "10:12",
        },
      ],
    },
  ];

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000); // هر 1 ثانیه به روز رسانی می‌کند

      // تمیز کردن تایمر
      return () => clearInterval(timer);
    }
  }, [seconds]);

  return (
    <div className="border my-10 flex max-h-full min-h-full bg-white p-4">
      <div className="grid">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 inset-1 py-5 rounded-md"
          >
            <div className="grid grid-cols-3 col-span-1 justify-center items-center">
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
