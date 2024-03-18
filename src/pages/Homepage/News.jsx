import React from "react";
import { motion } from "framer-motion";
import { teams } from "../../constants";
import { fadeIn } from "../../utils/motion";
const News = () => {
  return (
    <>
      <div className="w-[90%] lg:w-[100%] flex lg:flex-row flex-col flex-wrap justify-center items-center">
        {teams["news"].map((team) => (
          <motion.div
            key={team.id}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            initial="hidden"
            className="flex flex-col  w-[100%] md:w-[50%] lg:h-[60vh] shadow-md h-auto lg:w-[30%] mx-auto lg:m-[20px] bg-[#f5f5f5] text-white rounded-sm justify-center items-center my-4"
            variants={fadeIn("left", "spring", 0.5, 2)}
          >
            <div className="lg:w-[100%]  flex items-center">
              <img
                src={team.img}
                alt="teams"
                className="lg:h-[42vh] w-[100vw] h-[35vh] rounded-md mx-auto "
              />
            </div>
            <div className="py-4 px-4 font-semibold text-black">
              {team.news}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default News;