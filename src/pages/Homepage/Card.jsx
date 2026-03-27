import React from "react";
import { images } from "../../constants";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Card = ({ data, profile }) => {
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

    India: images.IND,
    Canada: images.CAN,
    Ireland: images.IRE,
    Pakistan: images.PAK,
    "United States": images.USA,

    Australia: images.AUS,
    England: images.ENG,
    Namibia: images.NAM,
    Oman: images.OMA,
    Scotland: images.SCO,

    Afghanistan: images.AFG,
    "New Zealand": images.NZ,
    "Papua New Guinea": images.PNG,
    Uganda: images.UGA,
    "West Indies": images.WI,

    Bangladesh: images.BAN,
    "South Africa": images.SA,
    "Sri Lanka": images.SL,
    Nepal: images.NEP,
    Netherlands: images.NED,
  };

  const navigate = useNavigate();

  const team1Image = teamImages[data.team1.team_name];
  const team2Image = teamImages[data.team2.team_name];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };


  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let h = parseInt(hours, 10);
    const period = h >= 12 ? "PM" : "AM";
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return `${h}:${minutes} ${period} IST`;
  };

  const matchDate = new Date(data.match_date);
  const today = new Date();
  const isToday = matchDate.toDateString() === today.toDateString();

  const borderClass = isToday ? "border-2 border-yellow-500" : "border border-slate-800";

  return (
    <div onClick={() => navigate(`/fixtures/${data.match_id}`)} className={`cursor-pointer bg-slate-900/80 backdrop-blur-xl ${borderClass} rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between`}>
      
      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-blue-700 mb-4 truncate">
        <FaLocationDot size={14} color="purple" />
        <span className="truncate font-medium text-purple-100">{data.stadium}, {data.location}</span>
      </div>

      {/* Teams */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={team1Image}
            alt={data.team1.team_name}
            className="w-10 h-10 object-contain"
          />
          <p className="font-medium text-gray-100">
            {data.team1.team_name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={team2Image}
            alt={data.team2.team_name}
            className="w-10 h-10 object-contain"
          />
          <p className="font-medium text-gray-100">
            {data.team2.team_name}
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="mt-4 text-sm text-gray-200">
        <p>{formatDate(data.match_date)}</p>
        <p>{formatTime(data.match_time)}</p>
      </div>

      {/* CTA */}
      {!profile && <button
        onClick={() => navigate(`/fixtures/${data.match_id}`)}
        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 my-3 py-2 rounded-md"
      >
        Make Prediction
      </button>}
    </div>
  );
};

export default Card;
