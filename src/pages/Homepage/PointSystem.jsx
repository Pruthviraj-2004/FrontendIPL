import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion"; // adjust path if needed
import { styles } from "../../styles";

const PointsSystem = ({ points }) => {
  if (!points || points.length === 0) return null;

  const mainRules = points.slice(0, 4);
  const tieBreakRules = points.slice(4);

  return (
    <section className="w-full py-16 lg:py-20 ">
      <div className="max-w-7xl mx-auto px-2">

        {/* Header */}
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
            Scoring Rules
          </p>
          <h2 className={`${styles.sectionHeadText} text-white mt-2 text-left`}>
            Points System
          </h2>
          <p className="mt-3 text-slate-200 max-w-2xl">
            Points are awarded based on prediction accuracy. Higher precision
            means higher ranking.
          </p>
        </motion.div>

        {/* Main Rules (Scoreboard style) */}
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f] rounded-2xl px-6 py-8 border shadow-sm"
        >
          <div className="divide-y">
            {mainRules.map((rule) => {
              const [label, rest] = rule.text.split("-");
              const pointsValue = rest?.match(/\d+/)?.[0];

              return (
                <div
                  key={rule.id}
                  className="flex items-center justify-between py-4"
                >
                  <span className="text-slate-100 font-semibold">
                    {label.trim()}
                  </span>

                  <span className="text-lg font-semibold text-purple-700">
                    +{pointsValue} pts
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Tie-break rules */}
        {tieBreakRules.length > 0 && (
          <motion.div
            variants={fadeIn("up", "spring", 0.5, 1)}
            className="mt-10"
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
              Tie-break Rules
            </h3>

            <ul className="space-y-3">
              {tieBreakRules.map((rule) => (
                <li
                  key={rule.id}
                  className="flex items-start text-md text-slate-200"
                >
                  <span className="mr-3 mt-1 w-2 h-2 bg-purple-600 rounded-full" />
                  <span>{rule.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PointsSystem;
