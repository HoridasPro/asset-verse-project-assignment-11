 import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import HeroBanner from "./Pages/Home/HeroBanner";
 

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="App transition-colors duration-500">
      <Navbar theme={theme} setTheme={setTheme} />
      <HeroBanner theme={theme} />
    </div>
  );
}

export default App;
