import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";

import MainLayout from "../../Components/MainLayout";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Loading from "../../Components/loading";

import {
  getLeaderboardsByEvent,
  getLeaderboardRankings,
} from "../../services/leaderboard";
import LeaderboardUI from "./LeaderboardPage";

const Leaderboard = () => {
  const userState = useSelector((state) => state.user);
  const username = userState?.userInfo?.user?.username;

  // 🔹 For now hardcode IPL event id
  const eventId = "b68329a5-9e1b-4e1f-a239-488a3672b521";

  const [selectedLeaderboardId, setSelectedLeaderboardId] = useState(null);

  /* ---------------- 1️⃣ Fetch leaderboards for event ---------------- */
  const {
    data: leaderboardList,
    isLoading: loadingLeaderboards,
  } = useQuery({
    queryKey: ["leaderboards", eventId],
    queryFn: () => getLeaderboardsByEvent(eventId),
    enabled: !!eventId,
  });
  
  console.log("Fetched leaderboards:", leaderboardList);
  /* Auto-select first leaderboard */
  useEffect(() => {
    if (leaderboardList?.leaderboards?.length) {
      setSelectedLeaderboardId(
        leaderboardList.leaderboards[0].leaderboard_id
      );
    }
  }, [leaderboardList]);

  /* ---------------- 2️⃣ Fetch rankings ---------------- */
  const {
    data: rankings,
    isLoading: loadingRankings,
  } = useQuery({
    queryKey: ["rankings", selectedLeaderboardId],
    queryFn: () => getLeaderboardRankings(selectedLeaderboardId),
    enabled: !!selectedLeaderboardId,
  });

  if (loadingLeaderboards || loadingRankings) {
    return (
      <MainLayout>
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      </MainLayout>
    );
  }
  
  console.log("Fetched rankings:", rankings);
  const rows = rankings?.rows || [];
  const topThree = rows.slice(0, 3);
  const rest = rows.slice(3);

  console.log("Top 3 users:", topThree);
  console.log("Rest of the users:", rest);
  console.log("Current username:", username);

  return (
    <MainLayout>
      {/* <Breadcrumbs
        data={[
          { name: "Home", link: "/" },
          { name: "Leaderboard", link: "/board" },
        ]}
        activeName="Leaderboard"
      /> */}
      
<section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f]">
  
  {/* Glow effects */}
  <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[150px] rounded-full"></div>
  <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px] rounded-full"></div>

  <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white font-bold">IPL 2025 Leaderboard</h1>
          <p className="text-gray-300 mt-2">
            Compete, predict, and climb the ranks
          </p>
        </div>

        {/* Leaderboard Selector */}
        {/* <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {leaderboardList?.leaderboards?.map((lb) => (
            <button
              key={lb.leaderboard_id}
              onClick={() => setSelectedLeaderboardId(lb.leaderboard_id)}
              className={`px-5 py-2 rounded-full font-semibold transition
                ${
                  selectedLeaderboardId === lb.leaderboard_id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }
              `}
            >
              {lb.leaderboard_name}
            </button>
          ))}
        </div> */}
        <div className="flex  rounded-full p-1 w-fit mx-auto">
        {leaderboardList?.leaderboards?.map((lb) => (
          <button
            key={lb.leaderboard_id}
            onClick={() => setSelectedLeaderboardId(lb.leaderboard_id)}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition
              ${
                selectedLeaderboardId === lb.leaderboard_id
                  ? "bg-purple-600 text-white shadow"
                  : "text-gray-100 hover:text-black"
              }`}
          >
            {lb.leaderboard_name}
          </button>
        ))}
      </div>

        {/* 🏆 Podium */}
        {/* {topThree.length === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {topThree.map((user, idx) => (
              <div
                key={user.username}
                className={`rounded-none p-6 text-center shadow-md
                  ${
                    idx === 0
                      ? "bg-yellow-100"
                      : idx === 1
                      ? "bg-gray-200"
                      : "bg-orange-100"
                  }
                `}
              >
                <div className="text-3xl mb-2">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                </div>
                <p className=" text-lg">{user.username}</p>
                <p className="text-sm text-gray-700">
                  {user.total_points} pts
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Rankings List */}
        {/* <div className="bg-white rounded-xl shadow divide-y">
          {rest.map((user) => {
            const isMe = user.username === username;

            return (
              <div
                key={user.username}
                className={`flex justify-between items-center px-5 py-4
                  ${isMe ? "bg-purple-50" : "hover:bg-gray-50"}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className=" text-gray-500">
                    #{user.rank}
                  </span>
                  <span className="font-medium">
                    {user.username}
                  </span>
                  {isMe && (
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 font-bold text-purple-700">
                  {user.total_points}
                  <FaArrowUp size={12} />
                </div>
              </div>
            );
          })}
        </div> */} 
        <LeaderboardUI leaderboardData={rows}/>
        </div>
      </section>
    </MainLayout>
  );
};

export default Leaderboard;