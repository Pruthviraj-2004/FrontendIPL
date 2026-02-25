import React from "react";
import { useNavigate } from "react-router-dom";

const MatchCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between">
      
      {/* Teams */}
      <div className="space-y-3">
        <p className="font-medium text-gray-900">
          {data.team1.team_name} vs {data.team2.team_name}
        </p>
      </div>

      {/* Date & Time */}
      <div className="mt-4 text-sm text-gray-600">
        <p>{data.match_date}</p>
        <p>{data.match_time}</p>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/fixtures/${data.match_id}`)}
        className="mt-5 w-full rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2"
      >
        View Match
      </button>
    </div>
  );
};

export default MatchCard;
