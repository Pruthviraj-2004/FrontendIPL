import React, { useEffect, useState } from "react";
import {  Routes, Route } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import ProfilePage from "./pages/ProfilePage";
import FixturePage from "./pages/fixtures/fixturePage";
import PredictMatch from "./pages/fixtures/predict";
import UserSubmission from "./pages/leaderboard/UserSubmission";
import Authform from "./pages/Authform";
import LeaderboardForm from "./pages/leaderboard/BoardParticipate";
import Intro from "./pages/Homepage/Intro";
import { useSelector } from "react-redux";
import AboutUsPage from "./pages/AboutUs";
import Terms from "./pages/Terms";

function App() {
  
  const userState = useSelector((state) => state.user);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className="App bg-gray-100  w-screen overflow-hidden">
   
        <Routes>
          
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/register" element={<Authform />} />
          <Route exact path="/board" element={<Leaderboard />} />
          {userState?.userInfo && (
            <Route exact path="/usersubmission" element={<UserSubmission />} />
          )}
          <Route exact path="/fixtures" element={<FixturePage />} />
          <Route exact path="/fixtures/:matchId" element={<PredictMatch />} />
          <Route exact path="/lbparticipate" element={<LeaderboardForm />} />
          {isSmallScreen && (
            <Route exact path="/user" element={<ProfilePage />} />
          )}
          <Route exact path="/aboutus" element={<AboutUsPage />} />
          <Route exact path="/terms" element={<Terms />}></Route>
          
        </Routes>
   
      
    </div>
  );
}

export default App;
