import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Card from '../Homepage/Card';

const UpcomingMatchesCard = ({ matches }) => {
  if (!matches || matches.length === 0) return null;
  console.log("UpcomingMatchesCard matches:", matches);
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-400" />
        Upcoming Matches
      </h3>
      
      <div className="grid gap-4 md:grid-cols-3">
        {matches.map((match) => (
        //   <div
        //     key={match.match_id}
        //     className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 
        //              hover:border-slate-600 transition-all"
        //   >
        //     {/* Event Name */}
        //     <div className="text-xs text-blue-400 font-medium mb-2">
        //       {match.event_short_name}
        //     </div>

        //     {/* Teams */}
        //     <div className="flex items-center justify-between mb-4">
        //       <div className="flex flex-col items-center flex-1">
        //         <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-300 mb-1">
        //           {match.team1.team_short_name}
        //         </div>
        //         <span className="text-sm text-slate-300 text-center">
        //           {match.team1.team_name}
        //         </span>
        //       </div>

        //       <div className="px-4 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400 font-medium">
        //         VS
        //       </div>

        //       <div className="flex flex-col items-center flex-1">
        //         <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-300 mb-1">
        //           {match.team2.team_short_name}
        //         </div>
        //         <span className="text-sm text-slate-300 text-center">
        //           {match.team2.team_name}
        //         </span>
        //       </div>
        //     </div>

        //     {/* Match Details */}
        //     <div className="space-y-2 pt-3 border-t border-slate-700/50">
        //       <div className="flex items-center gap-2 text-sm text-slate-400">
        //         <Calendar className="w-4 h-4" />
        //         <span>{formatDate(match.match_date)}</span>
        //       </div>
              
        //       <div className="flex items-center gap-2 text-sm text-slate-400">
        //         <Clock className="w-4 h-4" />
        //         <span>{formatTime(match.match_time)} IST</span>
        //       </div>
              
        //       <div className="flex items-center gap-2 text-sm text-slate-400">
        //         <MapPin className="w-4 h-4" />
        //         <span>{match.stadium}, {match.location}</span>
        //       </div>
        //     </div>

        //     {/* Match Number */}
        //     <div className="mt-3 text-xs text-slate-500">
        //       Match #{match.match_display_id}
        //     </div>
        //   </div>
        <Card data={match} profile={true} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatchesCard;