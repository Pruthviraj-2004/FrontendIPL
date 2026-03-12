import React from "react";
import { images } from "../../constants";

const EventCard = ({ event, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Banner placeholder */}
      <div className="h-44 bg-gray-200 flex items-center justify-center">
                <img
              src={images.fe1}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
              </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-200 group-hover:text-purple-700 transition">
            {event.event_name}
          </h3>

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              event.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {event.status}
          </span>
        </div>

        <p className="text-sm text-slate-300">
          View fixtures, predict match outcomes, and earn points.
        </p>

        <div className="mt-4 text-sm font-semibold text-purple-600 group-hover:underline">
          View matches →
        </div>
      </div>
    </div>
  );
};

export default EventCard;
