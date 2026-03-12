import React from "react";
import { Trophy, Users, Target } from "lucide-react";

const LeaderboardHeader = ({ title, totalUsers, matchNumber }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            {title}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Live Rankings</p>
        </div>
        
        <div className="flex gap-3 text-xs">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-white font-semibold">{totalUsers}</span>
            <span className="text-slate-400">players</span>
          </div>
          {matchNumber && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-white font-semibold">#{matchNumber}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHeader;