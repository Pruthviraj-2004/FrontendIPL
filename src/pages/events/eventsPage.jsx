import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Components/MainLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEvents } from "../../services/events";
import EventCard from "./eventCard";
import { useSelector } from "react-redux";
import AuthRequired from "../../Components/AuthRequired";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
const EventsPage = () => {
  const navigate = useNavigate();


  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    retry: false,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to load events",
        {
          position: "top-center",
          autoClose: 1500,
          closeButton: false,
        }
      );
    },
  });
  
  console.log("Events data:", data);
  console.log("Loading state:", isLoading);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const events = data?.events || [];

  const userState = useSelector((state) => state.user);

    if (!userState?.userInfo) {
  return (
    <MainLayout>
      <AuthRequired message="Sign in to view and participate in events." />
    </MainLayout>
  );
}
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
  return (
    <MainLayout>
       {/* <Breadcrumbs data={Breadcrumbsdata} activeName="Events" /> */}

             <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f]">
  
  {/* Glow effects */}
  <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[150px] rounded-full"></div>
  <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px] rounded-full"></div>

  <div className="relative py-5">
          <ToastContainer />

          <div className="max-w-7xl mx-auto px-6">
           

            {/* Page Header */}
            <div className="mt-8 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
                Events
              </h2>
              <p className="mt-3 text-gray-300 max-w-xl">
                Select a tournament to explore fixtures and start predicting.
              </p>
            </div>

            {/* Events Grid */}
            {events.length === 0 ? (
              <p className="text-center text-gray-600 mt-20">
                No events available at the moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <EventCard
                    key={event.event_id}
                    event={event}
                    onClick={() => navigate(`/events/${event.event_id}`)}
                  />
                ))}
              </div>
            )}
          </div>
          </div>
        </section>
    </MainLayout>
  );
};

export default EventsPage;
