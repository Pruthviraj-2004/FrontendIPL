import React, { useState, useEffect } from "react";
import LeaderboardSelector from "./LeaderboardSelector";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTopThree from "./LeaderboardTopThree";
import LeaderboardTable from "./LeaderboardTable";
import { Info } from "lucide-react";
import { getLeaderboardRankings } from "../../services/leaderboard";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const LeaderboardUI = ({ eventId, initialLeaderboardId }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [currentLeaderboardId, setCurrentLeaderboardId] = useState(initialLeaderboardId);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Fetch rankings when leaderboard changes
  // useEffect(() => {
  //   if (!currentLeaderboardId) return;

  //   const fetchRankings = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetch(
  //         `https://predictiveplaybackendpractice.pythonanywhere.com/api/v2/leaderboard/board/${currentLeaderboardId}/`
  //       );
  //       const data = await response.json();
  //       setLeaderboardData(data.rows || []);
  //       setEventInfo({
  //         leaderboard_name: data.leaderboard_name,
  //         match_number: data.match_number,
  //         event_id: data.event_id,
  //         user_count: data.user_count
  //       });
  //     } catch (err) {
  //       setError("Failed to load leaderboard data");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRankings();
  // }, [currentLeaderboardId]);

  const {
  data,
  isLoading,
  isError,
  error
} = useQuery({
  queryKey: ["leaderboard", currentLeaderboardId],
  queryFn: () => getLeaderboardRankings(currentLeaderboardId),
  enabled: !!currentLeaderboardId
});

  console.log("Selected leaderboard ID:", currentLeaderboardId);
  console.log("Leaderboard rankings data:", data);
  console.log("Loading state:", isLoading);
  console.log("Error state:", isError, error);
  const handleLeaderboardChange = (leaderboard) => {
    setCurrentLeaderboardId(leaderboard.leaderboard_id);
  };

  useEffect(() => {
  if (!data) return;

  setLeaderboardData(data.rows || []);
  setEventInfo({
    leaderboard_name: data.leaderboard_name,
    match_number: data.match_number,
    event_id: data.event_id,
    user_count: data.user_count
  });
}, [data]);

  if (!eventId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 
        flex items-center justify-center">
        <p className="text-slate-400">No event selected</p>
      </div>
    );
  }

  if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;

if (isError) {
  console.error(error);
  return <p>Failed to load leaderboard data</p>;
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Leaderboard Selector Dropdown */}


<div className="mb-6 flex items-center justify-between">
  <LeaderboardSelector
    eventId={eventId}
    currentLeaderboardId={currentLeaderboardId}
    onSelect={handleLeaderboardChange}
  />

  <div className="relative group">
    <Info className="w-8 h-8 text-slate-400 cursor-pointer hover:text-white" />

    <div className="absolute right-0 z-[1000] w-72 p-3 text-sm bg-slate-900 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Winner Team</span>
          <span>+4 pts</span>
        </div>
        <div className="flex justify-between">
          <span>Player of the Match</span>
          <span>+3 pts</span>
        </div>
        <div className="flex justify-between">
          <span>Most Runs Scorer of the Match</span>
          <span>+3 pts</span>
        </div>
        <div className="flex justify-between">
          <span>Most Economical Wicket Taker of the Match</span>
          <span>+3 pts</span>
        </div>
      </div>
    </div>
  </div>
</div>
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && leaderboardData.length > 0 && (
          <>
            <LeaderboardHeader 
              title={eventInfo?.leaderboard_name} 
              totalUsers={eventInfo?.user_count || leaderboardData.length}
              matchNumber={eventInfo?.match_number}
            />
            
            <LeaderboardTopThree users={leaderboardData.slice(0, 3)} />
            
            <LeaderboardTable users={leaderboardData} />
          </>
        )}

        {/* Empty State */}
        {!loading && !error && leaderboardData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400">No rankings available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardUI;