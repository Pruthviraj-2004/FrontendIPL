import React from "react";
import { Medal, TrendingUp, TrendingDown, Minus } from "lucide-react";

const LeaderboardTable = ({ users, currentUserRank, currentUserName }) => {
  const getRankStyle = (rank) => {
    if (rank === 1) return "text-yellow-400 bg-yellow-400/10";
    if (rank === 2) return "text-slate-300 bg-slate-400/10";
    if (rank === 3) return "text-orange-400 bg-orange-400/10";
    return "text-slate-400 bg-slate-800/50";
  };

  const getDeltaIcon = (delta) => {
    if (delta > 0) return <TrendingUp className="w-3 h-3 text-green-400" />;
    if (delta < 0) return <TrendingDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-slate-500" />;
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
      {/* Table Header */}
      <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-white/5 
        px-4 py-3 grid grid-cols-12 gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider z-10">
        <div className="col-span-2 text-center">Rank</div>
        <div className="col-span-5 text-center">Player</div>
        <div className="col-span-2 text-center">Trend</div>
        <div className="col-span-3 text-center">Points</div>
      </div>

      {/* Table Body */}
      <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
        {users.map((user, index) => {
          const isTop3 = user.rank <= 3;
          
          return (
            <div
              key={user.username}
              className={`px-4 py-3 grid grid-cols-12 gap-2 items-center border-b border-white/5 
                last:border-none hover:bg-white/5 transition-colors
                ${isTop3 ? "bg-gradient-to-r from-white/5 to-transparent" : ""}
                ${currentUserName === user.username ? "bg-purple-700/50" : ""}`}
            >
              {/* Rank */}
              <div className="col-span-2 flex justify-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                  ${getRankStyle(user.rank)}`}>
                  {user.rank <= 3 ? (
                    <Medal className="w-4 h-4" />
                  ) : (
                    user.rank
                  )}
                </div>
              </div>

              {/* Player Info */}
              <div className="col-span-5 flex justify-center gap-3">
                {/* <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                  ${isTop3 ? "bg-gradient-to-br from-purple-500 to-indigo-600" : "bg-slate-700"}`}>
                  {user.username.charAt(0).toUpperCase()}
                </div> */}
                <div className="min-w-0">
                  <p className={`font-semibold truncate ${isTop3 ? "text-white" : "text-slate-300"}`}>
                    {user.username}
                  </p>
                  {isTop3 && (
                    <p className="text-xs text-slate-500">
                      {user.rank === 1 ? "Champion" : user.rank === 2 ? "Runner Up" : "Third Place"}
                    </p>
                  )}
                </div>
              </div>

              {/* Trend */}
              <div className="col-span-2 flex justify-center">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                  ${user.delta_rank > 0 ? "bg-green-500/10 text-green-400" : 
                    user.delta_rank < 0 ? "bg-red-500/10 text-red-400" : 
                    "bg-slate-700/50 text-slate-400"}`}>
                  {getDeltaIcon(user.delta_rank)}
                  {Math.abs(user.delta_rank)}
                </div>
              </div>

              {/* Points */}
              <div className="col-span-2 text-right">
                <span className={`font-bold ${isTop3 ? "text-green-400" : "text-slate-300"}`}>
                  {user.total_points}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardTable;