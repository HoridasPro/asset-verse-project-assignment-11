 

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import img from "../../assets/photo.jpeg";

const HeroBanner = () => {
  const [isDark, setIsDark] = useState(false);

  // Body background color update
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <section
      className={`w-full py-20 transition-colors duration-500 ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-[#E9EEFF] via-[#DDE6FF] to-[#CCDFFF]"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 leading-tight transition-colors duration-500 ${
              isDark ? "text-slate-100" : "text-slate-800"
            }`}
          >
            Smart Asset Management for HR Teams & Employees
          </h1>
          <p
            className={`text-lg md:text-xl mb-6 transition-colors duration-500 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Asset Verse helps you manage corporate assets, monitor employee
            requests, and maintain full operational control.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              className={`border font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-500 cursor-pointer ${
                isDark
                  ? "border-blue-400 text-blue-300 hover:bg-blue-900 shadow-black/50"
                  : "border-blue-700 text-blue-700 hover:bg-[#CCE1FF] shadow-md hover:shadow-lg"
              }`}
            >
              Get Started
            </button>
            <button
              className={`border font-semibold px-6 py-3 rounded-lg transition-all duration-500 cursor-pointer ${
                isDark
                  ? "border-blue-400 text-blue-300 hover:bg-blue-900 shadow-black/50"
                  : "border-blue-700 text-blue-700 hover:bg-[#CCE1FF]"
              }`}
            >
              Learn More
            </button>
          </div>
          {/* Dark/Light Toggle Button */}
          <div className="mt-6">
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-500 ${
                isDark
                  ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
        >
          <img
            src={img}
            alt="Corporate Hero"
            className={`w-full max-w-md rounded-xl transition-shadow duration-500 ${
              isDark ? "shadow-black/50" : "shadow-2xl"
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
