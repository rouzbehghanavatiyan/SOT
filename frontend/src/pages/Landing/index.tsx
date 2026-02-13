import Logo from "../../assets/img/logocircle.png";
import SingersImage from "../../assets/img/SingersImage.png";
import FootballImage from "../../assets/img/football.png";
import React from "react";
import bronseBase1 from "../../assets/ranks/bronze-1.png";
import silver1 from "../../assets/ranks/silver-1.png";
import gold1 from "../../assets/ranks/gold-1.png";
import ruby from "../../assets/ranks/ruby.png";
import world from "../../assets/ranks/worldMain.png";
import gem from "../../assets/ranks/gem.png";
import { Icon } from "../../components/Icon";

const Landing = () => {
  const ranks = [bronseBase1, silver1, gold1, gem, ruby, world];
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-vazir">
      <div className="lg:w-1/2 w-full bg-gray-100 text-white flex flex-col">
        <nav className="flex bg-gray-150 items-center justify-between px-10 py-2 shadow-md">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="w-20 h-20" />
            <span className="icon_size logoFont text-dark_blue text-xl font-bold ">
              Clash Talent
            </span>
          </div>

          <button className="px-6 py-2 bg-main_blue hover:bg-soft_blue rounded-xl transition duration-300">
            Get Started
          </button>
        </nav>
        <div className="grid grid-cols-1">
          <h1 className="font20 lg:text-5xl font-bold text-gray-900 mb-6 mt-10 flex justify-center leading-tight">
            "Free challenge for rase up in the world"
          </h1>
          <span className="w-full gap-10 justify-center flex">
            <img
              src={SingersImage}
              alt="Logo"
              className="w-[40%] h-[80%] rounded-lg"
            />
            <img
              src={FootballImage}
              alt="Logo"
              className="w-[40%] h-[80%] rounded-lg"
            />
          </span>
          <p className="text-md text-gray-900 flex justify-center mb-6">
            A powerful environment designed to inspire competition, creativity,
            and continuous improvement.
          </p>

          <p className="text-xl text-gray-900 flex justify-center mb-10">
            It creates dynamic challenges that push limits and unlock true
            potential.
          </p>
          <div className="flex items-center justify-center space-x-4">
            {ranks.map((rank, index) => (
              <React.Fragment key={index}>
                <img
                  src={rank}
                  alt={`rank-${index}`}
                  className="w-16 h-16 rounded-lg"
                />
                {/* import Icon from '@mui/icons-material/ArrowForward'; */}
                {index !== ranks.length - 1 && (
                  <span className="text-2xl text-gray-600 font-bold">
                    <Icon name="ArrowForward" className="font20" />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="gap-6 flex mt-10 justify-center">
            <button className="px-8 py-3 border border-green text-green hover:bg-green hover:text-white rounded-xl text-base transition duration-300">
              Learn More
            </button>
          </div>
        </div>
        <footer className="text-center py-6 text-gray-300 text-sm">
          © 2026 Clash Talent. All rights reserved.
        </footer>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-1/2 w-full bg-black flex items-center justify-center p-16">
        <div className="max-w-md animate-slideInRight">
          <h2 className="text-3xl text-main_blue font-bold mb-8">
            Compete. Improve. Dominate.
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Step into a world where your talent is tested against real
            competitors. Every challenge becomes an opportunity to grow.
          </p>

          <div className="bg-primary p-8 rounded-2xl shadow-2xl">
            <p className="text-soft_blue text-base">
              Push your limits, sharpen your skills, and rise above the rest.
              This is where champions are built.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
