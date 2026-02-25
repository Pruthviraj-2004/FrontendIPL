// services/events.js
import api from "./axios";

export const getEvents = async () => {
  const { data } = await api.get("/api/v2/fixtures/events/");
  return data;
};

export const getEventDetails = async (eventId) => {
  const { data } = await api.get(
    `/api/v2/fixtures/events/${eventId}/`
  );
  return data;
};
