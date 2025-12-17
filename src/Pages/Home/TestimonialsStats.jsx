// import React from "react";
// import { motion } from "framer-motion";
// const testimonials = [
//   {
//     name: "Sarah Ahmed",
//     role: "HR Manager",
//     company: "TechNova Ltd.",
//     quote:
//       "AssetVerse transformed how we manage company assets. Requests, approvals, and tracking are now seamless.",
//     avatar: "https://i.pravatar.cc/150?img=32",
//   },
//   {
//     name: "James Carter",
//     role: "Operations Lead",
//     company: "BlueWave Solutions",
//     quote:
//       "Our HR team saved hours every week after switching to AssetVerse. Clean UI and powerful analytics!",
//     avatar: "https://i.pravatar.cc/150?img=12",
//   },
//   {
//     name: "Nusrat Jahan",
//     role: "People Operations",
//     company: "NextGen Corp",
//     quote:
//       "The role-based system keeps everything secure while employees love the easy request process.",
//     avatar: "https://i.pravatar.cc/150?img=47",
//   },
// ];

// const stats = [
//   { label: "Companies Trust Us", value: "100+" },
//   { label: "Assets Managed", value: "25K+" },
//   { label: "Employees Supported", value: "10K+" },
//   { label: "Uptime Reliability", value: "99.9%" },
// ];
// const TestimonialsStats = () => {
//   return (
//     <section className="bg-white py-20">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center"
//         >
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-blue-200 py-5 px-10 rounded-2xl">
//               <h3 className="text-4xl font-bold text-indigo-600">
//                 {stat.value}
//               </h3>
//               <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
//             </div>
//           ))}
//         </motion.div>

//         {/* Testimonials Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-14"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Trusted by HR Teams Worldwide
//           </h2>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             See how organizations streamline asset management and employee
//             operations with AssetVerse.
//           </p>
//         </motion.div>

//         {/* Testimonials Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
//             >
//               <p className="text-gray-700 italic mb-6">“{item.quote}”</p>

//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.avatar}
//                   alt={item.name}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">{item.name}</h4>
//                   <p className="text-sm text-gray-600">
//                     {item.role}, {item.company}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Trust Logos */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mt-20 text-center"
//         >
//           <p className="text-gray-500 mb-6">
//             Trusted by fast-growing teams across industries
//           </p>
//           <div className="flex flex-wrap justify-center gap-10 opacity-70">
//             <span className="font-bold text-gray-400">TechNova</span>
//             <span className="font-bold text-gray-400">BlueWave</span>
//             <span className="font-bold text-gray-400">NextGen</span>
//             <span className="font-bold text-gray-400">InnovaCorp</span>
//             <span className="font-bold text-gray-400">CloudAxis</span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsStats;
