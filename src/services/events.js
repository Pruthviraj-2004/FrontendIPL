// services/events.js
import api from "./axios";

export const getEvents = async () => {
  try {
    const { data } = await api.get("/api/v2/fixtures/events/");
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventDetails = async (eventId) => {
  const { data } = await api.get(
    `/api/v2/fixtures/events/${eventId}/`
  );
  return data;
};
