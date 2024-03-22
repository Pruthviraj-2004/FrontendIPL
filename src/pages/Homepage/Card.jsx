import React from "react";
import { teams } from "../../constants";
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
    "Royal Challengers Bengaluru": images.rcb1,
    "Sunrisers Hyderabad": images.srh1,
    "Lucknow Super Giants": images.lsg1,
    "Gujarat Titans": images.gt1,
  };
  const navigate = useNavigate()
  const teamA = data.teamA;
  const teamB = data.teamB;
  const teamAImage = teamImages[teamA.teamname];
  const teamBImage = teamImages[teamB.teamname];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let formattedHours = parseInt(hours, 10);
    let period = "AM";

    if (formattedHours === 0) {
      formattedHours = 12;
    } else if (formattedHours === 12) {
      period = "PM";
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = "PM";
    }

    return `${formattedHours}:${minutes.padStart(2, "0")} ${period} IST`;
  };

  return (
    <div
      className={`lg:w-[500px] w-full rounded-xl pb-5 lg:py-5 bg-[#eeedf0] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]`}
    >
      <div className="flex flex-col lg:justify-center items-start w-[90vw] md:w-[40vw] lg:w-[30vw] lg:px-5 h-[190px] my-7 ">
        <p className="flex flex-row  justify-start items-start gap-x-3 mb-2 text-[#0818A8]">
          <span className="ml-5 mt-[2px]">
            <FaLocationDot size={15} />
          </span>
          {data.location}
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col justify-start items-start w-[40%]">
            <div className="flex flex-row justify-start items-center my-[1px]">
              <img
                src={teamAImage}
                alt={data.teamA.teamname}
                className="w-9 h-auto my-[2px] rounded mx-3"
              />
              <p>{data.teamA.teamname}</p>
            </div>
            <div className="flex flex-row justify-start items-center my-[1px]">
              <img
                src={teamBImage}
                alt={data.teamB}
                className="w-9 h-auto my-[2px] rounded mx-3"
              />
              <p>{data.teamB.teamname}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start ml-5 my-2">
            <p>{formatDate(data.matchdate)}</p>
            <p>{formatTime(data.matchtime)}</p>
          </div>
        </div>
        <button
         onClick={()=> navigate(`/fixtures/${data.matchID}`)}
          className="w-[50%] mx-auto my-2 bg-black font-semibold hover:bg-blue-900 rounded-md text-white text-center py-1"
        >
          Make prediction
        </button>
      </div>
    </div>
  );
};

export default Card;
