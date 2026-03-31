import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import Card from "./Card";
import { styles } from "../../styles";

const TodaysFixtures = ({ matches }) => {

  if (!matches || matches.length === 0) return null;

  // const todayMatches = matches.filter((match) => {
  //   const matchDate = new Date(match.match_date);
  //   const currentDate = new Date();

  //   const currentTime =
  //     currentDate.getHours() * 60 + currentDate.getMinutes();

  //   const [matchHours, matchMinutes] = match.match_time
  //     .split(":")
  //     .map(Number);

  //   const matchTimeInMinutes = matchHours * 60 + matchMinutes;

  //   return (
  //     matchDate.toDateString() !== currentDate.toDateString() &&
  //     currentTime < matchTimeInMinutes
  //   );
  // });
  const todayMatches = matches


  if (todayMatches.length === 0) return null;

  return (
    <section className="w-full pt-6 lg:pt-0">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={fadeIn("right", "spring", 0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className={`${styles.sectionHeadText} text-left text-white`}>
            Today’s Fixtures
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Matches you can predict today
          </p>
        </motion.div>

        {/* Scrollable Match Cards */}
        <div className="relative">
          <div className="scrollbar-hide no-scrollbar flex gap-6 overflow-x-auto">
            {todayMatches.map((match, index) => (
              <div key={index} className="min-w-[280px]">
                <Card data={match} />
              </div>
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#303134] to-transparent w-16 h-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default TodaysFixtures;
