import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Target,
  User,
  Activity,
  Zap,
  Calendar,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Award,
  Clock,
  Shield,
  XCircle,
  CheckCircle2,
  Minus,
  BarChart3,
  Flame,
  Crown,
  Medal,
  Sparkles,
} from "lucide-react";
import { getUserSubmission } from "../../services/leaderboard";
import MainLayout from "../../Components/MainLayout";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { useNavigate } from "react-router-dom";

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

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

// Helper components
const PredictionBadge = ({ label, predicted, actual, points, isCorrect, icon: Icon }) => {
  const getStatusColor = () => {
    if (actual === null || actual === undefined) return "bg-slate-800/50 border-slate-700 text-slate-400";
    if (isCorrect) return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
    return "bg-rose-500/10 border-rose-500/30 text-rose-400";
  };

  const getStatusIcon = () => {
    if (actual === null || actual === undefined) return <Minus className="w-4 h-4" />;
    if (isCorrect) return <CheckCircle2 className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border backdrop-blur-sm p-3 ${getStatusColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 opacity-70" />
          <span className="text-xs font-medium uppercase tracking-wider opacity-70">{label}</span>
        </div>
        {getStatusIcon()}
      </div>
      <div className="mt-2">
        <p className="font-semibold text-sm truncate">{predicted || "—"}</p>
        {actual !== null && actual !== undefined && (
          <p className="text-xs opacity-60 mt-0.5">Actual: {actual}</p>
        )}
      </div>
      {points > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg"
        >
          +{points}
        </motion.div>
      )}
    </div>
  );
};

const MatchCard = ({ submission, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalPossiblePoints = 40; // Assuming 10 points per category
  const accuracyPercentage = Math.round((submission.total_points / totalPossiblePoints) * 100);
  
  const getAccuracyColor = () => {
    if (accuracyPercentage >= 75) return "from-emerald-400 to-teal-500";
    if (accuracyPercentage >= 50) return "from-amber-400 to-orange-500";
    if (accuracyPercentage > 0) return "from-orange-400 to-rose-500";
    return "from-slate-400 to-slate-600";
  };

  const getMatchStatus = () => {
    // Check if match is completed by looking if any actual results exist
    const hasResults = submission.flag_winner !== null || 
                      submission.flag_mom !== null || 
                      submission.flag_mruns !== null;
    return hasResults ? "completed" : "pending";
  };

  const status = getMatchStatus();

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group relative"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getAccuracyColor()} rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500`} />
      
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  status === "completed" 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  {status}
                </span>
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(submission.updated_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                {submission.match_name}
              </h3>
              <p className="text-slate-400 text-sm mt-0.5">{submission.event_name}</p>
            </div>
            
            {/* Score Circle */}
            <div className="relative">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-slate-800"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={175.9}
                  strokeDashoffset={175.9 - (175.9 * accuracyPercentage) / 100}
                  className={`text-transparent stroke-[url(#gradient-${index})]`}
                  initial={{ strokeDashoffset: 175.9 }}
                  animate={{ strokeDashoffset: 175.9 - (175.9 * accuracyPercentage) / 100 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={`text-${getAccuracyColor().split(' ')[1].replace('from-', '')}`} />
                    <stop offset="100%" className={`text-${getAccuracyColor().split(' ')[2]}`} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">{submission.total_points}</span>
                <span className="text-[10px] text-slate-500 uppercase">pts</span>
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex-1 text-center">
              <p className="text-sm font-semibold text-slate-300">{submission.team1}</p>
              {submission.predicted_winner_team === submission.team1 && (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 mt-1">
                  <Crown className="w-3 h-3" /> Your Pick
                </span>
              )}
            </div>
            <div className="px-4">
              <span className="text-2xl font-black text-slate-600 italic">VS</span>
            </div>
            <div className="flex-1 text-center">
              <p className="text-sm font-semibold text-slate-300">{submission.team2}</p>
              {submission.predicted_winner_team === submission.team2 && (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 mt-1">
                  <Crown className="w-3 h-3" /> Your Pick
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Predictions Grid */}
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "auto" }}
            className="px-6 pb-6"
          >
            <div className="grid grid-cols-2 gap-3">
              <PredictionBadge
                label="Winner"
                predicted={submission.predicted_winner_team}
                actual={submission.flag_winner !== null ? (submission.flag_winner ? submission.predicted_winner_team : "Other") : null}
                points={submission.points_winner}
                isCorrect={submission.flag_winner}
                icon={Trophy}
              />
              <PredictionBadge
                label="Player of Match"
                predicted={submission.predicted_player_of_match}
                actual={submission.flag_mom !== null ? (submission.flag_mom ? submission.predicted_player_of_match : "Other") : null}
                points={submission.points_mom}
                isCorrect={submission.flag_mom}
                icon={User}
              />
              <PredictionBadge
                label="Most Runs"
                predicted={submission.predicted_most_runs}
                actual={submission.flag_mruns !== null ? (submission.flag_mruns ? submission.predicted_most_runs : "Other") : null}
                points={submission.points_runs}
                isCorrect={submission.flag_mruns}
                icon={Activity}
              />
              <PredictionBadge
                label="Most Wickets"
                predicted={submission.predicted_most_wickets}
                actual={submission.flag_mwickets !== null ? (submission.flag_mwickets ? submission.predicted_most_wickets : "Other") : null}
                points={submission.points_wickets}
                isCorrect={submission.flag_mwickets}
                icon={Zap}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Submitted {new Date(submission.updated_at).toLocaleTimeString()}</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            {isExpanded ? "Show Less" : "Details"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <motion.div
    variants={statsVariants}
    className="relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 hover:border-slate-700 transition-all group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
    <div className="relative flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-20"
  >
    <div className="relative inline-block mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-2xl opacity-20" />
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-full p-6">
        <Target className="w-12 h-12 text-slate-400" />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">No Submissions Yet</h3>
    <p className="text-slate-400 max-w-md mx-auto mb-6">
      You haven't made any predictions yet. Start predicting matches to see your submission history here!
    </p>
    <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl transition-all transform hover:scale-105">
      Make Your First Prediction
    </button>
  </motion.div>
);

const UserSubmission = () => {
  const userState = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getUserSubmission({ username: userState?.userInfo?.user?.username }),
    queryKey: ["usersubmissions"],
  });
 
  console.log("User submission data:", data);
  const submissions = data?.submissions || [];
  
  // Calculate stats
  const totalSubmissions = submissions.length;
  const completedMatches = submissions.filter(s => s.flag_winner !== null).length;
  const totalPoints = submissions.reduce((acc, s) => acc + s.total_points, 0);
  const averagePoints = totalSubmissions > 0 ? (totalPoints / totalSubmissions).toFixed(1) : 0;

  // Filter submissions
  const filteredSubmissions = submissions.filter(sub => {
    if (filter === "completed") return sub.flag_winner !== null;
    if (filter === "pending") return sub.flag_winner === null;
    return true;
  });

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-violet-500" />
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950 text-white pb-20">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pt-8">
          {/* Breadcrumbs */}
          {/* <Breadcrumbs
            data={[
              { name: "Home", link: "/" },
              { name: "My Submissions", link: "/usersubmission" },
            ]}
          /> */}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                My Predictions
              </span>
            </h1>
            <p className="text-slate-400 text-lg">Track your performance and submission history</p>
          </motion.div>

          {/* Stats Grid */}
          {totalSubmissions > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            >
              <StatCard
                title="Total Predictions"
                value={totalSubmissions}
                icon={Target}
                color="from-violet-600 to-purple-600"
                subtitle="All time submissions"
              />
              <StatCard
                title="Completed Matches"
                value={completedMatches}
                icon={CheckCircle2}
                color="from-emerald-600 to-teal-600"
                subtitle={`${Math.round((completedMatches/totalSubmissions)*100) || 0}% completion rate`}
              />
              <StatCard
                title="Total Points"
                value={totalPoints}
                icon={Trophy}
                color="from-amber-600 to-orange-600"
                subtitle="Lifetime earnings"
              />
              <StatCard
                title="Avg. Points"
                value={averagePoints}
                icon={TrendingUp}
                color="from-rose-600 to-pink-600"
                subtitle="Per match average"
              />
            </motion.div>
          )}

          {/* Filters */}
          {totalSubmissions > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: "all", label: "All Submissions", count: submissions.length },
                { id: "completed", label: "Completed", count: completedMatches },
                { id: "pending", label: "Pending", count: totalSubmissions - completedMatches },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === f.id
                      ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                      : "bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filter === f.id ? "bg-slate-200 text-slate-700" : "bg-slate-800 text-slate-500"
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          {filteredSubmissions.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {paginatedSubmissions.map((submission, index) => (
                  <MatchCard key={submission.match_id} submission={submission} index={index} />
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          currentPage === i
                            ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                            : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserSubmission;