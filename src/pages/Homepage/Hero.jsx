import React from "react";
import { images } from "../../constants";
import { styles } from "../../styles";
const HeroSection = () => {
  const imagess = [
    images.hero16,
    images.hero10,
    images.e,
    images.hero17,
    images.hero12,
    images.hero11,
    images.hero13,
    images.hero15,
    images.hero14,

  ];

  
  return (
    <div className="hero h-[700px] w-[100vw] relative overflow-hidden">
      <div
        className=" absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
      >
      <div className=" flex flex-col mt-[10%] z-50 items-start mx-5">
        <h1 className={`${styles.heroHeadText} m-2 sm:mx-20  `}>
          Predictive Play
        </h1>
        <p
          className={`text-sm text-justify sm:text-none sm:text-xl z-49 m-0 sm:mx-20  text-[#F8F8FF] sm:mt-0  mt-[40px] font-bold font-md`}
        >
          Predict the outcomes of the matches and earn points to climb the
          leaderboard. Compete with other players and showcase your predictive
          skills!
        </p>
      </div>
      <div className="scrollable-images absolute bottom-0 left-0 z-50 w-full flex items-center justify-start overflow-x-auto whitespace-nowrap scrollbar-hide pl-auto mx-5 lg:mx-10 py-6">
        {imagess.map((image) => (
          <img
            src={image}
            alt="Image 3"
            className="max-h-[300px] z-50 rounded-md  mr-4 object-contain"
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default HeroSection;