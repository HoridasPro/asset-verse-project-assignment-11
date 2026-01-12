import React from "react";
import { FaClipboardList, FaUserCheck, FaChartBar } from "react-icons/fa";

const ExtraSections = () => (
  <div className="max-w-7xl mx-auto px-6 text-center">
    {/* How it works */}
    <section className="">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          How AssetVerse Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <FaClipboardList />,
              title: "Add Assets",
              desc: "HR registers and manages company assets easily.",
            },
            {
              icon: <FaUserCheck />,
              title: "Approve Requests",
              desc: "Employees request assets, HR approves instantly.",
            },
            {
              icon: <FaChartBar />,
              title: "Track Usage",
              desc: "Monitor usage, reports, and asset lifecycle.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-[#DBE5FF] p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl text-indigo-600 mb-4 flex justify-center">
                {step.icon}
              </div>
              <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        {[
          "Is AssetVerse secure?",
          "Can I upgrade plans?",
          "Is employee data safe?",
        ].map((q, i) => (
          <div
            key={i}
            className="bg-[#DBE5FF] p-6 mb-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h4 className="font-semibold">{q}</h4>
            <p className="text-gray-600 mt-2">
              Yes, AssetVerse follows best security and access control
              practices.
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Contact CTA */}
    <section className=" text-gray-900 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        Ready to Use AssetVerse?
      </h2>
      <p className=" text-gray-700">
        Start managing assets and employees smarter today.
      </p>
      <button className="border border-blue-700 text-blue-700 px-8 py-4 my-10 rounded-xl font-semibold hover:bg-[#CCE1FF] transition cursor-pointer">
        Get Started
      </button>
    </section>
  </div>
);

export default ExtraSections;
