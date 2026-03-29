import axios from "axios";
import api from "./axios";
export const getFixtures = async () => {
  const config = {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios.get(
      "https://practicehost1.pythonanywhere.com/ipl2/fixtures/",
      // "http://localhost:8000/ipl2/fixtures/",
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    console.log(error);
    throw new Error(error.message);
  }
};

export const predictMatch = async ({
    winning_team_id,
    player_of_match_id,
    most_runs_player_id,
    most_wickets_player_id,
    match_id
}) => {
  const body = JSON.stringify({
    winning_team_id,
    player_of_match_id,
    most_runs_player_id,
    most_wickets_player_id
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.post(
      `/api/v2/match/${match_id}/`,
      // `http://localhost:8000/ipl2/predict1/${match_id}/`,
      body,config
    );
    return data;
  } catch (error) {
    console.log(error?.response?.data?.detail);
    if (error.response && error.response?.data?.detail) {
      throw new Error(error.response?.data?.detail);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("An error occurred.");
    }
  }
};


export const getMatchDetails = async (parsedMatchId) => {
    
    try {
      const { data } = await api.get(
        `/api/v2/match/${parsedMatchId}/`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };

  export const getMatchDetailss = async (parsedMatchId) => {
    
    try {
      const { data } = await axios.get(
        `https://practicehost1.pythonanywhere.com/ipl2/getmatchdetails/${parsedMatchId}/`,

      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };
 export const getTodayMatch = async () => {
  try {
    const { data } = await api.get("/api/v2/active-matches/");
    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
