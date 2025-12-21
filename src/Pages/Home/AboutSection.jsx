import React from "react";
import { motion } from "framer-motion";
import { FiBox, FiUsers, FiTrendingUp, FiShield } from "react-icons/fi";

const benefits = [
  {
    icon: <FiBox size={28} />,
    title: "Centralized Asset Control",
    description:
      "Manage all corporate assets from a single dashboard with real-time visibility and tracking.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Employee-Friendly Requests",
    description:
      "Employees can request, track, and manage assets easily with a transparent approval process.",
  },
  {
    icon: <FiTrendingUp size={28} />,
    title: "Improved Operational Efficiency",
    description:
      "Reduce manual work, minimize asset loss, and optimize resource utilization across teams.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure & Role-Based Access",
    description:
      "Ensure data security with role-based permissions for HR managers and employees.",
  },
];

const AboutSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose AssetVerse?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            AssetVerse is built to simplify corporate asset management while
            empowering both HR teams and employees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
