import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { images } from "../constants";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/reducers/userReducers";
import { signup, signin } from "../services/user";
import MainLayout from "../Components/MainLayout";
import { createPortal } from "react-dom";
import ErrorMessage from "../Components/Error";

const Authform = () => {
  const navigate = useNavigate();
  const [variant, setVariant] = useState("LOGIN");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ username, name, email, password1, password2 }) => {
      return signup({ username, name, email, password1, password2 });
    },
    onSuccess: (data) => {
      toast.success("Registration successfull!!", {
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
      navigate("/lbparticipate");
      setTimeout(()=>dispatch(userActions.setUserInfo(data),3000));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      console.log(error)
      toast.error("Username or email already exists", {
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          display: "flex",
          justifyContent: "center",
        },
        closeButton: false,
        progress: undefined,
      });
      
    },
  });
  const { mutate: mutatesignin } = useMutation({
    mutationFn: ({ username, password1 }) => {
      return signin({ username, password1 });
    },
    onSuccess: (data) => {
      toast.success("Login successfull!", {
        position: "top-center",
        autoClose: 1000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
     
      
      setTimeout(()=>{
        dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      },3000)
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          display: "flex",
          justifyContent: "center",
        },
        closeButton: false,
        progress: undefined,
      });
    },
  });

  useEffect(() => {
    if (userState?.userInfo) {
      navigate("/");
    }
  }, [navigate, userState?.userInfo]);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password1: "",
      password2: "",
    },
    mode: "onChange",
  });
  useEffect(() => {
    reset();
  }, [reset, variant]);
  const onSubmit = (data) => {
    if (variant === "REGISTER") {
      const { username, name, email, password1, password2 } = data;
      if (password1 !== password2) {
        toast.error("Passwords do not match", {
          position: "top-center",
          autoClose: 3000,
          style: {
            width: "auto",
            display: "flex",
            justifyContent: "center",
          },
          closeButton: false,
          progress: undefined,
        });
    
      } else 
      mutate({ username, name, email, password1, password2 });
    } else {
      const { username, password1 } = data;
      mutatesignin({ username, password1 });
    }
  };

  return (
    <>
      {error &&
        createPortal(
          <ErrorMessage message={message} setCreateError={setError} />,
          document.getElementById("error")
        )}

      <MainLayout>
        <section className=" bg-gray-400 overflow-hidden w-screen h-full lg:w-screen scrollbar-hide">
          <div
            className={`${
              variant === "LOGIN" ? "lg:h-[40%] h-[90vh]" : "lg:h-[90%] "
            } flex  rounded-lg w-[100%] justify-center  h-[100vh]  bg-gray-300 items-center overflow-y-auto`}
            style={{
              backgroundImage: `url(${images.bg20})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
           
            <div
              className={`${
                variant === "LOGIN" ? "h-[45%]" : "my-24 "
              } lg:my-24  flex flex-row  lg:h-[90%] bg-white w-[90%] lg:w-[60%] rounded-lg w-100 mx-auto font-sans  shadow-2xl shadow-black `}
            >
              <div
                className={`${
                  variant === "LOGIN" ? "lg:h-[68vh]" : ""
                } w-[50%] hidden lg:flex overflow-hidden h-[85vh] px-10 justify-center items-center`}
              >
                <div className="flex flex-col bg-white items-center">
                  <div className="bg-white">
                    <p className="text-2xl my-3 blue-text-gradient text-center font-bold">
                      Let's get started
                    </p>

                    <p className="text-lg">
                      Create an account or login if you already have one
                    </p>
                  </div>
                  <div>
                    <img
                      src={images.sigin}
                      alt="signform"
                      className={`${
                        variant === "LOGIN" ? "h-[45vh]" : "h-[50vh]"
                      } `}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${
                  variant === "LOGIN" ? "lg:h-[50%] lg:py-4 py-0" : "lg:h-[100%]"
                } bg-white w-[100%]   lg:w-[50%] px-4 py-8 my-auto sm:rounded-lg rounded-lg `}
              >
                <div className="flex flex-row justify-evenly mb-4">
                  {variant === "LOGIN" && (
                    <div className={`  w-[100%] cursor-pointer h-18`}>
                      <p className="my-2 text-xl ml-2 font-bold text-left blue-text-gradient">
                        SIGN IN
                      </p>
                      <p className="lg:my-0 my-2 mb-2 text-md ml-2 font-medium text-left">
                        Sign in below
                      </p>
                    </div>
                  )}
                  {variant === "REGISTER" && (
                    <div className={` w-[100%] cursor-pointer h-14`}>
                      <p className="my-2 text-xl ml-2 font-bold text-left blue-text-gradient">
                        SIGN UP
                      </p>
                      <p className="my-2 mb-2 text-md ml-2 font-medium text-left">
                        Sign up below
                      </p>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="h-full">
                  <Input
                    label="Username"
                    id="username"
                    type="text"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    variant={variant}
                  />

                  {variant === "REGISTER" && (
                    <Input
                      label="Name"
                      id="name"
                      type="text"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                    />
                  )}
                  {variant === "REGISTER" && (
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                    />
                  )}
                  <Input
                    label="Password"
                    id="password1"
                    type="password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    variant={variant}
                  />
                  {variant === "REGISTER" && (
                    <Input
                      label="Confirm password"
                      id="password2"
                      type="password"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                    />
                  )}

                  {variant === "REGISTER" &&
                    errors.password2?.type === "validate" && (
                      <div className="ml-3 text-sm text-orange-500">Passwords do not match</div>
                    )}
                  <Button disabled={isLoading} fullWidth type="submit">
                    {variant === "LOGIN" ? "SIGN IN" : "REGISTER"}
                  </Button>
                </form>
                <ToastContainer className="z-[100001]"/>
                <div className="flex gap-2 justify-center text-md mt-6 px-2 text-gray-800">
                  {variant === "REGISTER"
                    ? "Already have an account?"
                    : "New here ?"}

                  <div
                    onClick={toggleVariant}
                    className="underline cursor-pointer text-md font-medium text-[#3486eb]"
                  >
                    {variant === "LOGIN" ? "Create an account" : "Login"}
                  </div>
                </div>
                <div className="flex gap-2 justify-center font-semibold text-sm mt-4 px-2 text-gray-800">
                  <p>
                   Forgot password? <a className="text-[#3486eb]  underline" href="https://practicehost1.pythonanywhere.com/ipl2/password_reset/">Click here</a>
                   </p>
              </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Authform;
