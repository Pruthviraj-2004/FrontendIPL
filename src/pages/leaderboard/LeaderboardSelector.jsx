import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Trophy, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboardsByEvent } from "../../services/leaderboard";

const LeaderboardSelector = ({ 
  eventId, 
  currentLeaderboardId, 
  onSelect, 
  companyDisplayId 
}) => {
//   const [leaderboards, setLeaderboards] = useState([]);
//   const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch leaderboards when eventId changes
//   useEffect(() => {
//     if (!eventId) return;
    
//     const fetchLeaderboards = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://predictiveplaybackendpractice.pythonanywhere.com/api/v2/leaderboard/list/by-event/${eventId}/`
//         );
//         const data = await response.json();
//         setLeaderboards(data.leaderboards || []);
//       } catch (error) {
//         console.error("Failed to fetch leaderboards:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderboards();
//   }, [eventId]);

    const {
    data,
    isLoading: loading,
  } = useQuery({
    queryKey: ["leaderboards", eventId],
    queryFn: () => getLeaderboardsByEvent(eventId),
    enabled: !!eventId,
  });
  console.log("Fetched leaderboards:", data);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const currentLeaderboard = data?.leaderboards?.find(
    lb => lb.leaderboard_id === currentLeaderboardId
  );


  const handleSelect = (leaderboard) => {
    onSelect(leaderboard);
    setIsOpen(false);
  };
  
  console.log(data.leaderboards, "Leaderboards fetched for event:", eventId);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 
          backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 
          transition-all duration-200 min-w-[200px] group"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 
          flex items-center justify-center shadow-lg">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 text-left">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
            Select Leaderboard
          </p>
          <p className="text-white font-semibold truncate">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </span>
            ) : (
              currentLeaderboard?.leaderboard_name || "Select..."
            )}
          </p>
        </div>
        
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 
            ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && data?.leaderboards?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 
          backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl 
          overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {data.leaderboards.map((leaderboard) => {
              // console.log("Rendering leaderboard option:", leaderboard);
              return (
              <button
                key={leaderboard.leaderboard_id}
                onClick={() => handleSelect(leaderboard)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg 
                  transition-all duration-200 group
                  ${currentLeaderboardId === leaderboard.leaderboard_id 
                    ? "bg-purple-500/20 border border-purple-500/30" 
                    : "hover:bg-white/5 border border-transparent"}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                  ${currentLeaderboardId === leaderboard.leaderboard_id
                    ? "bg-purple-500 text-white"
                    : "bg-slate-800 text-slate-400 group-hover:text-white"}`}>
                  <Trophy className="w-4 h-4" />
                </div>
                
                <div className="flex-1 text-left">
                  <p className={`font-semibold ${
                    currentLeaderboardId === leaderboard.leaderboard_id 
                      ? "text-white" 
                      : "text-slate-300 group-hover:text-white"
                  }`}>
                    {leaderboard.leaderboard_name}
                  </p>
                  {(leaderboard.tag1 || leaderboard.tag2) && (
                    <div className="flex gap-2 mt-1">
                      {leaderboard.tag1 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {leaderboard.tag1}
                        </span>
                      )}
                      {leaderboard.tag2 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {leaderboard.tag2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {currentLeaderboardId === leaderboard.leaderboard_id && (
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                )}
              </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardSelector;