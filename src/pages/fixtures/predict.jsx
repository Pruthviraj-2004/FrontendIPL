import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Trophy, Star, Target, Activity, ChevronRight, Check } from "lucide-react";

import MainLayout from "../../Components/MainLayout";
import ErrorMessage from "../../Components/Error";

import { images } from "../../constants";
import { getMatchDetails, predictMatch } from "../../services/fixtures";
import { SectionWrapper } from "../../hoc";

const PredictMatch = () => {
  const { matchId } = useParams();

  const teamImages = {
    "Chennai Super Kings": images.csk1,
    "Delhi Capitals": images.dc1,
    "Kolkata Knight Riders": images.kkr1,
    "Mumbai Indians": images.mi1,
    "Punjab Kings": images.pbks1,
    "Rajasthan Royals": images.rr1,
    "Royal Challengers Bangalore": images.rcb1,
    "Sunrisers Hyderabad": images.srh1,
    "Lucknow Super Giants": images.lsg1,
    "Gujarat Titans": images.gt1,
    "India": images.IND,
    "Canada": images.CAN,
    "Ireland": images.IRE,
    "Pakistan": images.PAK,
    "United States": images.USA,
    "Australia": images.AUS,
    "England": images.ENG,
    "Namibia": images.NAM,
    "Oman": images.OMA,
    "Scotland": images.SCO,
    "Afghanistan": images.AFG,
    "New Zealand": images.NZ,
    "Papua New Guinea": images.PNG,
    "Uganda": images.UGA,
    "West Indies": images.WI,
    "Bangladesh": images.BAN,
    "South Africa": images.SA,
    "Sri Lanka": images.SL,
    "Nepal": images.NEP,
    "Netherlands": images.NED,
  };

  /* ---------------- STATE ---------------- */
  const [winner, setWinner] = useState(null);
  const [mom, setMom] = useState(null);
  const [runs, setRuns] = useState(null);
  const [wickets, setWickets] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [activeSection, setActiveSection] = useState("winner"); // winner | mom | runs | wickets

  /* ---------------- FETCH MATCH ---------------- */
  const { data, isLoading } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchDetails(matchId),
    onError: (e) => toast.error(e.message),
  });
 
   useEffect(() => {
  if (data?.submission) {
    setWinner(data.submission.predicted_winner_team_id);
    setMom(data.submission.predicted_player_of_match_id);
    setRuns(data.submission.predicted_most_runs_player_id);
    setWickets(data.submission.predicted_most_wickets_taker_id);
    setPredictionDone(true);
  }
}, [data]);
    
    const [predictionDone, setPredictionDone] = useState(false);
    const teamA = data?.teams?.[0];
    const teamB = data?.teams?.[1];

        const players = [
      ...(data?.mom_players || []),
      ...(data?.run_scorers || []),
      ...(data?.wicket_takers || [])
    ];
  
     const getPlayerName = (id) => {
      const player = players.find((p) => p.player_id === id);
      return player?.player_name || null;
    };

    const getTeamName = (id) => {
      if (teamA?.team_id === id) return teamA?.team_name;
      if (teamB?.team_id === id) return teamB?.team_name;
      return null;
    };

  const winnerName = getTeamName(winner);
  const momName = getPlayerName(mom);
  const runsName = getPlayerName(runs);
  const wicketsName = getPlayerName(wickets);




 
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
      winning_team_id: winner,
      player_of_match_id: mom,
      most_runs_player_id: runs,
      most_wickets_player_id: wickets
    });
  };

  const sections = [
    { id: "winner", label: "Winner", icon: Trophy, value: winner },
    { id: "mom", label: "POTM", icon: Star, value: mom },
    { id: "runs", label: "Top Scorer", icon: Activity, value: runs },
    { id: "wickets", label: "Top Wickets", icon: Target, value: wickets },
  ];

  const getTeamColor = (teamName) => {
    const colors = {
      "Chennai Super Kings": "from-yellow-400 to-orange-500",
      "Mumbai Indians": "from-blue-400 to-blue-600",
      "Royal Challengers Bengaluru": "from-red-500 to-black",
      "Kolkata Knight Riders": "from-red-500 to-gold-500",
      "Delhi Capitals": "from-blue-400 to-red-500",
      "Punjab Kings": "from-blue-500 to-blue-500",
      "Rajasthan Royals": "from-yellow-400 to-orange-500",
      "Sunrisers Hyderabad": "from-red-500 to-yellow-500",
      "Lucknow Super Giants": "from-green-500 to-blue-500",
      "Gujarat Titans": "from-blue-500 to-green-500",
      // Add more team gradients as needed
    };
    return colors[teamName] || "from-gray-400 to-gray-600";
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <ClipLoader size={50} color="#7c3aed" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ToastContainer position="top-right" theme="colored" />

      {authError && (
        <ErrorMessage
          message="Login required to predict"
          setCreateError={setAuthError}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* ================= MATCH HEADER ================= */}
        {/* <div className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center gap-6 md:gap-12">
              <TeamCard team={teamA} teamImages={teamImages} size="lg" />
              
              <div className="text-center">
                <div className="text-3xl font-black text-slate-300 mb-2">VS</div>
                <div className="text-sm text-slate-500 font-medium">
                  {data?.match_date}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {data?.match_time}
                </div>
              </div>

              <TeamCard team={teamB} teamImages={teamImages} size="lg" />
            </div>
          </div>
        </div> */}

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* ================= PROGRESS STEPS ================= */}
          <div className="mb-8">
            <div className="flex items-center justify-between bg-white rounded-2xl p-2 shadow-sm">
              {sections.map((section, idx) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const isCompleted = section.value;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-lg"
                        : isCompleted
                        ? "bg-slate-100 text-slate-700"
                        : "text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${
                      isActive ? "bg-white/20" : isCompleted ? "bg-green-100" : "bg-slate-200"
                    }`}>
                      {isCompleted && !isActive ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <Icon size={16} />
                      )}
                    </div>
                    <span className="hidden sm:block font-medium text-sm">
                      {section.label}
                    </span>
                    {idx < sections.length - 1 && (
                      <ChevronRight size={16} className="hidden md:block ml-2 opacity-30" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= WINNER SELECTION ================= */}
          {activeSection === "winner" && (
            <Section icon={Trophy} title="Select Match Winner">
              <div className="grid md:grid-cols-2 gap-6">
                {[teamA, teamB].map((team) => (
                  <button
                    key={team?.team_id}
                    onClick={() => {
                      setWinner(team?.team_id);
                      setActiveSection("mom");
                    }}
                    className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 ${
                      winner === team?.team_id
                        ? "shadow-2xl scale-[1.02]"
                        : "bg-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    }`}
                  >
                    {winner === team?.team_id && (
                      <div className="absolute top-4 right-4 bg-primary-700 text-white p-2 rounded-full">
                        <Check size={20} />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getTeamColor(team?.team_name)} opacity-20 blur-2xl rounded-full`} />
                        <img
                          src={teamImages[team?.team_name]}
                          alt={team?.team_name}
                          className="h-32 w-32 object-contain relative z-10 drop-shadow-2xl"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-800 mb-1">
                          {team?.team_name}
                        </h3>
                        <p className="text-slate-500 text-sm">Click to select as winner</p>
                      </div>
                    </div>
                    {winner === team?.team_name && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500/10 to-transparent h-32" />
                    )}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* ================= PLAYER SELECTION (MOM/RUNS/WICKETS) ================= */}
          {["mom", "runs", "wickets"].includes(activeSection) && (
            <PlayerSelectionSection
              type={activeSection}
              data={data}
              selected={activeSection === "mom" ? mom : activeSection === "runs" ? runs : wickets}
              onSelect={(value) => {
                if (activeSection === "mom") setMom(value);
                else if (activeSection === "runs") setRuns(value);
                else setWickets(value);
                
                // Auto-advance to next section
                const currentIdx = sections.findIndex(s => s.id === activeSection);
                if (currentIdx < sections.length - 1) {
                  setActiveSection(sections[currentIdx + 1].id);
                }
              }}
              teamA={teamA}
              teamB={teamB}
              teamImages={teamImages}
            />
          )}
        </div>

        {/* ================= STICKY SUMMARY ================= */}
       <div className="border-t shadow-2xl z-50 bg-white">
  <div className="max-w-4xl mx-auto px-4 py-4">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

      {/* Summary pills */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
        <SummaryPill
          icon={Trophy}
          label="Winner"
          value={winnerName}
          isActive={activeSection === "winner"}
          onClick={() => setActiveSection("winner")}
        />
        <SummaryPill
          icon={Star}
          label="POTM"
          value={momName}
          isActive={activeSection === "mom"}
          onClick={() => setActiveSection("mom")}
        />
        <SummaryPill
          icon={Activity}
          label="Runs"
          value={runsName}
          isActive={activeSection === "runs"}
          onClick={() => setActiveSection("runs")}
        />
        <SummaryPill
          icon={Target}
          label="Wickets"
          value={wicketsName}
          isActive={activeSection === "wickets"}
          onClick={() => setActiveSection("wickets")}
        />
      </div>

      {/* Submit button */}
      <button
        onClick={submitPrediction}
        disabled={predictionDone || isPending || !winner || !mom || !runs || !wickets}
        className="h-[48px] min-w-[180px] flex items-center justify-center gap-2 
        bg-[#0f0f1a] hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed 
        text-white px-6 rounded-xl font-semibold transition shadow-lg hover:shadow-xl"
      >
        {isPending ? (
          <ClipLoader size={18} color="#fff" />
        ) : (
          <>
            <Check size={18} />
            Lock Prediction
          </>
        )}
      </button>
    </div>
  </div>
</div>
      </div>
    </MainLayout>
  );
};

/* ================= SUB COMPONENTS ================= */

const TeamCard = ({ team, teamImages, size = "md" }) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32"
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        <img
          src={teamImages[team?.team_name]}
          alt={team?.team_name}
          className="h-full w-full object-contain drop-shadow-lg"
        />
      </div>
      <span className="font-bold text-slate-800 text-center max-w-[120px] leading-tight">
        {team?.team_name}
      </span>
    </div>
  );
};

const Section = ({ icon: Icon, title, children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-primary-800 text-white rounded-2xl">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
    </div>
    {children}
  </div>
);

const PlayerSelectionSection = ({ type, data, selected, onSelect, teamA, teamB, teamImages }) => {
  const players = type === "mom" 
    ? data?.mom_players 
    : type === "runs" 
    ? data?.run_scorers 
    : data?.wicket_takers;

  const title = type === "mom" 
    ? "Player of the Match" 
    : type === "runs" 
    ? "Highest Run Scorer" 
    : "Highest Wicket Taker";

  const subtitle = type === "mom" 
    ? "Choose the standout performer" 
    : type === "runs" 
    ? "Pick who will score the most runs" 
    : "Select the top wicket taker";

  const Icon = type === "mom" ? Star : type === "runs" ? Activity : Target;

  // Group players by team
  const teamAPlayers = players?.filter(p => p.team_name === teamA?.team_name) || [];
  const teamBPlayers = players?.filter(p => p.team_name === teamB?.team_name) || [];

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-2xl shadow-lg">
          <Icon size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-8 mt-6">
        {/* Team A Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={teamImages[teamA?.team_name]} 
              alt="" 
              className="h-8 w-8 object-contain"
            />
            <h3 className="font-bold text-slate-700">{teamA?.team_name}</h3>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {teamAPlayers.map((player) => (
              <PlayerCard
                key={player.player_id}
                player={player}
                isSelected={selected === player.player_id}
                onClick={() => onSelect(player.player_id)}
              />
            ))}
          </div>
        </div>

        {/* Team B Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={teamImages[teamB?.team_name]} 
              alt="" 
              className="h-8 w-8 object-contain"
            />
            <h3 className="font-bold text-slate-700">{teamB?.team_name}</h3>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {teamBPlayers.map((player) => (
              <PlayerCard
                key={player.player_id}
                player={player}
                isSelected={selected === player.player_id}
                onClick={() => onSelect(player.player_id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({ player, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full rounded-xl p-4 text-left transition-all duration-200
    ${
      isSelected
        ? "bg-primary-900 text-white shadow-lg ring-2 ring-primary-400"
        : "bg-white border border-slate-200 hover:border-primary-500 hover:shadow-md"
    }`}
  >
    <div className="flex items-center gap-3">
      
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
        ${
          isSelected
            ? "bg-white/20 text-white"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {player.player_name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </div>

      {/* Player Info */}
      <div className="flex flex-col flex-1">
        <p
          className={`font-semibold text-sm ${
            isSelected ? "text-white" : "text-slate-800"
          }`}
        >
          {player.player_name}
        </p>

        <p
          className={`text-xs ${
            isSelected ? "text-primary-100" : "text-slate-500"
          }`}
        >
          {player.role || "All-rounder"}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
          <Check size={12} className="text-primary-600" />
        </div>
      )}
    </div>
  </button>
);

const SummaryPill = ({ icon: Icon, label, value, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
      isActive
        ? "bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f] text-white shadow-lg"
        : value
        ? "bg-green-50 text-green-700 border border-green-200"
        : "bg-primary-100 text-primary-400 border border-primary-200"
    }`}
  >
    <Icon size={14} />
    <span className="hidden sm:inline">{label}:</span>
    <span className={value ? "font-semibold" : ""}>
      {value || "—"}
    </span>
  </button>
);

export default SectionWrapper(PredictMatch, "PredictMatch");