import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail, MdError, MdLeaderboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";

const Input = ({
  label,
  id,
  type,
  variant,
  register,
  errors,
  disabled,
  watch,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Check if field has value for floating label
  useEffect(() => {
    if (watch) {
      const subscription = watch((value) => {
        setHasValue(value[id] && value[id].length > 0);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, id]);

  const inputError = errors?.[id];
  const isInvalid = !!inputError;
  const shouldFloat = isFocused || hasValue;
  console.log(shouldFloat)

  // Validate password length
  const validatePasswordLength = (value) => {
    if (type === "password" && value && value.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return true;
  };

  // Icon mapping with updated colors
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    if (label === "Name" || label === "Username") {
      return <IoPersonSharp className="w-5 h-5 text-white" />;
    }
    if (label === "Email") {
      return <MdEmail className="w-5 h-5 text-white" />;
    }
    if (type === "password") {
      return <FaLock className="w-5 h-5 text-white" />;
    }
    if (label === "Leaderboard Name" || label === "Company display id") {
      return <MdLeaderboard className="w-5 h-5 text-white" />;
    }
    return null;
  };

  return (
    <div className="relative">
      {/* Error Message */}
      <AnimatePresence mode="wait">
        {isInvalid && (
          <InputError
            message={inputError.message}
            key={inputError.message}
          />
        )}
      </AnimatePresence>

      <div className="relative my-3">
        {/* Left Icon */}
        <div className="absolute text-white inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          {getIcon()}
        </div>

        {/* Floating Label */}
        <motion.label
          htmlFor={id}
          className={clsx(
            "absolute left-12 font-medium duration-200 pointer-events-none text-white",
          shouldFloat 
            ? "top-2 text-xs text-slate-900" 
            : "top-1/2 -translate-y-1/2 text-base text-slate-100",
            isInvalid && "text-rose-400"
          )}
          animate={{
            y: shouldFloat ? 0 : -12,
            scale: shouldFloat ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>

        {/* Input Field */}
        <input
          id={id}
          type={showPassword ? "text" : type}
          disabled={disabled}
          {...register(id, {
            required: {
              value: true,
              message: `${label} is required`,
            },
            validate: type === "password" ? validatePasswordLength : undefined,
          })}
          className={clsx(
            "block w-full rounded-xl py-4 pl-12 pr-4 text-slate-100 placeholder-transparent",
            "bg-slate-900/80 border-2 transition-all duration-200",
            "focus:outline-none focus:ring-0 sm:text-sm",
            isInvalid
              ? "border-rose-500/50 focus:border-rose-500 text-rose-100"
              : "border-slate-700 focus:border-violet-500/50 hover:border-slate-600",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white hover:text-white/80 hover:text-slate-300 transition-colors"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
          </button>
        )}
      </div>

      {/* Helper Text for Password */}
      {type === "password" && variant === "REGISTER" && !isInvalid && (
        <p className="text-xs text-white/80 ml-1 mt-1">
          Must be at least 6 characters
        </p>
      )}
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      className="flex items-center gap-1.5 text-sm font-medium text-rose-400 mb-2"
    >
      <MdError className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
};

export default Input;