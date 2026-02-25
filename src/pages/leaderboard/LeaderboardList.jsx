const LeaderboardList = ({ users }) => {
  const rest = users.slice(3);

  return (
    <div className="mt-10 bg-[#0f0f1a] rounded-2xl p-4">
      {rest.map((user) => (
        <div
          key={user.rank}
          className="flex items-center justify-between py-3 px-4
            border-b border-white/5 last:border-none"
        >
          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-semibold w-6">
              {user.rank}
            </span>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600
              flex items-center justify-center text-white font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <span className="text-white font-medium">
              {user.username}
            </span>
          </div>

          <span className="text-green-400 font-bold">
            {user.score}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardList;