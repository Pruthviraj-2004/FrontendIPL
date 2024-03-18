import axios from "axios";
export const getFixtures = async () => {
  const config = {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios.get(
      "https://practicehost1.pythonanywhere.com/ipl2/fixtures/",
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
  predicted_winner_team,
  predicted_player_of_the_match,
  predicted_most_runs_scorer,
  predicted_most_wicket_taker,
  username,
  match_id
}) => {
  const body = JSON.stringify({
    predicted_winner_team,
    predicted_player_of_the_match,
    predicted_most_runs_scorer,
    predicted_most_wicket_taker,
    username,
    match_id
  });
  // console.log(body)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      `https://practicehost1.pythonanywhere.com/ipl2/predict1/${match_id}/`,
      body,config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      // If the server returns an error message, throw an Error with that message
      throw new Error(error.response.data.error);
    } else if (error.message) {
      // If there's an error but no specific error message from the server, throw the error message
      throw new Error(error.message);
    } else {
      // If there's no error message at all, throw a generic error
      throw new Error("An error occurred.");
    }
  }
};

export const getMatchDetails = async (parsedMatchId) => {
    
    try {
      const { data } = await axios.get(
        `https://practicehost1.pythonanywhere.com/ipl2/predict1/${parsedMatchId}/`,

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
      const { data } = await axios.get(
        `https://practicehost1.pythonanywhere.com/ipl2/home/`,

      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };