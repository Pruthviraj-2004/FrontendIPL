import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import MainLayout from "../../Components/MainLayout";
import Breadcrumbs from "../../Components/Breadcrumbs";
import ErrorMessage from "../../Components/Error";

import { images } from "../../constants";
import { getMatchDetails, predictMatch } from "../../services/fixtures";
import { SectionWrapper } from "../../hoc";

const PredictMatch = () => {
  const { matchId } = useParams();

  const teamImages = { "Chennai Super Kings": images.csk1, "Delhi Capitals": images.dc1, "Kolkata Knight Riders": images.kkr1, "Mumbai Indians": images.mi1, "Punjab Kings": images.pbks1, "Rajasthan Royals": images.rr1, "Royal Challengers Bengaluru": images.rcb1, "Sunrisers Hyderabad": images.srh1, "Lucknow Super Giants": images.lsg1, "Gujarat Titans": images.gt1, "India": images.IND , "Canada": images.CAN , "Ireland": images.IRE , "Pakistan": images.PAK , "United States": images.USA , "Australia": images.AUS , "England": images.ENG , "Namibia": images.NAM , "Oman": images.OMA , "Scotland": images.SCO , "Afghanistan": images.AFG , "New Zealand": images.NZ , "Papua New Guinea": images.PNG , "Uganda": images.UGA , "West Indies": images.WI , "Bangladesh": images.BAN , "South Africa": images.SA , "Sri Lanka": images.SL , "Nepal": images.NEP , "Netherlands": images.NED , };
  /* ---------------- STATE ---------------- */
  const [winner, setWinner] = useState(null);
  const [mom, setMom] = useState(null);
  const [runs, setRuns] = useState(null);
  const [wickets, setWickets] = useState(null);
  const [authError, setAuthError] = useState(false);

  /* ---------------- FETCH MATCH ---------------- */
  const { data } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchDetails(matchId),
    onError: (e) => toast.error(e.message),
  });

  const teamA = data?.teams?.[0];
  const teamB = data?.teams?.[1];

  /* ---------------- SUBMIT ---------------- */
  const { mutate, isPending } = useMutation({
    mutationFn: predictMatch,
    onSuccess: () => toast.success("Prediction locked 🔒"),
    onError: (e) => toast.error(e.message),
  });

  const submitPrediction = () => {
    if (!winner || !mom || !runs || !wickets) {
      toast.error("Complete all predictions");
      return;
    }

    mutate({
      match_id: matchId,
      predicted_winner_team: winner,
      predicted_player_of_the_match: mom,
      predicted_most_runs_scorer: runs,
      predicted_most_wicket_taker: wickets,
    });
  };

  return (
    <MainLayout>
      <ToastContainer />

      {authError && (
        <ErrorMessage
          message="Login required to predict"
          setCreateError={setAuthError}
        />
      )}

      <section className="min-h-screen bg-gray-50 py-10">
        <Breadcrumbs
          data={[
            { name: "Home", link: "/" },
            { name: "Fixtures", link: "/fixtures" },
            { name: "Prediction", link: "#" },
          ]}
          activeName="Prediction"
        />

        {/* ================= MATCH HEADER ================= */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 mt-6">
          <div className="flex items-center justify-center gap-8">
            <Team team={teamA} teamImages={teamImages} />
            <span className="text-xl font-bold text-gray-500">VS</span>
            <Team team={teamB} teamImages={teamImages} />
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            {data?.match_date} • {data?.match_time}
          </p>
        </div>

        {/* ================= PICK WINNER ================= */}
        <Section title="🏆 Pick the Winner">
          <div className="grid grid-cols-2 gap-6">
            {[teamA, teamB].map((team) => (
              <SelectableCard
                key={team.team_id}
                active={winner === team.team_name}
                onClick={() => setWinner(team.team_name)}
              >
                <img
                  src={teamImages[team.team_name]}
                  alt=""
                  className="h-20 mx-auto"
                />
                <p className="font-semibold mt-2">{team.team_name}</p>
              </SelectableCard>
            ))}
          </div>
        </Section>

        {/* ================= MOM ================= */}
        <Section title="⭐ Player of the Match">
          <HorizontalScroll>
            {data?.mom_players?.map((p) => (
              <MiniCard
                key={p.player_id}
                active={mom === p.player_name}
                onClick={() => setMom(p.player_name)}
                label={p.player_name}
                sub={p.team_name}
              />
            ))}
          </HorizontalScroll>
        </Section>

        {/* ================= RUNS ================= */}
        <Section title="🏏 Most Runs">
          <HorizontalScroll>
            {data?.run_scorers?.map((p) => (
              <MiniCard
                key={p.player_id}
                active={runs === p.player_name}
                onClick={() => setRuns(p.player_name)}
                label={p.player_name}
                sub={p.team_name}
              />
            ))}
          </HorizontalScroll>
        </Section>

        {/* ================= WICKETS ================= */}
        <Section title="🎯 Most Wickets">
          <HorizontalScroll>
            {data?.wicket_takers?.map((p) => (
              <MiniCard
                key={p.player_id}
                active={wickets === p.player_name}
                onClick={() => setWickets(p.player_name)}
                label={p.player_name}
                sub={p.team_name}
              />
            ))}
          </HorizontalScroll>
        </Section>

        {/* ================= STICKY SUMMARY ================= */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
  <div className="
    max-w-6xl mx-auto
    flex flex-col sm:flex-row
    items-center
    justify-between
    gap-3
    px-4 py-3
  ">
    {/* Prediction Summary */}
    <div className="
      flex flex-wrap
      items-center
      gap-x-4 gap-y-1
      text-sm
      text-gray-700
    ">
      <span>🏆 <b>{winner || "—"}</b></span>
      <span>⭐ <b>{mom || "—"}</b></span>
      <span>🏏 <b>{runs || "—"}</b></span>
      <span>🎯 <b>{wickets || "—"}</b></span>
    </div>

    {/* Action Button */}
    <button
      onClick={submitPrediction}
      disabled={isPending}
      className="
        mt-2 sm:mt-0
        w-full sm:w-auto
        bg-purple-600 hover:bg-purple-700
        disabled:opacity-40
        text-white
        px-6 py-2.5
        rounded-lg
        font-semibold
        whitespace-nowrap
      "
    >
      {isPending ? (
        <ClipLoader size={18} color="#fff" />
      ) : (
        "Confirm Prediction"
      )}
    </button>
  </div>
</div>
      </section>
    </MainLayout>
  );
};

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <div className="max-w-6xl mx-auto mt-10 px-4">
    <h2 className="text-lg font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Team = ({ team,teamImages }) => (
  <div className="text-center">
    <img
      src={teamImages[team?.team_name]}
      alt=""
      className="h-24 mx-auto"
    />
    <p className="font-semibold">{team?.team_name}</p>
  </div>
);

const SelectableCard = ({ active, onClick, children }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-xl p-6 text-center transition 
      ${active ? "ring-4 ring-purple-500 scale-105" : "hover:scale-105 bg-gray-100"}
    `}
  >
    {children}
  </div>
);

const HorizontalScroll = ({ children }) => (
  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
    {children}
  </div>
);

const MiniCard = ({ active, onClick, label, sub }) => (
  <div
    onClick={onClick}
    className={`min-w-[140px] cursor-pointer rounded-xl p-4 text-center transition
      ${active ? "bg-purple-600 text-white scale-105" : "bg-white hover:scale-105 shadow"}
    `}
  >
    <p className="font-semibold text-sm">{label}</p>
    <p className="text-xs opacity-80">{sub}</p>
  </div>
);

export default SectionWrapper(PredictMatch, "PredictMatch");