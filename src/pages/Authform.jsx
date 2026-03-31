import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Trophy, Target, Sparkles } from "lucide-react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { images } from "../constants";
import MainLayout from "../Components/MainLayout";
import ErrorMessage from "../Components/Error";
import { userActions } from "../store/reducers/userReducers";
import { signup, signin } from "../services/user";

const Authform = () => {
  const navigate = useNavigate();
  const [variant, setVariant] = useState("LOGIN");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ username, full_name, company_display_id, password, repeat_password }) => {
      return signup({ username, full_name, company_display_id, password, repeat_password });
    },
    onSuccess: (data) => {
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        closeButton: false,
      });
      setTimeout(() => dispatch(userActions.setUserInfo(data)), 3000);
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error?.error || "An error occurred during registration.", {
        position: "top-center",
        autoClose: 3000,
        closeButton: false,
      });
    },
  });

  const { mutate: mutatesignin, isPending: isSigningIn } = useMutation({
    mutationFn: ({ company_display_id, username, password }) => {
      return signin({ company_display_id, username, password });
    },
    onSuccess: (data) => {
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1000,
        closeButton: false,
      });
      setTimeout(() => {
        dispatch(userActions.setUserInfo(data));
        localStorage.setItem("account", JSON.stringify(data));
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        closeButton: false,
      });
    },
  });

  useEffect(() => {
    if (userState?.userInfo) {
      navigate("/");
    }
  }, [navigate, userState?.userInfo]);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      username: "",
      full_name: "",
      company_display_id: "",
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
      const { username, full_name,company_display_id, password, repeat_password } = data;
      if (password !== repeat_password) {
        toast.error("Passwords do not match", {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
        });
      } else {
        mutate({ username, full_name, company_display_id, password });
      }
    } else {
      const { email, company_display_id, username, password } = data;
      mutatesignin({ email, company_display_id, username, password });
    }
  };

  const features = [
    { icon: Trophy, text: "Compete on leaderboards" },
    { icon: Target, text: "Make predictions" },
    { icon: Sparkles, text: "Win rewards" },
  ];

  return (
    <>
      {error &&
        createPortal(
          <ErrorMessage message={message} setCreateError={setError} />,
          document.getElementById("error")
        )}

      <MainLayout>
        <section className="py-8 md:min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#151530] to-[#0c0c1f] flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Fixed Layout */}
              <div className="hidden lg:flex lg:w-1/2  p-8 flex-col justify-between relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {variant === "LOGIN" ? "Welcome Back!" : "Join the Game!"}
                  </h2>
                  <p className="text-slate-300 text-lg">
                    {variant === "LOGIN" 
                      ? "Sign in to continue your journey" 
                      : "Create an account to start predicting"}
                  </p>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center py-8">
                  <img
                    src={images.sigin}
                    alt="Authentication"
                    className={`${variant === "LOGIN" ? "w-full max-w-[300px]" : "w-full max-w-sm"} object-contain drop-shadow-2xl`}
                  />
                </div>

                {variant === "REGISTER" && (<div className="relative z-10 space-y-3">
                  {features.map(({ icon: Icon, text }, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-300">
                      <div className="p-2 rounded-lg bg-slate-800/50">
                        <Icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>)}
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-1/2 p-6 lg:p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {variant === "LOGIN" ? "Sign In" : "Create Account"}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {variant === "LOGIN" 
                      ? "Enter your credentials to access your account" 
                      : "Fill in your details to get started"}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Username"
                    id="username"
                    type="text"
                    register={register}
                    errors={errors}
                    disabled={isPending || isSigningIn}
                    variant={variant}
                    control={control}
                  />
                  
                  {/* <Input
                    label="Company Display ID"
                    id="company_display_id"
                    type="text"
                    register={register}
                    errors={errors}
                    disabled={isPending || isSigningIn}
                    variant={variant}
                    control={control}
                  /> */}
                  <Input
                    label="Company Display ID"
                    id="company_display_id"
                    type="text"
                    register={register}
                    errors={errors}
                    disabled={isPending || isSigningIn}
                    variant={variant}
                    control={control}
                    // options={[
                    //   { label: "Impact Analytics", value: "56T8S1HU" },
                    //   { label: "Testing", value: "W5DDYM3D" },
                    // ]}
                  />

                  {variant === "REGISTER" && (
                    <Input
                      label="Full Name"
                      id="full_name"
                      type="text"
                      register={register}
                      errors={errors}
                      disabled={isPending || isSigningIn}
                      variant={variant}
                      control={control}
                    />
                  )}

                  {/* <Input
                    label="Email"
                    id="email"
                    type="email"
                    register={register}
                    errors={errors}
                    disabled={isPending || isSigningIn}
                    variant={variant}
                    control={control}
                  /> */}

                  <Input
                    label="Password"
                    id="password"
                    type="password"
                    register={register}
                    errors={errors}
                    disabled={isPending || isSigningIn}
                    variant={variant}
                    control={control}
                  />

                  {variant === "REGISTER" && (
                    <Input
                      label="Confirm Password"
                      id="repeat_password"
                      type="password"
                      register={register}
                      errors={errors}
                      disabled={isPending || isSigningIn}
                      variant={variant}
                      control={control}
                    />
                  )}

                  <Button 
                    disabled={isPending || isSigningIn} 
                    fullWidth 
                    type="submit"
                    className="mt-2"
                  >
                    {isPending || isSigningIn ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : variant === "LOGIN" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 text-sm">
                    {variant === "REGISTER" 
                      ? "Already have an account? " 
                      : "New here? "}
                    <button
                      onClick={toggleVariant}
                      className="text-violet-400 hover:text-violet-300 font-medium underline-offset-4 hover:underline transition-all"
                    >
                      {variant === "LOGIN" ? "Create an account" : "Sign in"}
                    </button>
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