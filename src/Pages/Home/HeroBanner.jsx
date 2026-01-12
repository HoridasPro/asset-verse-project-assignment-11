import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/photo.jpeg";
import img2 from "../../assets/corporate.jpg";
import img3 from "../../assets/RicohMeetingSpaces.webp";

const banners = [
  {
    title: "Smart Asset Management for HR Teams & Employees",
    desc: "Asset Verse helps you manage corporate assets, monitor employee requests, and maintain full operational control.",
    img: img1,
  },
  {
    title: "Seamless Employee Asset Requests",
    desc: "Streamline employee asset requests and approvals effortlessly with our intuitive dashboard.",
    img: img2,
  },
  {
    title: "Real-time Inventory Tracking",
    desc: "Monitor your corporate assets in real-time and maintain total operational control.",
    img: img3,
  },
];

const HeroBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrent(index);

  const currentBanner = banners[current];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#E9EEFF] via-[#DDE6FF] to-[#CCDFFF] transition-colors duration-500">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-800">
            {currentBanner.title}
          </h1>
          <p className="text-lg md:text-xl mb-6 text-slate-600">
            {currentBanner.desc}
          </p>
          <div className="flex gap-4 flex-wrap mb-4">
            <button className="border font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-500 cursor-pointer border-blue-700 text-blue-700 hover:bg-[#CCE1FF] shadow-md hover:shadow-lg">
              Get Started
            </button>
            <button className="border font-semibold px-6 py-3 rounded-lg transition-all duration-500 cursor-pointer border-blue-700 text-blue-700 hover:bg-[#CCE1FF]">
              Learn More
            </button>
          </div>
          {/* Slider Dots */}
          <div className="flex gap-3 mt-6">
            {banners.map((_, idx) => (
              <span
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === current ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          key={currentBanner.img}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
          className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
        >
          <img
            src={currentBanner.img}
            alt="Corporate Hero"
            className="w-full max-w-md rounded-xl shadow-2xl transition-shadow duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBannerSlider;
