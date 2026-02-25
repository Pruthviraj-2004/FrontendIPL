import React from "react";
import { images } from "../../constants";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
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

  console.log(data)

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let h = parseInt(hours, 10);
    const period = h >= 12 ? "PM" : "AM";
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return `${h}:${minutes} ${period} IST`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between">
      
      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-blue-700 mb-4 truncate">
        <FaLocationDot size={14} />
        <span className="truncate">{data.location}</span>
      </div>

      {/* Teams */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={team1Image}
            alt={data.team1.team_name}
            className="w-10 h-10 object-contain"
          />
          <p className="font-medium text-gray-900">
            {data.team1.team_name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={team2Image}
            alt={data.team2.team_name}
            className="w-10 h-10 object-contain"
          />
          <p className="font-medium text-gray-900">
            {data.team2.team_name}
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="mt-4 text-sm text-gray-600">
        <p>{formatDate(data.match_date)}</p>
        <p>{formatTime(data.match_time)}</p>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/fixtures/${data.match_id}`)}
        className="mt-5 w-full rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2"
      >
        Make Prediction
      </button>
    </div>
  );
};

export default Card;
