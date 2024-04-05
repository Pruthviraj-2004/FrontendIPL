import { fadeIn } from "../../utils/motion";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { getTodayMatch } from "../../services/fixtures";
import React, { useEffect} from "react";
import { MdLeaderboard } from "react-icons/md";
import MainLayout from "../../Components/MainLayout";
import { images } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HeroSection from "./Hero";
import News from "./News";
import Card from './Card'
import Quote from "./Quote";

const textss = [
  { index: 1, title: "Browse the upcoming matches and make your predictions." },
  { index: 2, title: "Earn points based on the accuracy of your predictions." },
  { index: 3,title: "Check the leaderboard to see your ranking among other players." },
  { index: 4, title: "Enjoy the thrill of predicting and winning!" },
];

const additionalRules = [
  { id: 1, text: "The Global Leaderboard reward is given to the winners of the entire tournament, up until the final match." },
  { id: 2, text: "1st Prize - Rs.2500 worth Amazon Gift Voucher." },
  { id: 3, text: "2nd Prize - Rs.1500 worth Amazon Gift Voucher." },
  { id: 4, text: "3rd Prize - Rs.1000 worth Amazon Gift Voucher." },

  { id: 5, text: "The Weekly Leaderboard reward is granted for matches from Friday to Thursday, with a reward available after each set." },
  { id: 6, text: "1st Prize - Rs.200 worth Amazon Gift Voucher." },
];

const Points = [
  { id: 1, text: "Winner Team - 3 Base Points." },
  { id: 2, text: "Player of the Match - 2 Base Points." },
  { id: 3, text: "Most Runs Scorer of the Match - 2 Base Points." },
  { id: 4, text: "Most Economical Wicket Taker of the Match - 2 Base Points." },
  // { id: 5, text: "Bonus weeks with 2x and 3x Bonus Points." },

  { id: 5, text: "In case of players with same runs then Strike Rate is taken under consideration." },
  { id: 6, text: "In case of players with same wickets then Economy is taken under consideration." },
  { id: 7, text: "In case of same points, user submission time is taken under consideration." },

];

const Introo = () => {
  const navigate = useNavigate("/");

  const {
    data: dataa,
    isLoading,
    refetch
  } = useQuery({
    queryFn:async () => {
      return await getTodayMatch();
    },
    queryKey: ["todaymatch"],
  });
  useEffect(() => {
    refetch();
  }, [isLoading]);

  const dataaa = dataa?.matches;

  return (
    <>
      <MainLayout>
        
        <section className="h-full w-screen max-w-screen scrollbar-hide">
          <div className={` w-screen max-w-screen  mt-20 flex flex-col  `}>
            <div
              style={{
                backgroundImage: `url(${images.bg23})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <HeroSection />

              
            </div>
            
            <div className=" w-screen max-w-screen">
              <motion.h2
                variants={fadeIn("right", "spring", 0.5, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className={`${styles.sectionHeadText} text-left mt-10 ml-10`}
              >
                Today's fixtures&nbsp;
              </motion.h2>
              <div className="lg:flex lg:flex-row lg:w-screen lg:gap-x-1">
                <div
                  className="scrollable-wrapper scrollbar-hide mx-7 py-5 flex flex-row whitespace-nowrap gap-x-4 lg:gap-x-15"
                  style={{ width: "100vw", overflowX: "auto" }}
                >
                  {dataaa &&
                    dataaa?.map((match, index) => {
                      const matchDate = new Date(match.matchdate);
                      const currentDate = new Date();
                      const isMatchCompleted = matchDate < currentDate;
                      const currentTime =
                        currentDate.getHours() * 60 + currentDate.getMinutes();

                      const matchTimeParts = match.matchtime.split(":");
                      const matchHours = parseInt(matchTimeParts[0], 10);
                      const matchMinutes = parseInt(matchTimeParts[1], 10);

                      let isTodayBeforeMatchTime = false;
                      if (
                        currentDate.toDateString() === matchDate.toDateString()
                      ) {
                        const matchTimeInMinutes =
                          matchHours * 60 + matchMinutes;
                        isTodayBeforeMatchTime =
                          currentTime < matchTimeInMinutes;
                      }
                    

                      if (isMatchCompleted && isTodayBeforeMatchTime) {
                        return <Card data={match} />;
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
             
            </div>
            {/* <div className=" w-screen max-w-screen">
              <Quote />
             
            </div> */}
            
          {/* Global Leaderboard Winner Reward */}
          <div className="mx-10">
            <h3 className="text-xl font-bold mt-4">Global Leaderboard Winner Reward:</h3>
            <ol>
              {additionalRules.slice(0, 4).map((rule) => (
                <li key={rule.id} className="text-left text-lg my-4">
                  <p className="flex flex-row justify-start">
                    <p className="rounded-full text-start lg:mr-2 justify-center w-full lg:w-screen bg-none font-bold text-pink-900 ">
                      {rule.id}.&nbsp;&nbsp;
                      <span className="font-medium text-black">
                        {rule.text}
                      </span>
                    </p>
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Weekly Leaderboard Winner Reward */}
          <div className="mx-10">
            <h3 className="text-xl font-bold mt-4">Weekly Leaderboard Winner Reward:</h3>
            <ol>
              {additionalRules.slice(4, 7).map((rule) => (
                <li key={rule.id} className="text-left text-lg my-4">
                  <p className="flex flex-row justify-start">
                    <p className="rounded-full text-start lg:mr-2 justify-center w-full lg:w-screen bg-none font-bold text-pink-900 ">
                      {rule.id}.&nbsp;&nbsp;
                      <span className="font-medium text-black">
                        {rule.text}
                      </span>
                    </p>
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className=" w-screen max-w-screen">
              <Quote />
             
            </div>
            
            <motion.div
              animate="show"
              initial="hidden"
              className="w-screen max-w-screen mx-auto px-5 lg:px-10 my-5"
            >
              <motion.p
                variants={fadeIn("up", "spring", 0.5, 1)}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                initial="hidden"
                className="text-[#6b042c] text-start font-semibold"
              >
                About
              </motion.p>
              <motion.p
                className={`${styles.sectionHeadText}  text-left  mb-5`}
              >
                Predictive Play
              </motion.p>

              <div>
                <p className="text-justify  font-medium text-lg">
                  Welcome to our prediction website, where the excitement of
                  sports meets the thrill of forecasting outcomes! Whether
                  you're a seasoned predictor or just starting out, our platform
                  offers an immersive experience that's both engaging and
                  rewarding. Before you dive into the action, here's a quick
                  overview of how it all works:
                </p>
              </div>
            
            </motion.div>

            <div
              className="w-screen max-w-screen bg-[#eeedf0] mx-auto px-5 lg:px-10 my-5 ">
              <div className="">
                <h2 className={`${styles.sectionHeadText} mt-5 text-left`}>
                  How it works&nbsp;?
                </h2>
                <div className="flex">
                  <ol>
                    {textss.map((text, index) => (
                      <li className="text-left text-lg   my-4">
                        <p className="flex flex-row">
                          <p className=" rounded-full text-center lg:mr-2 justify-center w-10 lg:w-7 bg-none font-bold text-pink-900 lg:bg-pink-500">
                            {index + 1}
                          </p>
                          &nbsp;
                          <p className="font-medium text-black">{text.title}</p>
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
             
            </div>
            
            <div className="mt-5 mx-10">
              <h2 className="text-2xl font-bold text-left">Points System:</h2>
              <div className="flex">
                <ol>
                  {Points.map((rule) => (
                    <li key={rule.id} className="text-left text-lg my-4">
                      <p className="flex flex-row justify-start">
                        <p className="rounded-full text-start lg:mr-2 justify-center w-full lg:w-screen bg-none font-bold text-pink-900 ">
                          {rule.id}.&nbsp;&nbsp;
                          <span className="font-medium text-black">
                            {rule.text}
                          </span>
                        </p>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div
              className="w-screen max-w-screen mx-auto px-5 lg:px-10 my-5"
            >
              <motion.div>
                <div className="w-14 h-14 my-2 hover:opacity-85 bg-slate-300 flex justify-center items-center rounded-full px-2">
                  <div
                    onClick={() => {
                      navigate("/board");
                    }}
                    className="w-12 h-12 hover:cursor-pointer bg-slate-200 flex justify-center items-center rounded-full px-2"
                  >
                    <MdLeaderboard size={28} color="blue" />
                  </div>
                </div>
                <h5 className="text-[#6b042c] text-start font-semibold">
                  Check out
                </h5>
                <h3 className={`${styles.sectionHeadText}  text-left  mb-5`}>
                  LeaderBoard
                </h3>
                <p className={` text-left text-lg font-semibold`}>
                  Keep an eye on the{" "}
                  <b className="text-[#38277e]">leaderboard </b>
                  to see how you stack up against other players. The more
                  accurate your predictions, the higher you'll climb!
                </p>
              </motion.div>
            </div>
            <div className="w-screen max-w-screen lg:mx-0 mx-5">
              <p className={`${styles.sectionHeadText} mt-5 text-left lg:ml-10`}>News</p>
              <News />
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Introo;