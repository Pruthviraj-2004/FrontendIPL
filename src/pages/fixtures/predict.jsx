import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Star, 
  Target, 
  Activity, 
  Check, 
  Shield,
  Swords,
  Zap,
  Crown,
  User,
  Sparkles,
  Lock,
  AlertCircle,
  X,
  CheckCircle,
  Award
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

import MainLayout from "../../Components/MainLayout";
import ErrorMessage from "../../Components/Error";
import { images } from "../../constants";
import { getMatchDetails, predictMatch } from "../../services/fixtures";
import { SectionWrapper } from "../../hoc";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Breadcrumbs from "../../Components/Breadcrumbs";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const PredictMatch = () => {
   const queryClient = useQueryClient(); 
  const { matchId } = useParams();

  const teamImages = {
    "Chennai Super Kings": images.csk1,
    "Delhi Capitals": images.dc1,
    "Kolkata Knight Riders": images.kkr1,
    "Mumbai Indians": images.mi1,
    "Punjab Kings": images.pbks1,
    "Rajasthan Royals": images.rr1,
    "Royal Challengers Bengaluru": images.rcb1,
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
  const [activeSection, setActiveSection] = useState("winner");
  const [predictionDone, setPredictionDone] = useState(false);
  const [direction, setDirection] = useState(0);

  /* ---------------- FETCH MATCH ---------------- */
  const { data, isLoading } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchDetails(matchId),
  });

  const isPredictionLocked = () => {
    return false;
  };

  useEffect(() => {
    if (data?.submission) {
      setWinner(data.submission.predicted_winner_team_id);
      setMom(data.submission.predicted_player_of_match_id);
      setRuns(data.submission.predicted_most_runs_player_id);
      setWickets(data.submission.predicted_most_wickets_taker_id);
      setPredictionDone(data?.match?.status_id === "Completed" ? true : false);
    }
  }, [data]);

  const teamA = data?.teams?.[0];
  const teamB = data?.teams?.[1];

  // Extract actual results from data
  const actualResults = data?.actual_results || {};
  const isResultDeclared = actualResults?.is_result_declared || false;
  
  // Get actual winner team ID
  const actualWinnerId = actualResults?.winner_team_id;
  
  // Get actual player IDs (from arrays)
  const actualMomIds = actualResults?.player_of_match?.map(p => p.player_id) || [];
  const actualRunsIds = actualResults?.most_runs_players?.map(p => p.player_id) || [];
  const actualWicketsIds = actualResults?.most_wickets_players?.map(p => p.player_id) || [];

  // Points from submission
  const submission = data?.submission || {};
  const points = {
    winner: submission?.points_winner || 0,
    mom: submission?.points_mom || 0,
    runs: submission?.points_runs || 0,
    wickets: submission?.points_wickets || 0,
    total: submission?.total_points || 0,
    max: submission?.max_points || 11
  };

  // Flags for correct predictions
  const correctFlags = {
    winner: submission?.flag_winner || false,
    mom: submission?.flag_mom || false,
    runs: submission?.flag_mruns || false,
    wickets: submission?.flag_mwickets || false
  };

  const players = [
    ...(data?.mom_players || []),
    ...(data?.run_scorers || []),
    ...(data?.wicket_takers || [])
  ];

  const getPlayerName = (id) => {
    const player = players?.find((p) => p.player_id === id);
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
    onSuccess: (data) => {
      // Defer both state update and toast to next tick
      toast.dismiss();
      setTimeout(() => {
        toast.success("Prediction locked 🔒", {
        position: "top-center",
        autoClose: 1000,
        closeButton: false,
        });

      }, 100);
    },
    onError: (e) => {
      console.error(e);
      toast.error(e.message, {
        position: "top-center",
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #ef4444",
        },
      });
    },
  });

  useEffect(() => {
    setPredictionDone(data?.submission?.is_submitted || false);
  }, [data]);


  const submitPrediction = () => {
    if (predictionLocked) {
      toast.error("Predictions locked after 7 PM IST on match day", {
        position: "top-center",
      });
      return;
    }

    if (!winner || !mom || !runs || !wickets) {
      toast.error("Complete all predictions", {
        position: "top-center",
      });
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
    { id: "winner", label: "Winner", icon: Trophy, value: winner, color: "from-amber-400 to-orange-500" },
    { id: "mom", label: "POTM", icon: Star, value: mom, color: "from-violet-400 to-fuchsia-500" },
    { id: "runs", label: "Top Scorer", icon: Activity, value: runs, color: "from-emerald-400 to-teal-500" },
    { id: "wickets", label: "Top Wickets", icon: Target, value: wickets, color: "from-rose-400 to-pink-500" },
  ];

  const getTeamColor = (teamName) => {
    const colors = {
      "Chennai Super Kings": "from-yellow-400 to-orange-500",
      "Mumbai Indians": "from-blue-400 to-blue-600",
      "Royal Challengers Bengaluru": "from-red-500 to-red-700",
      "Kolkata Knight Riders": "from-purple-600 to-yellow-400",
      "Delhi Capitals": "from-blue-400 to-red-500",
      "Punjab Kings": "from-red-500 to-blue-500",
      "Rajasthan Royals": "from-pink-500 to-blue-500",
      "Sunrisers Hyderabad": "from-orange-500 to-red-500",
      "Lucknow Super Giants": "from-green-500 to-blue-500",
      "Gujarat Titans": "from-blue-500 to-green-500",
    };
    return colors[teamName] || "from-slate-400 to-slate-600";
  };

  const handleSectionChange = (newSection) => {
    const currentIdx = sections.findIndex(s => s.id === activeSection);
    const newIdx = sections.findIndex(s => s.id === newSection);
    setDirection(newIdx > currentIdx ? 1 : -1);
    setActiveSection(newSection);
  };

  const handleNext = () => {
    const currentIdx = sections.findIndex(s => s.id === activeSection);
    if (currentIdx < sections.length - 1) {
      setDirection(1);
      setActiveSection(sections[currentIdx + 1].id);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-12 h-12 text-violet-500" />
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  const progress = (sections?.filter(s => s.value).length / sections?.length) * 100;
  const predictionLocked = isPredictionLocked();

  return (
    <MainLayout page="predict">
      <ToastContainer limit={1} />
      <div className="min-h-screen bg-slate-950 text-white pb-32">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
        </div>

        {/* Auth Error */}
        {authError && (
          <ErrorMessage
            message="Login required to predict"
            setCreateError={setAuthError}
          />
        )}

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <Breadcrumbs
            data={[
              { name: "Home", link: "/" },
              { name: "Fixtures", link: "/events/916227b7-e825-4067-ae23-17385707ef32" },
              { name: `${teamA?.team_short_name || "Team A"} vs ${teamB?.team_short_name || "Team B"}`, link: `/fixtures/${matchId}` },
            ]}
            activeName={`${teamA?.team_short_name || "Team A"} vs ${teamB?.team_short_name || "Team B"}`}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg">
                <Swords className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  {isResultDeclared ? "Match Results" : "Make Prediction"}
                </span>
              </h1>
            </div>
            <p className="text-slate-400">
              {isResultDeclared 
                ? `You scored ${points.total}/${points.max} points` 
                : "Select your Predictions for this Match"}
            </p>
            {predictionLocked && (
              <div className="flex items-center gap-2 text-amber-400 text-sm mb-4">
                <Lock size={16} />
                Predictions locked after 7 PM IST
              </div>
            )}
          </motion.div>

          {/* Results Summary Card - Show when results are declared */}
          {isResultDeclared && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${points.total >= 8 ? 'bg-emerald-500/20 text-emerald-400' : points.total >= 4 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Points</p>
                    <p className="text-2xl font-bold text-white">{points.total} <span className="text-slate-500 text-lg">/ {points.max}</span></p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {Object.entries(correctFlags).map(([key, isCorrect]) => (
                    <div 
                      key={key}
                      className={`px-3 py-2 rounded-lg text-xs font-medium ${
                        isCorrect 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {key === 'winner' && 'Winner'}
                      {key === 'mom' && 'POTM'}
                      {key === 'runs' && 'Runs'}
                      {key === 'wickets' && 'Wickets'}
                      : {isCorrect ? '+' + points[key] : '0'}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Bar - Only show if not completed */}
          {!isResultDeclared && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Prediction Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Step Indicators */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const isCompleted = section.value;
              const isLocked = predictionLocked || predictionDone;
              const isCorrect = correctFlags[section.id];
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  whileHover={!isLocked ? { scale: 1.02 } : {}}
                  className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                    isActive
                      ? "bg-slate-800 border-2 border-violet-500/50 shadow-lg shadow-violet-500/10"
                      : isResultDeclared
                      ? isCorrect
                        ? "bg-emerald-900/30 border border-emerald-500/50"
                        : "bg-rose-900/30 border border-rose-500/50"
                      : isCompleted
                      ? "bg-slate-900/50 border border-emerald-500/30"
                      : "bg-slate-900/30 border border-slate-800"
                  } ${"cursor-pointer hover:border-slate-700"}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 ${isActive ? "opacity-10" : ""}`} />
                  
                  <div className="relative flex flex-col items-center gap-2">
                    <div className={`p-2 rounded-lg ${
                      isActive 
                        ? "bg-violet-500/20 text-violet-400" 
                        : isResultDeclared
                        ? isCorrect
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/20 text-rose-400"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-500"
                    }`}>
                      {isResultDeclared ? (
                        isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />
                      ) : isCompleted && !isActive ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-xs font-medium ${
                      isActive ? "text-white" : isResultDeclared ? (isCorrect ? "text-emerald-400" : "text-rose-400") : isCompleted ? "text-emerald-400" : "text-slate-500"
                    }`}>
                      {section.label}
                    </span>
                    
                    {/* Points badge */}
                    {isResultDeclared && (
                      <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? '+' + points[section.id] : '0'} pts
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSection}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                {activeSection === "winner" && (
                  <WinnerSection 
                    teamA={teamA} 
                    teamB={teamB} 
                    teamImages={teamImages}
                    winner={winner}
                    setWinner={setWinner}
                    onNext={handleNext}
                    getTeamColor={getTeamColor}
                    predictionDone={predictionDone}
                    predictionLocked={predictionLocked}
                    isResultDeclared={isResultDeclared}
                    actualWinnerId={actualWinnerId}
                    isCorrect={correctFlags.winner}
                    points={points.winner}
                  />
                )}
                {["mom", "runs", "wickets"].includes(activeSection) && (
                  <PlayerSection
                    type={activeSection}
                    data={data}
                    selected={activeSection === "mom" ? mom : activeSection === "runs" ? runs : wickets}
                    onSelect={(value) => {
                      if (activeSection === "mom") setMom(value);
                      else if (activeSection === "runs") setRuns(value);
                      else setWickets(value);
                      handleNext();
                    }}
                    teamA={teamA}
                    teamB={teamB}
                    teamImages={teamImages}
                    predictionDone={predictionDone}
                    predictionLocked={predictionLocked}
                    isResultDeclared={isResultDeclared}
                    actualPlayerIds={activeSection === "mom" ? actualMomIds : activeSection === "runs" ? actualRunsIds : actualWicketsIds}
                    isCorrect={correctFlags[activeSection]}
                    points={points[activeSection]}
                    actualPlayers={activeSection === "mom" ? actualResults?.player_of_match : activeSection === "runs" ? actualResults?.most_runs_players : actualResults?.most_wickets_players}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Summary Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {sections.map((section) => {
                  const value = section.id === "winner" ? winnerName : 
                               section.id === "mom" ? momName : 
                               section.id === "runs" ? runsName : wicketsName;
                  const isCorrect = correctFlags[section.id];
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                        activeSection === section.id
                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/50"
                          : isResultDeclared
                          ? isCorrect
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/50"
                          : value
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-900 text-slate-500 border border-slate-800"
                      }`}
                    >
                      <section.icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{section.label}:</span>
                      <span className={value ? "font-semibold" : ""}>
                        {value || "—"}
                      </span>
                      {isResultDeclared && (
                        <span className="ml-1">
                          {isCorrect ? '✓' : '✗'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit Button or Results Status */}
              {isResultDeclared ? (
                <div className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-slate-800 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Results Declared
                </div>
              ) : (
                <motion.button
                  whileHover={!predictionLocked && progress === 100 ? { scale: 1.02 } : {}}
                  whileTap={!predictionLocked && progress === 100 ? { scale: 0.98 } : {}}
                  onClick={submitPrediction}
                  disabled={predictionLocked || isPending || progress < 100}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                    predictionLocked
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default"
                      : progress === 100
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {isPending ? (
                    <ClipLoader size={18} color="#fff" />
                  ) : predictionLocked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Locked
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Lock Prediction
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

/* ================= SUB COMPONENTS ================= */

const WinnerSection = ({ 
  teamA, 
  teamB, 
  teamImages, 
  winner, 
  setWinner, 
  onNext, 
  getTeamColor, 
  predictionDone, 
  predictionLocked,
  isResultDeclared,
  actualWinnerId,
  isCorrect,
  points 
}) => {
  const actualWinner = [teamA, teamB].find(t => t?.team_id === actualWinnerId);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/20">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {isResultDeclared ? "Match Winner Result" : "Select Match Winner"}
          </h2>
          <p className="text-slate-400 text-sm">
            {isResultDeclared 
              ? isCorrect 
                ? `Correct! +${points} points` 
                : `Incorrect - 0 points`
              : "Choose which team you think will win"}
          </p>
        </div>
      </div>

      {/* Show actual result if declared */}
      {isResultDeclared && actualWinner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/30"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-500/20 rounded-full">
              <Crown className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-emerald-400 font-medium">Actual Winner</p>
              <p className="text-xl font-bold text-white">{actualWinner?.team_name}</p>
            </div>
            <img 
              src={teamImages[actualWinner?.team_name]} 
              alt={actualWinner?.team_name}
              className="h-16 w-16 object-contain ml-auto"
            />
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {[teamA, teamB].map((team) => {
          const isSelected = winner === team?.team_id;
          const isActualWinner = actualWinnerId === team?.team_id;
          const showCorrect = isResultDeclared && isSelected && isActualWinner;
          const showIncorrect = isResultDeclared && isSelected && !isActualWinner;
          
          return (
            <motion.button
              key={team?.team_id}
              whileHover={!predictionLocked && !predictionDone && !isResultDeclared ? { scale: 1.02, y: -5 } : {}}
              whileTap={!predictionLocked && !predictionDone && !isResultDeclared ? { scale: 0.98 } : {}}
              onClick={() => {
                if (!predictionLocked && !predictionDone && !isResultDeclared) {
                  setWinner(team?.team_id);
                  setTimeout(onNext, 300);
                }
              }}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 ${
                isSelected
                  ? showCorrect
                    ? "bg-emerald-900/30 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20"
                    : showIncorrect
                    ? "bg-rose-900/30 border-2 border-rose-500 shadow-2xl shadow-rose-500/20"
                    : "bg-slate-800 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10"
                  : isResultDeclared && isActualWinner
                  ? "bg-emerald-900/20 border border-emerald-500/50"
                  : "bg-slate-900/50 border border-slate-800 hover:border-slate-700"
              } ${(predictionLocked || isResultDeclared) ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getTeamColor(team?.team_name)} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* Result indicators */}
              {isResultDeclared && isActualWinner && (
                <div className="absolute top-4 left-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                  <Crown className="w-5 h-5" />
                </div>
              )}
              
              {showCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
              
              {showIncorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg"
                >
                  <X className="w-5 h-5" />
                </motion.div>
              )}

              {!isResultDeclared && isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-amber-500 text-white p-2 rounded-full shadow-lg"
                >
                  <Crown className="w-5 h-5" />
                </motion.div>
              )}

              <div className="relative flex flex-col items-center gap-4 md:gap-6">
                <motion.div 
                  className="relative"
                  animate={isSelected ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getTeamColor(team?.team_name)} opacity-30 blur-3xl rounded-full`} />
                  <img
                    src={teamImages[team?.team_name]}
                    alt={team?.team_name}
                    className="lg:h-40 lg:w-40 h-20 w-20 object-contain relative z-10 drop-shadow-2xl"
                  />
                </motion.div>
                
                <div className="text-center">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{team?.team_name}</h3>
                  <p className="text-slate-500 text-sm">
                    {isResultDeclared 
                      ? isActualWinner ? "Winner" : "Lost"
                      : "Click to select as winner"}
                  </p>
                </div>
              </div>

              {/* Bottom indicator line */}
              {isSelected && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                  showCorrect 
                    ? "bg-emerald-500" 
                    : showIncorrect 
                    ? "bg-rose-500" 
                    : "bg-gradient-to-r from-amber-500 to-orange-500"
                }`} />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

const PlayerSection = ({ 
  type, 
  data, 
  selected, 
  onSelect, 
  teamA, 
  teamB, 
  teamImages, 
  predictionDone, 
  predictionLocked,
  isResultDeclared,
  actualPlayerIds,
  isCorrect,
  points,
  actualPlayers
}) => {
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
    ? "The Standout Performer of the match" 
    : type === "runs" 
    ? "Who will score the most runs?" 
    : "Who will take the most wickets?";

  const Icon = type === "mom" ? Star : type === "runs" ? Activity : Target;
  const gradient = type === "mom" ? "from-violet-500 to-fuchsia-500" : type === "runs" ? "from-emerald-500 to-teal-500" : "from-rose-500 to-pink-500";

  const teamAPlayers = players?.filter(p => p.team_name === teamA?.team_name) || [];
  const teamBPlayers = players?.filter(p => p.team_name === teamB?.team_name) || [];

  const [showAllA, setShowAllA] = useState(false);
  const [showAllB, setShowAllB] = useState(false);

  const visibleTeamAPlayers = showAllA ? teamAPlayers : teamAPlayers.slice(0, 12);
  const visibleTeamBPlayers = showAllB ? teamBPlayers : teamBPlayers.slice(0, 12);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {isResultDeclared ? `${title} Results` : title}
          </h2>
          <p className="text-slate-400 text-sm">
            {isResultDeclared 
              ? isCorrect 
                ? `Correct! +${points} points` 
                : `Incorrect - 0 points`
              : subtitle}
          </p>
        </div>
      </div>

      {/* Show actual results if declared */}
      {isResultDeclared && actualPlayers && actualPlayers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/30"
        >
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Actual {title}</span>
          </div>
          <div className="space-y-2">
            {actualPlayers.map((player) => (
              <div key={player.player_id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br ${gradient} text-white`}>
                    {player.player_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{player.player_name}</p>
                    <p className="text-xs text-slate-400">{player.team_name} • {player.role}</p>
                  </div>
                </div>
                <img 
                  src={teamImages[player.team_name]} 
                  alt={player.team_name}
                  className="h-8 w-8 object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Team A */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={teamImages[teamA?.team_name]} alt="" className="h-8 w-8 object-contain" />
            <h3 className="font-bold text-slate-300">{teamA?.team_name}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleTeamAPlayers.map((player) => (
              <PlayerCard
                key={player.player_id}
                player={player}
                isSelected={selected === player.player_id}
                isActualWinner={actualPlayerIds.includes(player.player_id)}
                onClick={() => !predictionDone && !predictionLocked && !isResultDeclared && onSelect(player.player_id)}
                gradient={gradient}
                predictionDone={predictionDone}
                predictionLocked={predictionLocked}
                disabled={predictionLocked || predictionDone || isResultDeclared}
                isResultDeclared={isResultDeclared}
                showCorrect={isResultDeclared && selected === player.player_id && actualPlayerIds.includes(player.player_id)}
                showIncorrect={isResultDeclared && selected === player.player_id && !actualPlayerIds.includes(player.player_id)}
              />
            ))}
          </div>
          {teamAPlayers.length > 8 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAllA(!showAllA)}
                className="text-sm text-slate-400 hover:text-white bg-purple-900/50 border border-purple-800 hover:border-purple-700 p-3 rounded-lg"
              >
                {showAllA ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>

        {/* Team B */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={teamImages[teamB?.team_name]} alt="" className="h-8 w-8 object-contain" />
            <h3 className="font-bold text-slate-300">{teamB?.team_name}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleTeamBPlayers.map((player) => (
              <PlayerCard
                key={player.player_id}
                player={player}
                isSelected={selected === player.player_id}
                isActualWinner={actualPlayerIds.includes(player.player_id)}
                onClick={() => !predictionLocked && !predictionDone && !isResultDeclared && onSelect(player.player_id)}
                gradient={gradient}
                predictionDone={predictionDone}
                predictionLocked={predictionLocked || predictionDone}
                disabled={predictionLocked || predictionDone || isResultDeclared}
                isResultDeclared={isResultDeclared}
                showCorrect={isResultDeclared && selected === player.player_id && actualPlayerIds.includes(player.player_id)}
                showIncorrect={isResultDeclared && selected === player.player_id && !actualPlayerIds.includes(player.player_id)}
              />
            ))}
          </div>
          {teamBPlayers.length > 8 && (
            <div className="flex flex-wrap justify-center mt-4">
              <button
                onClick={() => setShowAllB(!showAllB)}
                className="text-sm text-slate-400 hover:text-white bg-purple-900/50 border border-purple-800 hover:border-purple-700 p-3 rounded-lg"
              >
                {showAllB ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({ 
  player, 
  isSelected, 
  isActualWinner,
  onClick, 
  gradient, 
  predictionLocked, 
  predictionDone,
  disabled,
  isResultDeclared,
  showCorrect,
  showIncorrect
}) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl p-4 mx-2 lg:mx-0 text-left transition-all duration-200 ${
      isSelected
        ? showCorrect
          ? "bg-emerald-900/40 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20"
          : showIncorrect
          ? "bg-rose-900/40 border-2 border-rose-500 shadow-lg shadow-rose-500/20"
          : `bg-slate-800 border-2 border-transparent shadow-lg`
        : isResultDeclared && isActualWinner
        ? "bg-emerald-900/20 border border-emerald-500/50"
        : "bg-slate-900/50 border border-slate-800 hover:border-slate-700"
    } ${disabled ? "cursor-default" : "cursor-pointer"}`}
    style={isSelected && !showCorrect && !showIncorrect ? {
      background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)) padding-box, linear-gradient(135deg, var(--tw-gradient-stops)) border-box`,
    } : {}}
  >
    {/* Background gradient for selected state */}
    {(isSelected && !showCorrect && !showIncorrect) && (
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
    )}
    
    {/* Actual winner indicator */}
    {isResultDeclared && isActualWinner && !isSelected && (
      <div className="absolute top-2 right-2">
        <Award className="w-4 h-4 text-emerald-400" />
      </div>
    )}
    
    <div className="relative flex items-center gap-3">
      <div className={`w-10 h-10 hidden rounded-full flex items-center justify-center text-sm font-bold ${
        isSelected
          ? showCorrect || (isSelected && !isResultDeclared)
            ? `bg-gradient-to-br ${gradient} text-white`
            : "bg-slate-800 text-slate-400"
          : isActualWinner
          ? `bg-gradient-to-br ${gradient} text-white`
          : "bg-slate-800 text-slate-400"
      }`}>
        {player.player_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${
          isSelected ? (showIncorrect ? "text-rose-300" : "text-white") : isActualWinner ? "text-emerald-300" : "text-slate-300"
        }`}>
          {player.player_name}
        </p>
        <p className={`text-xs ${
          isSelected ? (showIncorrect ? "text-rose-400/70" : "text-slate-400") : isActualWinner ? "text-emerald-400/70" : "text-slate-600"
        }`}>
          {player.role || "All-rounder"}
        </p>
      </div>

      {/* Status indicators */}
      {showCorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
      
      {showIncorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"
        >
          <X className="w-3 h-3 text-white" />
        </motion.div>
      )}
      
      {!isResultDeclared && isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </div>
  </motion.button>
);

export default SectionWrapper(PredictMatch, "PredictMatch");