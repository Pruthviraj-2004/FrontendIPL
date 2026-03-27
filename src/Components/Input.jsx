import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail, MdError, MdLeaderboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { useWatch } from "react-hook-form";

const Input = ({
  label,
  id,
  type,
  variant,
  register,
  errors,
  disabled,
  control,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const value = useWatch({
    control,
    name: id,
  });

  const hasValue = !!value;
  const inputError = errors?.[id];
  const isInvalid = !!inputError;
  const shouldFloat = isFocused || hasValue;

  // Validate password length
  const validatePasswordLength = (value) => {
    if (type === "password" && value && value.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return true;
  };

  // Icon mapping - returns null if no icon needed
  const getIcon = () => {
    const iconClass = "w-5 h-5 text-slate-400";
    
    if (label === "Name" || label === "Username" || label === "Full Name") {
      return <IoPersonSharp className={iconClass} />;
    }
    if (label === "Email") {
      return <MdEmail className={iconClass} />;
    }
    if (type === "password") {
      return <FaLock className={iconClass} />;
    }
    if (label === "Leaderboard Name" || label === "Company Display ID") {
      return <MdLeaderboard className={iconClass} />;
    }
    return null;
  };

  const icon = getIcon();
  const hasIcon = !!icon;
  const leftPadding = hasIcon ? "pl-12" : "pl-4";
  const labelLeftPosition = hasIcon ? "left-12" : "left-4";

  return (
    <div className="relative">
      {/* Error Message */}
      <AnimatePresence mode="wait">
        {isInvalid && (
          <InputError message={inputError.message} key={inputError.message} />
        )}
      </AnimatePresence>

      <div className="relative my-3">
        {/* Left Icon - only render if exists */}
        {hasIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Floating Label - position based on icon presence */}
        <motion.label
          htmlFor={id}
          className={clsx(
            "absolute font-medium transition-colors duration-200 pointer-events-none",
            labelLeftPosition,
            shouldFloat
              ? "top-2 text-xs text-violet-400"
              : "top-4 -translate-y-1/2 text-base text-slate-400",
            isInvalid && shouldFloat && "text-rose-400",
            isInvalid && !shouldFloat && "text-rose-400"
          )}
          animate={{
            y: shouldFloat ? 0 : 0, // Remove the -12 offset that was causing issues
            scale: shouldFloat ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            transformOrigin: "left center",
          }}
        >
          {label}
        </motion.label>

        {/* Input Field - padding based on icon presence */}
        <input
          id={id}
          type={showPassword ? "text" : type}
          placeholder=" "
          disabled={disabled}
          {...register(id, {
            required: {
              value: true,
              message: `${label} is required`,
            },
            validate: type === "password" ? validatePasswordLength : undefined,
          })}
          className={clsx(
            "block w-full rounded-xl py-4 pr-4 placeholder-transparent",
            leftPadding,
            "bg-slate-900/80 border-2 transition-all duration-200",
            "focus:outline-none focus:ring-0 sm:text-sm",
            isInvalid
              ? "border-rose-500/50 focus:border-rose-500 text-rose-100"
              : "border-slate-700 text-white focus:border-violet-500/50 hover:border-slate-600",
            disabled && "opacity-50 cursor-not-allowed",
            isFocused && "bg-slate-900"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-300 transition-colors"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
          </button>
        )}
      </div>

      {/* Helper Text for Password */}
      {type === "password" && variant === "REGISTER" && !isInvalid && (
        <p className="text-xs text-slate-500 ml-1 mt-1">
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