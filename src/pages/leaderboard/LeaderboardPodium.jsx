import React from "react";

const podiumStyles = [
  {
    rank: 2,
    bg: "from-slate-300 to-slate-500",
    ring: "ring-slate-300",
    height: "h-40",
    label: "🥈",
  },
  {
    rank: 1,
    bg: "from-yellow-400 to-yellow-600",
    ring: "ring-yellow-400",
    height: "h-52",
    label: "🥇",
  },
  {
    rank: 3,
    bg: "from-purple-600 to-purple-800",
    ring: "ring-purple-500",
    height: "h-36",
    label: "🥉",
  },
];

const LeaderboardPodium = ({ users }) => {
  const top3 = users.slice(0, 3);

  // Order: 2nd place, 1st place, 3rd place
  const podiumOrder = [1, 0, 2]; // indices in top3 array

  return (
    <div className="flex justify-center items-end gap-6 mt-8">
      {podiumOrder.map((idx) => {
        const user = top3[idx];
        if (!user) return null;

        // Find the style based on the position (idx + 1)
        const style = podiumStyles.find((s) => s.rank === (idx + 1));
        if (!style) return null;

        return (
          <div key={user.username} className="flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${style.bg}
                ring-4 ${style.ring} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>

            <p className="mt-2 font-semibold text-black text-sm">
              {user.username}
            </p>
            <p className="text-green-400 text-sm font-bold">
              {user.score || user.total_points}
            </p>

            <div
              className={`w-24 ${style.height} mt-3 rounded-xl bg-gradient-to-b ${style.bg}
                flex items-end justify-center text-2xl`}
            >
              <span className="mb-2">{style.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardPodium;