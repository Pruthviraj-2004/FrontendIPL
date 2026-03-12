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
import ClipLoader from "react-spinners/ClipLoader";
import { useWatch } from "react-hook-form";

const Authform = () => {
  const navigate = useNavigate();
  const [variant, setVariant] = useState("LOGIN");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ username, name, email, password, repeat_password }) => {
      return signup({ username, name, email, password, repeat_password });
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
    mutationFn: ({ company_display_id,email,username, password }) => {
      return signin({ company_display_id,email,username, password });
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
      console.log(data)
      // navigate("/");
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
    control
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      repeat_password: "",
    },
    mode: "onChange",
  });
  useEffect(() => {
    reset();
  }, [reset, variant]);
  const onSubmit = (data) => {
    if (variant === "REGISTER") {
      const { company_display_id, username, name, email, password, repeat_password } = data;
      if (password !== repeat_password) {
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
      mutate({ username, name, email, password, repeat_password });
    } else {
      const { email, company_display_id, username, password } = data;
      mutatesignin({ email, company_display_id, username, password });
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
        <section className="bg-gray-400 overflow-hidden w-screen h-full lg:w-screen scrollbar-hide">
          <div
            className={`${
              variant === "LOGIN" ? "lg:h-[40%] h-[90vh]" : "lg:h-[90%] "
            } flex  rounded-lg w-[100%] justify-center bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f] items-center overflow-y-auto`}
            // style={{
            //   backgroundImage: `url(${images.bg20})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            //   backgroundRepeat: "no-repeat",
            // }}
          >
           
            <div
              className={`${
                variant === "LOGIN" ? "" : "my-24 "
              } lg:my-24  flex flex-row  lg:h-[90%] bg-slate-900/80 backdrop-blur-xl border border-slate-800 w-[90%] lg:w-[60%] rounded-lg w-100 mx-auto font-sans  shadow-2xl shadow-black `}
            >
              <div
                className={`${
                  variant === "LOGIN" ? "lg:h-[68vh] h-[50vh]" : ""
                } w-[50%] hidden lg:flex overflow-hidden px-10 justify-center items-center`}
              >
                <div className="flex flex-col items-center">
                  <div className="">
                    <p className="text-2xl my-3 text-purple-800 text-center font-bold">
                      Let's get started
                    </p>

                    <p className="text-lg text-white">
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
                }  w-[100%]   lg:w-[50%] px-4 py-8 my-auto sm:rounded-lg rounded-lg `}
              >
                <div className="flex flex-row justify-evenly mb-4">
                  {variant === "LOGIN" && (
                    <div className={`  w-[100%] cursor-pointer h-18`}>
                      <p className="my-2 text-xl ml-2 font-bold text-left text-purple-700">
                        SIGN IN
                      </p>
                      <p className="lg:my-0 my-2 mb-2 text-slate-200 text-md ml-2 font-medium text-left">
                        Sign in below
                      </p>
                    </div>
                  )}
                  {variant === "REGISTER" && (
                    <div className={` w-[100%] cursor-pointer h-14`}>
                      <p className="my-2 text-xl ml-2 font-bold text-left text-purple-700">
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
                    control={control}

                  />
                  <Input
                    label="Company display id"
                    id="company_display_id"
                    type="text"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    variant={variant}
                    control={control}
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
                      control={control}
                    />
                  )}
                  {/* {variant === "REGISTER" && ( */}
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                      control={control}
                    />
                  {/* // )}  */}
                  <Input
                    label="Password"
                    id="password"
                    type="password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    variant={variant}
                    control={control}
                  />
                  {variant === "REGISTER" && (
                    <Input
                      label="Confirm password"
                      id="repeat_password"
                      type="password"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      variant={variant}
                      control={control}
                    />
                  )}

                  {variant === "REGISTER" &&
                    errors.repeat_password?.type === "validate" && (
                      <div className="ml-3 text-sm text-orange-500">Passwords do not match</div>
                    )}
                  <Button disabled={isLoading} fullWidth type="submit">
                    {isLoading ? <ClipLoader size={20}/> : variant === "LOGIN" ? "SIGN IN" : "REGISTER"}
                  </Button>
                </form>
                <ToastContainer className="z-[100001]"/>
                <div className="flex gap-2 justify-center text-md mt-6 px-2 text-slate-200">
                  {variant === "REGISTER"
                    ? "Already have an account?"
                    : "New here ?"}

                  <div
                    onClick={toggleVariant}
                    className="underline cursor-pointer text-md font-medium text-purple-600"
                  >
                    {variant === "LOGIN" ? "Create an account" : "Login"}
                  </div>
                </div>
                <div className="flex gap-2 justify-center font-semibold text-sm mt-4 px-2 text-slate-200">
                  <p>
                   Forgot password? <a className="text-purple-600  underline" href="https://practicehost1.pythonanywhere.com/ipl2/password_reset/">Click here</a>
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
