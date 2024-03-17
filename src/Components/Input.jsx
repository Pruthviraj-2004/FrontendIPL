import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail, MdError } from "react-icons/md";
import { findInputError, isFormInvalid } from "../utils/motion";
import { AnimatePresence } from "framer-motion";
import { IoPersonSharp } from "react-icons/io5";

const Input = ({
  label,
  id,
  type,
  required,
  variant,
  register,
  errors,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);

  useEffect(() => {
    setIsFocused(false);
  }, [variant]);

  // Function to validate password length
  const validatePasswordLength = (value) => {
    if (type === "password" && value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return true;
  };

  return (
    <div>
      <AnimatePresence>
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
      <div className="my-2 relative">
        {(label === "Name" || label === "Username") && (
          <div className="absolute inset-y-0 left-0 flex items-center ml-3 cursor-pointer">
            <IoPersonSharp color="#3486eb" />
          </div>
        )}
        {label === "Email" && (
          <div className="absolute inset-y-0 left-0 flex items-center ml-3 cursor-pointer">
            <MdEmail color="#3486eb" />
          </div>
        )}
        {type === "password" && (
          <div className="absolute inset-y-0 left-0 flex items-center ml-3 cursor-pointer">
            <FaLock color="#3486eb" />
          </div>
        )}
        <motion.label
          htmlFor={id}
          className={clsx(
            "absolute origin-top-left left-10 top-[-0px] text-md font-medium transition-all duration-200",
            {
              "text-gray-500": !isFocused && !errors[id],
              "text-teal-500 transform -translate-y-[3px] scale-75": isFocused,
              "text-orange-500": errors[id],
            }
          )}
          initial={{ y: 0, scale: 1 }}
          animate={{
            y: isFocused ? -11 : 0,
            scale: isFocused ? 0.75 : 1,
            x: isFocused ? 0 : 0,
          }}
          exit={{ y: 0, scale: 1 }}
        >
          {label}
        </motion.label>
        <input
          id={id}
          type={showPassword ? "text" : type}
          {...register(id, {
            required: {
              value: true,
              message: "required",
            },
            validate: validatePasswordLength,
          })}
          className={clsx(
            "form-input block w-full pl-10 rounded-md py-5 text-black ring-black border-gray-300 border-[2px] focus:border-[2px] sm:text-sm sm:leading-6",
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50"
          )}
          onFocus={() => setIsFocused(true)}
          
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
          </div>
        )}
      </div>
      {errors[id] && (
        <div className="text-sm text-left ml-3 text-orange-500">
          {errors[id].type === "validate" ? errors[id].message : "This field is required"}
        </div>
      )}
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default Input;
