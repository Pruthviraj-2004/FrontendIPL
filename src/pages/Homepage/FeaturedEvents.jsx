import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants";

const FeaturedEvents = () => {
  const navigate = useNavigate();

  // TEMP data – later replace with API response
  const events = [
    {
      id: "b68329a5-9e1b-4e1f-a239-488a3672b521",
      name: "Indian Premier League 2025",
      status: "Active",
      image: images.fe1
    },
    {
      id: "2",
      name: "Champions Trophy",
      status: "Coming Soon",
      image: images.fe2
    },
    {
      id: "3",
      name: "T20 World Cup",
      status: "Coming Soon",
      image: images.fe3
    },
  ];

  return (
    <section className="w-full py-4 lg:py-10 ">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
              Events
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-100">
              Featured Events
            </h2>
            <p className="mt-3 text-slate-300 max-w-xl">
              Jump into active tournaments and start predicting today.
            </p>
          </div>

          {/* <button
            onClick={() => navigate("/events")}
            className="mt-6 sm:mt-0 text-sm font-semibold text-purple-600 hover:underline"
          >
            View all events →
          </button> */}
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-slate-900/80 border backdrop-blur-xl border-slate-800"
            >
              {/* Image Placeholder */}
              <div className="h-44 bg-slate-200 flex items-center justify-center">
                <img
              src={event.image}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-200">
                    {event.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      event.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mt-2">
                  Predict match outcomes, earn points, and climb the leaderboard.
                </p>

                <div className="mt-4 text-sm font-semibold text-purple-600 group-hover:underline">
                  {event.status === "Active"
                    ? "Start predicting →"
                    : "Coming soon"}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedEvents;
