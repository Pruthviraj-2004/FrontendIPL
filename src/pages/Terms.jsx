import React from "react";
import MainLayout from "../Components/MainLayout";

const Terms = () => {
  const rules = [
    { id: 1, text: "Make Predictions on Time." },
    { id: 2, text: "Update your Players after the Player list releases." },
    {
      id: 3,
      text: "Points are updated after the announcement of Player of the Match.",
    },
    {
      id: 4,
      text: "Predict all the fields i.e Winner Team, Player of the Match, Most Runs Scorer and Most Wicket Taker.",
    },

    { id: 5, text: "Only one account per user is allowed." },

    { id: 6, text: "Keep an eye on your submissions in Profile Page." },
  ];

  const additionalRules = [
    { id: 1, text: "The Global Leaderboard reward is given to the winners of the entire tournament, up until the final match." },
    { id: 2, text: "1st Prize - Rs.2500 worth Amazon Gift Voucher." },
    { id: 3, text: "2nd Prize - Rs.1500 worth Amazon Gift Voucher." },
    { id: 4, text: "3rd Prize - Rs.1000 worth Amazon Gift Voucher." },

    { id: 5, text: "The Weekly Leaderboard reward is granted for matches from Friday to Thursday, with a reward available after each set." },
    { id: 6, text: "1st Prize - Rs.200 worth Amazon Gift Voucher." },
  ];

  const Points = [
    { id: 1, text: "Winner Team - 3 Base Points." },
    { id: 2, text: "Player of the Match - 2 Base Points." },
    { id: 3, text: "Most Runs Scorer of the Match - 2 Base Points." },
    { id: 4, text: "Most Economical Wicket Taker of the Match - 2 Base Points." },
    // { id: 5, text: "Bonus weeks with 2x and 3x Bonus Points." },

    { id: 6, text: "In case of players with same runs then Strike Rate is taken under consideration." },
    { id: 7, text: "In case of players with same wickets then Economy is taken under consideration." },
    { id: 8, text: "In case of same points, user submission time is taken under consideration." },

  ];

  const disclaimer = [
    { id:1, text: "This is a Fantasy Game! " },
  ]

  const terms = [
    { id: 1, text: "Give valid Details to get rewards." },
    { id: 2, text: "Make valid Submissions." },
    {
      id: 3,
      text: "By participating, you agree to abide by the rules and decisions of the administrators.",
    },
    {
      id: 4,
      text: "The website reserves the right to modify the rules, terms, and conditions at any time without prior notice.",
    },
    {
      id: 5,
      text: "Users are responsible for keeping their account information secure and confidential.",
    },
    {
      id: 6,
      text: "The website is not responsible for any technical issues or disruptions that may affect user participation or results.",
    },
    { id: 7, text: "Only one account per user is allowed." },
    {
      id: 8,
      text: "Users must provide accurate and truthful information during registration.",
    },
    {
      id: 9,
      text: "The website reserves the right to disqualify any participant found to be violating the rules or terms.",
    },
    {
      id: 10,
      text: "Prizes and rewards are non-transferable and may not be exchanged for cash or other alternatives.",
    },
    {
      id: 11,
      text: "The website may use user-generated content for promotional purposes with proper attribution.",
    },
    {
      id: 12,
      text: "Rewards are given only to Tournament and Weekly Winners.",
    },
    { id: 13, text: "Do not share your account credentials with anyone else." },
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
    // { id: 6, text: "Enjoy bonus weeks with double and triple points to enhance your performance." },
    { id: 6, text: "Keep track of your submissions for better performance evaluation." },
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

          <div className="mt-5">
            <h2 className="text-2xl font-bold text-left">Disclaimer</h2>
            <div className="flex">
              <ol>
                {disclaimer.map((rule) => (
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
            <h2 className="text-2xl font-bold text-left">Points System:</h2>
            <div className="flex">
              <ol>
                {Points.map((rule) => (
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

          {/* Global Leaderboard Winner Reward */}
          <div>
            <h3 className="text-xl font-bold mt-4">Global Leaderboard Winner Reward:</h3>
            <ol>
              {additionalRules.slice(0, 4).map((rule) => (
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

          {/* Weekly Leaderboard Winner Reward */}
          <div>
            <h3 className="text-xl font-bold mt-4">Weekly Leaderboard Winner Reward:</h3>
            <ol>
              {additionalRules.slice(4, 7).map((rule) => (
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
    </MainLayout>
  );
};

export default Terms;
