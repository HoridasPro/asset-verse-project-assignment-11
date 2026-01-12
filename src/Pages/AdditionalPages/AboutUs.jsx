import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#E9EEFF] via-[#DDE6FF] to-[#CCDFFF] text-slate-900 flex items-center py-20">
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-start gap-10">
        
        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
          About Asset Verse
        </h1>

        <p className="text-lg md:text-xl mb-6 text-slate-800">
          Asset Verse is a modern asset management platform that helps companies manage corporate assets efficiently. Our mission is to empower HR teams and employees with a seamless way to track, request, and monitor assets while maintaining transparency and accountability.
        </p>

        <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
          <li>Track all company assets in real-time, from laptops to office equipment.</li>
          <li>Allow employees to request assets easily through an intuitive dashboard.</li>
          <li>Monitor approvals, returns, and inventory effortlessly.</li>
          <li>Maintain detailed records for audits and accountability.</li>
          <li>Reduce loss, optimize usage, and ensure cost efficiency.</li>
        </ul>

        <p className="text-slate-800 mb-6">
          Whether you are a small startup or a large enterprise, Asset Verse provides a scalable and easy-to-use solution for managing corporate resources. Our platform simplifies asset lifecycle management while giving managers actionable insights for informed decision-making.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button className="border border-blue-700 text-blue-700 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
            Get Started
          </button>
          <button className="border border-blue-700 text-blue-700 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
