import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {  slideIn, zoomIn } from "../../utils/motion";
 import { SectionWrapper } from "../../hoc";
 import { useSelector } from "react-redux";
// import CTA from "../../Components/CTA";
import { images } from "../../constants";

import MainLayout from "../../Components/MainLayout";
import { predictMatch } from "../../services/fixtures";
import { useQuery } from "@tanstack/react-query";
import { getMatchDetails } from "../../services/fixtures";
import {teams} from "../../constants";
import Popup from "../../Components/Popup";
import { createPortal } from "react-dom";
import ErrorMessage from "../../Components/Error";
import Breadcrumbs from "../../Components/Breadcrumbs";


const PredictMatch = () => {
  const userState = useSelector((state)=>state.user)
  const [completed, isCompleted] = useState(false);
  const [current,setCurrent] = useState(false);
  const [popup, setPopup] = useState(false);
  const { matchId } = useParams();
  const parsedMatchId = parseInt(matchId);
// console.log(parsedMatchId);

  const Breadcrumbsdata= [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Fixtures",
      link: "/fixtures",
    },
    {
      name: `${matchId}`,
      link: `/${matchId}/`,
    },
  ]

  const [errorss,setCreateError]= useState(false);
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
    
    "India": images.IND ,
    "Canada": images.CAN ,
    "Ireland": images.IRE ,
    "Pakistan": images.PAK ,
    "United States": images.USA ,

    "Australia": images.AUS ,
    "England": images.ENG ,
    "Namibia": images.NAM ,
    "Oman": images.OMA ,
    "Scotland": images.SCO ,
    
    "Afghanistan": images.AFG ,
    "New Zealand": images.NZ ,
    "Papua New Guinea": images.PNG ,
    "Uganda": images.UGA ,
    "West Indies": images.WI ,

    "Bangladesh": images.BAN ,
    "South Africa": images.SA ,
    "Sri Lanka": images.SL ,
    "Nepal": images.NEP ,
    "Netherlands": images.NED ,

  };
  const teamColors = {
    "Chennai Super Kings": "yellow", // Yellow
    "Delhi Capitals": "#136EA4", // Blue
    "Kolkata Knight Riders": "#3A225D", // Purple
    "Mumbai Indians": "#005DA0", // Blue
    "Punjab Kings": "#E41E26", // Red
    "Rajasthan Royals": "#2D3E8B", // Blue
    "Royal Challengers Bangalore": "#000000", // Black
    "Sunrisers Hyderabad": "#FF822A", // Orange
    "Lucknow Super Giants": "#000080", // Navy
    "Gujarat Titans": "#008000", // Green
  };
 
  const { data, isLoading: isLoading1, refetch } = useQuery({
    queryFn: () => {
        return getMatchDetails(parsedMatchId);
    },
    onError: (error) => toast.error(error.message,{
      position: "top-center",
      autoClose: 3000,
      style: {
        width: "auto",
        style: "flex justify-center",
      },
      closeButton: false,
      progress: undefined,
    }),
    queryKey: ["match", parsedMatchId],
  });
  
  useEffect(() => {
    refetch();
  }, [isLoading1]);
  useEffect(() => {
    if(data?.match_status === 1){
      isCompleted(true)
    } else {
      isCompleted(false)
    }
  }, [isLoading1,data]);
  


  const playerss = data ? data["players"] : null;
  const team_a = data ? data["team_A"] : null;
  const team_b = data ? data["team_B"] : null;
  const batters = data ? data["batsmen"] : null;
  const bowlers = data ? data["bowlers"] : null;
 
  const teamByName = teams[team_a?.teamshortform?.toLowerCase()]
  const teamBByName = teams[team_b?.teamshortform?.toLowerCase()]

  const currentDate = new Date();

  const matchTimeParts = data ? data?.match_time?.split(":") : null; // Split match time into hours and minutes
  const matchHours = matchTimeParts ? parseInt(matchTimeParts[0], 10) : 0; // Check if matchTimeParts is not null
  const matchMinutes = matchTimeParts ? parseInt(matchTimeParts[1], 10) : 0; 
  const matchTime = matchTimeParts ? new Date(currentDate).setHours(matchHours, matchMinutes, 0, 0) : 0; 

  const currentTime = currentDate.getTime();
  // console.log(currentTime)
  // Compare current time with match time and check if it's before 12 AM
  if (currentTime > matchTime && currentTime < new Date(currentDate).setHours(0, 0, 0, 0)) {
   setCurrent(true)
  }
  
  const { mutate,isLoading } = useMutation({
    mutationFn: ({
      predicted_winner_team,
      predicted_player_of_the_match,
      predicted_most_runs_scorer,
      predicted_most_wicket_taker,
      username,
      match_id
    }) => {
      return predictMatch({
        predicted_winner_team,
        predicted_player_of_the_match,
        predicted_most_runs_scorer,
        predicted_most_wicket_taker,
        username,
        match_id
      });
    },
    onSuccess: (data) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success("Prediction successfull!", {
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      })
      
      
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      })
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      team: "",
      player: "",
      runs: "",
      wickets: "",
      username: userState?.userInfo?.user?.username
    },
    mode: "onChange",
  });
  const submitHandler = async (data) => {
    if(userState?.userInfo){
    try {
      mutate({
        predicted_winner_team: data.team,
        predicted_player_of_the_match: data.player,
        predicted_most_runs_scorer: data.runs,
        predicted_most_wicket_taker: data.wickets,
        username: userState.userInfo.user.username,
        match_id: matchId,
      });
    } catch (error) {
      toast.error("Match has started!", {
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          display: "flex",
          justifyContent: "center",
        },
        closeButton: false,
        progress: undefined,
      }
      )
    }
  } else {
   setCreateError(true)
  }
  };
  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setPopup(true);
    }, 1000);
    

  }, []);
  const handleClosePopup = () => {
    setPopup(false);
  };
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])

  return (
    <>
    {/* {popup &&
        createPortal(
          <Popup setClose={handleClosePopup} />,
          document.getElementById("error")
        )} */}
        {
          errorss && createPortal(
            <ErrorMessage message="You must be logged in!!" setCreateError={setCreateError}></ErrorMessage>,document.getElementById("error")
          )
        }
    <MainLayout>

      <section className="h-full bg-white mt-[65px] overflow-hidden " 
        style={{
          backgroundImage: `url(${images.bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Breadcrumbs data={Breadcrumbsdata} activeName={matchId} />
        <div className="flex flex-col mt-[0px] justify-center items-center md:w-full lg:w-full xs:w-[90%]  overflow-hidden ">
          <ToastContainer className="z-[100001]"/>
          {/* <div className="bg-white text-black p-4 text-center">
            <p className="text-sm md:text-base">
            📅 From May 21th to the May 22th, it's the time to earn double points during Playoffs. 💪🏆
            </p>
          </div> */}
          <div  className="w-full flex justify-center items-center text-2xl mt-[80px] font-semibold ">
            <motion.div
              variants={slideIn("left", "spring", 0.4, 2)}
              className="flex flex-col justify-end items-center lg:items-end mx-4  h-40 "
            >
              <img
                src={teamImages[team_a?.teamname]}
                alt=""
                className="w-[150px] h-[150px] my-2"
              />
              <p className={`text-lg text-center w-[144px] h-18 justify-start text-[${teamColors[team_a?.teamname]}]`}>
                &nbsp;{team_a?.teamname}
              </p>
            </motion.div>
           <div className="flex justify-center items-center w-[2%]">
           <motion.p variants={zoomIn(0.4, 1)} className="text-center text-purple-950">
              &nbsp;vs&nbsp;
            </motion.p>
           </div>
            <motion.div
              variants={slideIn("right", "spring", 0.4, 2)}
              className="flex flex-col justify-end items-center lg:items-start items-center mx-4 gap-x-3 h-40 "
            >
              <img
                src={teamImages[team_b?.teamname]}
                alt=""
                // className={`${team_b?.teamname === 'Royal Challengers Bangalore' ? "w-[50px]" : "w-[110px]"} h-auto my-2`}
                className="w-[150px] h-[150px] my-2"
              />
              <p className={`text-lg text-center w-[144px] h-18 text-${teamColors[team_b?.teamname]}-600`}>
                &nbsp;{team_b?.teamname}
              </p>
            </motion.div>
          </div>
          
          {!current? <div className="h-fit flex flex-col justify-center items-center bg-white max-w-4xl w-[430px]  rounded-lg  m-5">
            <motion.p
              variants={zoomIn(0.4, 1.2)}
              className="text-2xl uppercase font-bold mt-10"
            >
              {!completed ? "Make predictions" : "Results"}
            </motion.p>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="w-[300px] my-5  p-2 space-y-6 mx-auto"
            >
              <div >
                <label className="flex flex-col">
                  <span className="font-semibold text-left w-full">Team</span>
                  {!completed ? (
                    <select
                      {...register("team", {
                        required: {
                          value: true,
                          message: completed ? data?.winner_team : "Select team",
                        },
                      })}
                      type="text"
                      name="team"
                      className="form-input border-gray-400 border-2 rounded-md mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Team
                      </option>

                      <option value={team_a?.teamname} className="text-black">
                        {team_a?.teamname}
                      </option>
                      <option value={team_b?.teamname} className="text-black">
                        {team_b?.teamname}
                      </option>
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.winner_team}
                    </div>
                  )}
                </label>
              </div>
              {errors.team?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.team?.message}
                </p>
              )}

              <div>
                <label className="flex flex-col">
                  <span className="font-semibold text-left w-full">
                    Player of the match
                  </span>
                  {!completed ? (
                    <select
                      {...register("player", {
                        required: {
                          value: true,
                          message: "Select a player",
                        },
                      })}
                      type="text"
                      name="player"
                      className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Player
                      </option>

                      {playerss?.map((player, index) => (
                        <option value={player?.name}>{player?.name} ({player?.team})</option>
                      ))}
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.player_of_match}
                    </div>
                  )}
                </label>
              </div>
              {errors.player?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.player?.message}
                </p>
              )}
              <div>
              <label className="flex flex-col">
                  <span className="font-semibold text-left w-full">
                    Leading runs scorer
                  </span>
                  {!completed ? (
                    <select
                      {...register("runs", {
                        required: {
                          value: true,
                          message: "Select a player",
                        },
                      })}
                      type="text"
                      name="runs"
                      className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select batsman
                      </option>

                      {batters?.map((batter, index) => (
                        <option value={batter?.name}>{batter?.name} ({batter?.team})</option>
                      ))}
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.most_runs_player}
                    </div>
                  )}
                </label>
              </div>
              {errors.runs?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.runs?.message}
                </p>
              )}
              <div>
              <label className="flex flex-col">
                  <span className="font-semibold text-left w-full">
                   Leading wicket taker
                  </span>
                  {!completed ? (
                    <select
                      {...register("wickets", {
                        required: {
                          value: true,
                          message: "Select a player",
                        },
                      })}
                      type="text"
                      name="wickets"
                      className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select bowler
                      </option>

                      {bowlers?.map((player, index) => (
                        <option value={player?.name}>{player?.name} ({player?.team})</option>
                      ))}
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.most_wickets_taker}
                    </div>
                  )}
                </label>
              </div>
              {errors.wickets?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.wickets?.message}
                </p>
              )}

                    <div className="flex flex-row my-auto">
                    {!completed && (
                      <button
                        type="submit"
                        // disabled={isLoading}
                        className="bg-[#29349e] hover:bg-[#10185c] cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center"
                      >
                        {/* {isLoading ? "Adding..." : "Predict"} */}
                        Predict
                      </button>
                    )}
                  </div>
            </form>
          </div> : <div></div>}
          {/* <div className="mt-5 flex flex-col gap-y-4 ">
            <div className=" mx-8 shadow-lg p-3 rounded-md">
              <p className="text-left font-semibold my-2 text-xl">
                 {team_a?.teamshortform} Current squad
              </p>
              <div className="text-lg text-left">
                <b>Wicketkeepers:</b>&nbsp;{teamByName?.Wicketkeepers}
                <p>
                  <b>Batters:</b>&nbsp;{teamByName?.Batters}
                </p>{" "}
                <p>
                  <b>All-rounders:</b>&nbsp;{teamByName?.Allrounders}
                </p>{" "}
                <p>
                  <b>Bowlers:</b>&nbsp;{teamByName?.Bowlers}
                </p>
              </div> 
            </div>
            <div className=" p-3 rounded-md  mx-8 mb-6 my-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
              <p className="text-left font-semibold my-2 text-xl">
                {team_b?.teamshortform} Current squad
              </p>
              <div className="text-lg text-left">
                <b>Wicketkeepers:</b>&nbsp;{teamBByName?.Wicketkeepers}
                <p>
                  <b>Batters:</b>&nbsp;{teamBByName?.Batters}
                </p>{" "}
                <p>
                  <b>All-rounders:</b>&nbsp;{teamBByName?.Allrounders}
                </p>{" "}
                <p>
                  <b>Bowlers:</b>&nbsp;{teamBByName?.Bowlers}
                </p>
              </div> 
            </div>
          </div> */}
        </div>
      </section>
    </MainLayout>
    </>
  );
};

export default SectionWrapper(PredictMatch,"PredictMatch");