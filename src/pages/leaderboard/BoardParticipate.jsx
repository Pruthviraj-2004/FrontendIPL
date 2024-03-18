import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../Components/Input";
import { useForm } from "react-hook-form";
import MainLayout from "../../Components/MainLayout";
import Button from "../../Components/Button";
import { images } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const LeaderboardForm = () => {
  const userState = useSelector((state) => state.user);

  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leaderboardname: "",
      password: "",
      username: userState?.userInfo?.user?.username,
    },
    mode: "onChange",
  });

  const handleSubmitParticipate = async ({ leaderboardname, password }) => {
    try {
      const response = await fetch("https://practicehost1.pythonanywhere.com/ipl2/lb_participation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaderboardname: leaderboardname,
          password: password,
          username: userState?.userInfo?.user?.username,
        }),
      });

      if (response.ok) {
        // Redirect or perform any action upon successful submission
        toast.success("Leaderboard joined!", {
          position: "top-center",
          autoClose: 1000,
          style: {
            width: "auto",
            style: "flex justify-center",
          },
          closeButton: false,
          progress: undefined,
        }); // Redirect to home page
      } else {
        // Handle error
        const responseData = await response.json(); // Parse JSON response

        toast.error(responseData.error, {
          position: "top-center",
          autoClose: 1500,
          style: {
            width: "auto",
            style: "flex justify-center",
          },
          closeButton: false,
          progress: undefined,
        }); // Display error message to user
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    const { leaderboardname, password } = data;
    handleSubmitParticipate({ leaderboardname, password });
  };
  setTimeout(() => {});
  return (
    <MainLayout>
      <div
        className="mt-24 bg-[rgb(237,236,237)] flex flex-col lg:flex-row justify-center items-center lg:h-[600px] h-[750px]"
        
      >
        <ToastContainer />
        <div className="w-[100%] lg:w-[50%] flex justify-center lg:justify-end items-center">
          <LazyLoadImage
            src={images.lb}
            alt=""
            className="w-[70%] hidden lg:block lg:h-[340px] lg:w-[100%]"
            effect="blur"
          />
          <img
            src={images.lb}
            alt=""
            className="w-[80%] block lg:hidden lg:h-[340px] lg:w-[100%]"
          />
        </div>
        <div className="w-[100%] lg:w-[50%]  flex justify-center lg:justify-start items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[80%] lg:w-[70%] lg:h-[340px] p-8 bg-white shadow-md"
          >
            <h2 className="text-xl text-[rgb(64,21,48)] font-semibold mb-4">
              Participate in Leaderboard along with your friends
            </h2>
            <Input
              label="Leaderboard Name"
              id="leaderboardname"
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              register={register}
              errors={errors}
            />
            <Button
              type="submit"
              className="w-full mt-6 bg-blue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default LeaderboardForm;
