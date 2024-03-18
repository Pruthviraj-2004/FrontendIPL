import React from "react";
import MainLayout from "../Components/MainLayout";

const Terms = () => {
  const rules = [
    { id: 1, text: "Make Predictions on Time" },
    { id: 2, text: "Update your Players after the Player list releases" },
    {
      id: 3,
      text: "Points are updated after the announcement of Player of the Match",
    },
    {
      id: 4,
      text: "Predict all the fields i.e Winner Team, Player of the Match, Most Runs Scorer and Most Wicket Taker",
    },
    // {
    //   id: 5,
    //   text: "Respect other users and maintain sportsmanship while participating",
    // },
    { id: 5, text: "Only one account per user is allowed" },

    { id: 6, text: "Do not share your account credentials with anyone else" },
  ];

  const additionalRules = [
    { id: 7, text: "Do not share your account credentials with anyone else" },
  ];

  const terms = [
    { id: 1, text: "Give valid Details to get rewards" },
    { id: 2, text: "Make valid Submissions" },
    {
      id: 3,
      text: "By participating, you agree to abide by the rules and decisions of the administrators",
    },
    {
      id: 4,
      text: "The website reserves the right to modify the rules, terms, and conditions at any time without prior notice",
    },
    {
      id: 5,
      text: "Users are responsible for keeping their account information secure and confidential",
    },
    {
      id: 6,
      text: "The website is not responsible for any technical issues or disruptions that may affect user participation or results",
    },
    {
      id: 8,
      text: "Users must provide accurate and truthful information during registration",
    },
    {
      id: 9,
      text: "The website reserves the right to disqualify any participant found to be violating the rules or terms",
    },
    {
      id: 10,
      text: "Prizes and rewards are non-transferable and may not be exchanged for cash or other alternatives",
    },
    {
      id: 11,
      text: "The website may use user-generated content for promotional purposes with proper attribution",
    },
    {
      id: 12,
      text: "Rewards are given only to Tournament and Weekly Winners",
    },
  ];

  const benefits = [
    {
      id: 1,
      text: "Top three overall tournament winners receive Amazon Gift Cards.",
    },
    { id: 2, text: "Weekly top performers also get rewarded." },
    {
      id: 3,
      text: "Have fun predicting, earning points, and winning rewards.",
    },
    { id: 4, text: "Compete with friends using personalized leaderboards." },
    {
      id: 5,
      text: "Request a personalized leaderboard by sending an email.",
    },
    { id: 6, text: "Enjoy bonus weeks with double and triple points to enhance your performance." },
    { id: 7, text: "Keep track of your submissions for better performance evaluation." },
  ];

  return (
    <MainLayout>
      <div className="lg:w-screen  max-w-screen bg-[#eeedf0]  mt-[90px] lg:mt-[105px] lg:px-10 px-5 mt-5">
        <div className="">
          <div className="">
            <h2 className="text-2xl font-bold pt-8 text-left">How it works?</h2>
            <div className="flex">
              <ol>
                {rules.map((rule) => (
                  <li key={rule.id} className="text-left text-lg my-4">
                    <p className="flex flex-row justify-start">
                      <p className="rounded-full text-start lg:mr-2 justify-center w-full lg:w-screen  bg-none font-bold text-pink-900 ">
                        {rule.id}.&nbsp;&nbsp;
                        <span className="font-medium text-black">
                          {rule.text}
                        </span>
                      </p>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* <div className="mt-5">
            <h2 className="text-2xl font-bold text-left">Additional Rules:</h2>
            <div className="flex">
              <ol>
                {additionalRules.map((rule) => (
                  <li key={rule.id} className="text-left text-lg my-4">
                    <p className="flex flex-row justify-start">
                      <p className="rounded-full text-start lg:mr-2 justify-center w-full lg:w-screen bg-none font-bold text-pink-900 ">
                        {rule.id}.&nbsp;&nbsp;
                        <span className="font-medium text-black">
                          {rule.text}
                        </span>
                      </p>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div> */}

          <div className="mt-5">
            <h2 className="text-2xl font-bold text-left">
              Terms and Conditions:
            </h2>
            <div className="flex">
              <ol>
                {terms.map((rule) => (
                  <li key={rule.id} className="text-left text-lg my-4">
                    <p className="flex flex-row justify-start">
                      <p className="rounded-full text-start lg:mr-2 justify-center w-full lg:w-screen bg-none font-bold text-pink-900 ">
                        {rule.id}.&nbsp;&nbsp;
                        <span className="font-medium text-black">
                          {rule.text}
                        </span>
                      </p>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-2xl font-bold text-left">Benefits:</h2>
            <div className="flex">
              <ol>
                {benefits.map((rule) => (
                  <li key={rule.id} className="text-left text-lg my-4">
                    <p className="flex flex-row justify-start">
                      <p className="rounded-full text-start lg:mr-2 justify-center w-full lg:w-screen bg-none font-bold text-pink-900 ">
                        {rule.id}.&nbsp;&nbsp;
                        <span className="font-medium text-black">
                          {rule.text}
                        </span>
                      </p>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
