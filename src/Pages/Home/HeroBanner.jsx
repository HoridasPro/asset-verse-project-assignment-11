import React from "react";
import { motion } from "framer-motion";
import img from "../../assets/photo.jpeg";

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Smart Asset Management for HR Teams & Employees
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100">
            Asset Verse helps you manage corporate assets, monitor employee
            requests, and maintain full operational control.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition">
              Learn More
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
            className="w-full max-w-md rounded-xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
