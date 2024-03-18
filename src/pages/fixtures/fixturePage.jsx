import React, { useEffect,useState } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import Matches from "./matches";
import { getFixtures } from "../../services/fixtures";
import MainLayout from "../../Components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { images } from "../../constants";
import Loading from "../../Components/loading";
const FixturePage = () => {
  const Breadcrumbsdata = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Fixtures",
      link: "/fixtures",
    },
  ]
  const { data, refetch } = useQuery({
    queryFn: () => getFixtures({}),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  useEffect(() => {
    refetch();
  }, []);
  
  

  const upcomingMatches = data ? data?.upcoming_matches : null;

  const pastMatches =data ? data?.past_matches : null;
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function to clear the timeout if component unmounts
  }, []);

  return (
    <MainLayout>
      {
        loading ? (<div className="w-screen h-screen text-center flex justify-center items-center animate-pulse">
        <Loading/>
      </div>) : (
          <section className={`h-full  mt-[75px] overflow-hidden`} 
        style={{
          backgroundImage: `url(${images.bg10})`,//changed to bg25 from bg10
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }}
      >
        
        <div className="container mx-auto py-3" >
        <Breadcrumbs data={Breadcrumbsdata} activeName="Fixtures" />
          <div className="flex flex-col lg:flex-row justify-center items-center my-auto mx-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <div className="flex flex-col lg:text-secondary justify-center items-center h-[220px] lg:h-[200px] lg:w-[90%] lg:mx-auto lg:my-4">
              <div>
                <h2 className="text-3xl uppercase font-bold my-2 text-black">
                  IPL Predictions
                </h2>
              </div>
              <div>
                <p className="text-lg text-black font-semibold">
                  Get ready to predict the winners and score big prizes with our
                  IPL prediction game! Check out the upcoming fixtures and make
                  your predictions now!
                </p>
              </div>
            </div>
          </div>

          <p className="text-xl font-semibold ml-5 mt-7">Upcoming matches</p><br/>
          <div className="flex flex-wrap  gap-y-9 mt-2 pb-10 mx-10 gap-x-3 md:gap-x-5">
            
            {upcomingMatches?.map((match, index) => (
              <Matches
                data={match}
                id={match.matchID}
                status={match.status}
                className="h-auto px-5 sm:mx-auto py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))}
          </div>

          <p className="text-xl font-semibold ml-5">Past matches</p><br/>
          <div className="flex flex-wrap gap-y-9 mt-2 pb-7 mx-10 gap-x-3 md:gap-x-5">
            
            {pastMatches?.map((match, index) => (
              <Matches
                data={match}
                id={match.matchID}
                status={match.status}
                className="h-auto px-5 sm:mx-auto py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))}
          </div>
        </div>
      </section>
        )
      }
    </MainLayout>
  );
};

export default FixturePage;