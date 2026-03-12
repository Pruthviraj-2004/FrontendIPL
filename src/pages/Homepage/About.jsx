import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const AboutPredictivePlay = () => {
  const highlights = [
    {
      title: "Skill-Based Predictions",
      text: "Points are earned through accuracy and smart match analysis — not luck.",
    },
    {
      title: "Live Competition",
      text: "Compete with real players and track your ranking in real time.",
    },
    {
      title: "Rewards & Recognition",
      text: "Climb the leaderboard and earn exciting prizes along the way.",
    },
  ];

  return (
    <section className="w-full py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
          
          {/* Section Label */}
          <motion.p
            variants={fadeIn("up", "spring", 0.2, 1)}
            className="text-sm font-semibold uppercase tracking-widest text-purple-600"
          >
            About
          </motion.p>

          {/* Title */}
          <motion.h2
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="mt-3 text-3xl sm:text-4xl font-bold text-slate-300"
          >
            Predictive Play
          </motion.h2>

          {/* Highlight Line */}
          <motion.p
            variants={fadeIn("up", "spring", 0.4, 1)}
            className="mt-6 text-lg text-slate-300 max-w-3xl leading-relaxed"
          >
            Where{" "}
            <span className="font-semibold text-purple-700">
              cricket knowledge
            </span>{" "}
            meets{" "}
            <span className="font-semibold text-purple-700">strategy</span> and{" "}
            <span className="font-semibold text-purple-700">
              competition
            </span>.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeIn("up", "spring", 0.5, 1)}
            className="mt-4 text-slate-300 max-w-3xl leading-relaxed"
          >
            Predictive Play is a sports prediction platform built for fans who
            enjoy analyzing matches and making informed calls. Whether you're
            new to predictions or a seasoned expert, the platform offers a
            simple, engaging, and rewarding experience.
          </motion.p>

          {/* Highlight Cards */}
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 1)}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                {/* Icon Placeholder */}
                <div className="w-12 h-12 mb-4 rounded-xl bg-slate-700 flex items-center justify-center text-purple-400 font-bold">
                  ⬤
                </div>

                <h3 className="text-lg font-semibold text-slate-300 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutPredictivePlay;
