import axios from "axios";
import api from "./axios";

export const getLeaderboardRankings = async (leaderboardId) => {
  try {
    const { data } = await api.get(
      `/api/v2/leaderboard/board/${leaderboardId}/`
    );

    return data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

// export const getLeaderboardRankings = async (leaderboardId) => {
//   try {
//     // const { data } = await api.get(
//     //   `/api/v2/leaderboard/board/${leaderboardId}/`,
//     //   {
//     //     withCredentials: true, // important for cookie auth
//     //   }
//     // );
//     const data = {
//   "leaderboard_id": "19899f9d-dcf5-4d27-a9c7-5c7949515f34",
//   "leaderboard_name": "Global",
//   "event_id": "b68329a5-9e1b-4e1f-a239-488a3672b521",
//   "rows": [
//     {
//       "username": "testuser101",
//       "points1": 49,
//       "points2": 42,
//       "total_points": 91,
//       "rank": 2
//     },
//     {
//       "username": "testuser1",
//       "points1": 0,
//       "points2": 0,
//       "total_points": 0,
//       "rank": 6
//     },
//         {
//       "username": "testuser102",
//       "points1": 49,
//       "points2": 42,
//       "total_points": 91,
//       "rank": 1
//     },
//     {
//       "username": "testuser3",
//       "points1": 0,
//       "points2": 0,
//       "total_points": 0,
//       "rank": 2
//     },
//     {
//       "username": "testuser102",
//       "points1": 49,
//       "points2": 31,
//       "total_points": 80,
//       "rank": 3
//     },
//     {
//       "username": "testuser3",
//       "points1": 0,
//       "points2": 0,
//       "total_points": 0,
//       "rank": 2
//     },
//     {
//       "username": "testuser102",
//       "points1": 49,
//       "points2": 42,
//       "total_points": 91,
//       "rank": 1
//     },
//     {
//       "username": "testuser3",
//       "points1": 0,
//       "points2": 0,
//       "total_points": 0,
//       "rank": 2
//     }
// ]
// }
//     return data;
//   } catch (error) {
//     console.error("Leaderboard rankings error:", error);
//     throw new Error(
//       error?.response?.data?.message || "Failed to load leaderboard rankings"
//     );
//   }
// };

export const getLeaderboardsByEvent = async (eventId) => {
  try {
    // const { data } = await api.get(
    //   `/api/v2/leaderboard/list/by-event/${eventId}/`,
    //   {
    //     withCredentials: true,
    //   }
    // );
  // const data = {
  // "event_id": "b68329a5-9e1b-4e1f-a239-488a3672b521",
  // "company_display_id": "KT5XG8B0",
  // "leaderboards": [
  //   {
  //     "leaderboard_id": "19899f9d-dcf5-4d27-a9c7-5c7949515f34",
  //     "leaderboard_name": "Global",
  //     "tag1": null,
  //     "tag2": null,
  //     "created_on": "2026-01-01"
  //   },
  //   {
  //     "leaderboard_id": "b7ff4c51-5221-4ddc-9552-9a3c78a639f5",
  //     "leaderboard_name": "Weekly",
  //     "tag1": null,
  //     "tag2": null,
  //     "created_on": "2026-01-01"
  //   }]}
   
  const response = await api.get(`/api/v2/leaderboard/list/by-event/${eventId}/`)
    // console.log("Fetched leaderboards:", data);
    return response.data;
  } catch (error) {
    console.error("Leaderboard list error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to load leaderboards"
    );
  }
};

// export const getLeaderBoard = async ({selected_leaderboard}) => {
//   const config = {
//     // Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   };
//   try {
//     // console.log(user)
//     const { data } = await axios.get(
//       "http://localhost:8000/ipl2/leaderboard2/",
//     // "https://practicehost1.pythonanywhere.com/ipl2/leaderboard2/",
//       config,{selected_leaderboard}
//     );
//     return data;
//   } catch (error) {
//     if (error.response && error.response.data.message)
//       throw new Error(error.response.data.message);
//     console.log(error);
//     throw new Error(error.message);
//   }
// };
// export const getLeaderBoard2 = async ({selected_leaderboard}) => {
//     const config = {
//       // Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };
//     try {
//       // console.log(user)
//       const { data } = await axios.get(
//       //   "http://localhost:8000/ipl2/leaderboard1/",
//       `https://practicehost1.pythonanywhere.com/ipl2/leaderboard2?selected_leaderboard=${selected_leaderboard}`,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message)
//         throw new Error(error.response.data.message);
//       console.log(error);
//       throw new Error(error.message);
//     }
//   };
  export const getLeaderBoard3 = async ({username,selected_leaderboard}) => {
    const config = {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    // console.log(username)
    try {
      // console.log(user)
      const { data } = await api.get(`/api/v2/my-submissions/`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };
export const getUserSubmission = async ({username}) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await api.get(`/api/v2/my-submissions/`, config);
      console.log("User submission response:", data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };
