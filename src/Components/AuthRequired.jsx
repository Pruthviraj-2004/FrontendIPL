import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const AuthRequired = ({ title = "Login Required", message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 mb-4">
        <FaLock className="text-purple-600 text-xl" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {title}
      </h2>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-6">
        {message || "You must be signed in to access this page."}
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/register")}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition w-fit"
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthRequired;