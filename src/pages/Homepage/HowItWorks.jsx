import React from "react";
import { images } from "../../constants";
const steps = [
  {
    id: 1,
    title: "Browse Matches",
    description:
      "Explore upcoming matches and choose the ones you want to predict.",
    image: images.hiw1
  },
  {
    id: 2,
    title: "Make Predictions",
    description:
      "Predict winners, player of the match, and key match outcomes.",
    image: images.hiw2
  },
  {
    id: 3,
    title: "Earn Points",
    description:
      "Score points based on how accurate your predictions are.",
    image: images.hiw3
  },
  {
    id: 4,
    title: "Climb the Leaderboard",
    description:
      "Compete with others and see your rank rise on the leaderboard.",
    image: images.hiw4
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-10 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-md font-semibold text-purple-600 uppercase tracking-wide">
            How it works
          </p>
          {/* <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Start Predicting in 4 Simple Steps
          </h2> */}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-6">
                 <img
              src={step.image}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              alt=""
            />
              </div>

              {/* Step Number */}
              {/* <div className="w-8 h-8 mb-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
                {step.id}
              </div> */}

              {/* Text */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
