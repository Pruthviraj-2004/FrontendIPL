import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../../Components/MainLayout";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Loading from "../../Components/loading";
import { ToastContainer, toast } from "react-toastify";
import { getEventDetails } from "../../services/events";
import Card from "../Homepage/Card";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState("upcoming");

  const Breadcrumbsdata = [
    { name: "Home", link: "/" },
    { name: "Events", link: "/events" },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["event-details", eventId],
    queryFn: () => getEventDetails(eventId),
    retry: false,
    onError: () => {
      toast.error("Failed to load event details", {
        position: "top-center",
        autoClose: 1500,
        closeButton: false,
      });
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-12 h-12 text-violet-500" />
          </motion.div>
        </div>
      </MainLayout>
    );
  }
  
  const event = data?.event;

  const upcomingMatches = data?.upcoming_matches || [];
  const pastMatches = data?.past_matches || [];

  return (
    <MainLayout>
        {/* <Breadcrumbs
            data={Breadcrumbsdata}
            activeName={event?.event_name}
          /> */}
      <ToastContainer />

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f]">
  
  {/* Glow effects */}
  <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[150px] rounded-full"></div>
  <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px] rounded-full"></div>

  <div className="relative max-w-6xl mx-auto py-20">
        <div className="max-w-7xl mx-auto px-2">

          

          {/* Event Header */}
          <div className="mt-8 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
              {event?.event_name}
            </h2>

            <p className="mt-2 text-gray-300">
              {event?.start_date} – {event?.end_date}
            </p>

            {event?.allow_predictions && (
              <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                Predictions Open
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-xl font-semibold ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white text-gray-700"
              }`}
            >
              Upcoming Matches
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 rounded-xl font-semibold ${
                activeTab === "past"
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white text-gray-700"
              }`}
            >
              Past Matches
            </button>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === "upcoming"
              ? upcomingMatches
              : pastMatches
            ).map((item, index) => (
              <Card key={index} data={item.match} />
            ))}
          </div>

          {/* Empty state */}
          {activeTab === "upcoming" && upcomingMatches.length === 0 && (
            <p className="text-gray-600 mt-12 text-center">
              No upcoming matches for this event.
            </p>
          )}

          {activeTab === "past" && pastMatches.length === 0 && (
            <p className="text-gray-600 mt-12 text-center">
              No past matches available.
            </p>
          )}
        </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EventDetailsPage;
