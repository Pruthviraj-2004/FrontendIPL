import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion"; // adjust path if needed
import { MdLeaderboard } from "react-icons/md";
import { styles } from "../../styles";

const LeaderboardPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="text-white"
        >
          {/* Icon */}
          <div className="w-16 h-16 mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
            <MdLeaderboard size={32} className="text-purple-600" />
          </div>

          {/* Label */}
          <p className="text-sm uppercase tracking-widest text-purple-500 font-semibold">
            Compete & Rank
          </p>

          {/* Heading */}
          <h2 className={`${styles.sectionHeadText} mt-3 text-left text-slate-100`}>
            Leaderboard
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg text-slate-200 leading-relaxed">
            Track your performance against other players and see how your
            predictions stack up. The more accurate your calls, the higher you
            rise on the leaderboard.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={() => navigate("/board")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-purple-700 hover:bg-purple-900 transition font-semibold text-white"
            >
              View Leaderboard
              <span className="text-xl">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
