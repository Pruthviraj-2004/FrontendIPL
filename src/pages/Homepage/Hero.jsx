import React from "react";
import { images } from "../../constants";
import { styles } from "../../styles";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const imagess = [
    images.hero16, // main
    images.hero10,
    images.hero17,
    images.hero12,
    images.hero11,
    images.hero13,
    images.hero15,
  ];

  const navigate = useNavigate();

  return (
    <section className="hero bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f] min-h-screen lg:h-[700px] w-full relative overflow-hidden py-12 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="z-10 text-white text-center lg:text-left order-1">
          <h1 className={`${styles.heroHeadText} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl`}>
            Predict. Play. Win!
          </h1>

          <p className="mt-4 lg:mt-6 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium text-gray-100 px-4 sm:px-0">
            Predict the outcomes of matches, earn points, and climb the
            leaderboard. Compete with others and showcase your cricket instincts.
          </p>

          <button onClick={navigate("/events")} className="mt-6 lg:mt-8 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-semibold text-sm sm:text-base">
            Start Predicting
          </button>
        </div>

        {/* RIGHT IMAGE GRID (DESKTOP) */}
        <div className="hidden lg:grid grid-cols-3 grid-rows-3 gap-3 w-full max-w-lg h-[400px] mx-auto order-2">

          {/* Top-left small */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[1]}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Center LARGE */}
          <div className="row-span-2 overflow-hidden rounded-2xl shadow-xl">
            <img
              src={imagess[0]}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Top-right small */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[2]}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Middle-left */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[3]}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Middle-right */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[4]}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Bottom-wide */}
          <div className="col-span-2 overflow-hidden rounded-2xl">
            <img
              src={imagess[5]}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Bottom-right */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[6]}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>
        </div>

        {/* MOBILE GRID - Fixed responsive layout */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 order-2 w-full max-w-md mx-auto">
          {imagess.slice(0, 3).map((img, idx) => (
            <div 
              key={idx} 
              className={`overflow-hidden rounded-xl ${idx === 0 ? 'col-span-2 sm:col-span-1 aspect-[16/9] sm:aspect-square' : 'aspect-square'}`}
            >
              <img
                src={img}
                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                alt=""
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;