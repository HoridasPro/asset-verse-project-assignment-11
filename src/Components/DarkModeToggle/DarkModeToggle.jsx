// import React, { useState, useEffect } from "react";

// const DarkModeToggle = () => {
//   const [darkMode, setDarkMode] = useState(() => {
//     // initialize from localStorage
//     const savedTheme = localStorage.getItem("darkMode");
//     return savedTheme === "true";
//   });

//   // Sync dark mode class to <html> and localStorage
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   return (
//     <div className="p-4">
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-yellow-400 dark:text-black transition-colors duration-300"
//       >
//         {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//       </button>
//       <p className="mt-4 text-gray-900 dark:text-gray-100">
//         This text changes color in dark/light mode.
//       </p>
//     </div>
//   );
// };

// export default DarkModeToggle;

import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors duration-300"
    >
      {theme === "dark" ? <BiSun size={20} /> : <BiMoon size={20} />}
      <span className="text-sm">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default DarkModeToggle;
