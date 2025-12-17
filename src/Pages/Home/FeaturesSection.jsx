// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FiBox,
//   FiUsers,
//   FiShield,
//   FiBarChart2,
//   FiLock,
//   FiTrendingUp,
// } from "react-icons/fi";

// const features = [
//   {
//     title: "Asset Tracking",
//     description:
//       "Track, manage, and monitor all corporate assets in one centralized system.",
//     icon: <FiBox />,
//   },
//   {
//     title: "Employee Requests",
//     description:
//       "Employees can easily request assets while HR maintains full approval control.",
//     icon: <FiUsers />,
//   },
//   {
//     title: "Role-Based Access",
//     description:
//       "Separate dashboards and permissions for HR managers and employees.",
//     icon: <FiShield />,
//   },
//   {
//     title: "Real-Time Analytics",
//     description:
//       "Get instant insights into asset usage, demand trends, and inventory health.",
//     icon: <FiBarChart2 />,
//   },
//   {
//     title: "Secure Authentication",
//     description:
//       "JWT & role-based security ensure only authorized access to sensitive data.",
//     icon: <FiLock />,
//   },
//   {
//     title: "Scalable Growth",
//     description: "Upgrade packages anytime as your team and asset needs grow.",
//     icon: <FiTrendingUp />,
//   },
// ];

// const FeaturesSection = () => {
//   return (
//     <section className="bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Powerful Features Built for Modern HR Teams
//           </h2>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             AssetVerse combines simplicity, control, and scalability to help HR
//             teams and employees work smarter.
//           </p>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
//             >
//               <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-2xl mb-6">
//                 {feature.icon}
//               </div>

//               <h3 className="text-xl font-semibold text-gray-800 mb-3">
//                 {feature.title}
//               </h3>

//               <p className="text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;
