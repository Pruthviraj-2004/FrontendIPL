import LeaderboardPodium from "./LeaderboardPodium";
import LeaderboardList from "./LeaderboardList";

const LeaderboardUI = ({ leaderboardData }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-purple text-2xl font-bold text-center mb-6">
        Leaderboard
      </h2>

      <LeaderboardPodium users={leaderboardData} />
      <LeaderboardList users={leaderboardData} />
    </div>
  );
};

export default LeaderboardUI;