import React from "react";
import { images } from "../../constants";
import { styles } from "../../styles";

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

  return (
       <section className="hero h-[700px] w-[100vw] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="z-10 text-white">
          <h1 className={`${styles.heroHeadText}`}>
            Predict. Play. Win!
          </h1>

          <p className="mt-6 text-lg max-w-xl font-medium text-gray-100">
            Predict the outcomes of matches, earn points, and climb the
            leaderboard. Compete with others and showcase your cricket instincts.
          </p>

          <button className="mt-8 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-semibold">
            Start Predicting
          </button>
        </div>

        {/* RIGHT IMAGE GRID (DESKTOP) */}
        <div className="hidden lg:grid grid-cols-3 grid-rows-3 gap-3 w-full max-w-lg h-[400px] mx-auto">

          {/* Top-left small */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[1]}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Center LARGE */}
          <div className="row-span-2 overflow-hidden rounded-2xl shadow-xl">
            <img
              src={imagess[0]}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Top-right small */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[2]}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Middle-left */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[3]}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Middle-right */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[4]}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Bottom-wide */}
          <div className="col-span-2 overflow-hidden rounded-2xl">
            <img
              src={imagess[5]}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>

          {/* Bottom-right */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={imagess[6]}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
          </div>
        </div>

        {/* MOBILE GRID */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-10">
          {imagess.slice(0, 4).map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl">
              <img
                src={img}
                className="w-full h-full object-cover aspect-[4/5] transition-transform duration-300 hover:scale-105"
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
