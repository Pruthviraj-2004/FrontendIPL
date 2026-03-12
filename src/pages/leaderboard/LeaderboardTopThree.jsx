import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const rankConfig = {
  1: {
    bg: "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20",
    border: "border-yellow-400/50",
    text: "text-yellow-400",
    icon: "👑",
    size: "scale-110",
  },
  2: {
    bg: "bg-gradient-to-br from-slate-300/20 to-slate-500/20",
    border: "border-slate-400/50",
    text: "text-slate-300",
    icon: "🥈",
    size: "scale-100",
  },
  3: {
    bg: "bg-gradient-to-br from-orange-600/20 to-orange-800/20",
    border: "border-orange-500/50",
    text: "text-orange-400",
    icon: "🥉",
    size: "scale-95",
  },
};

const LeaderboardTopThree = ({ users }) => {
  if (users.length === 0) return null;

  // Reorder to show 2nd, 1st, 3rd visually
  const ordered = [users[1], users[0], users[2]].filter(Boolean);

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {ordered.map((user, idx) => {
        const rank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
        const config = rankConfig[rank];
        const isPositive = user.delta_rank > 0;
        const isNeutral = user.delta_rank === 0;

        return (
          <div
            key={user.username}
            className={`relative ${config.size} transition-transform`}
          >
            <div
              className={`${config.bg} backdrop-blur-md border ${config.border} 
                rounded-2xl p-4 flex flex-col items-center text-center
                shadow-lg shadow-black/20`}
            >
              {/* Rank Badge */}
              <div className={`text-2xl mb-2 ${config.text}`}>
                {config.icon}
              </div>

              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-full ${config.bg} ${config.border} 
                  border-2 flex items-center justify-center text-white font-bold mb-2`}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>

              {/* Username */}
              <p className="text-white font-semibold text-sm truncate w-full mb-1">
                {user.username}
              </p>

              {/* Points */}
              <p className={`text-lg font-bold ${config.text}`}>
                {user.total_points}
                <span className="text-xs text-slate-400 ml-1">pts</span>
              </p>

              {/* Delta */}
              {user.delta_rank !== undefined && (
                <div
                  className={`flex items-center gap-1 text-xs mt-2 px-2 py-1 rounded-full
                    ${isPositive ? "bg-green-500/20 text-green-400" : 
                      isNeutral ? "bg-slate-500/20 text-slate-400" : 
                      "bg-red-500/20 text-red-400"}`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : isNeutral ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(user.delta_rank)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardTopThree;