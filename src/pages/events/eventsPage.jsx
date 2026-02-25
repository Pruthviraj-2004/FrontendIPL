import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Components/MainLayout";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Loading from "../../Components/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEvents } from "../../services/events";
import EventCard from "./eventCard";

const EventsPage = () => {
  const navigate = useNavigate();

  const Breadcrumbsdata = [
    { name: "Home", link: "/" },
    { name: "Events", link: "/events" },
  ];

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const events = data?.events || [];

  return (
    <MainLayout>
       <Breadcrumbs data={Breadcrumbsdata} activeName="Events" />
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <section className="w-full py-5 bg-[#f8f9fc]">
          <ToastContainer />

          <div className="max-w-7xl mx-auto px-6">
           

            {/* Page Header */}
            <div className="mt-8 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Events
              </h2>
              <p className="mt-3 text-gray-600 max-w-xl">
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
        </section>
      )}
    </MainLayout>
  );
};

export default EventsPage;
