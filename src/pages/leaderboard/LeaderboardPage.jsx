import LeaderboardPodium from "./LeaderboardPodium";
import LeaderboardList from "./LeaderboardList";

const LeaderboardUI = ({ leaderboardData }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <LeaderboardPodium users={leaderboardData} />
      <LeaderboardList users={leaderboardData} />
    </div>
  );
};

export default LeaderboardUI;