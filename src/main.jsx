// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { RouterProvider } from "react-router";
// import MainRouter from "./Routes/MainRouter.jsx";
// import AuthProvider from "./Context/AuthProvider/AuthProvider.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <RouterProvider router={MainRouter}>

//         </RouterProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   </StrictMode>
// );

import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import MainRouter from "./Routes/MainRouter.jsx";
import AuthProvider from "./Context/AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query Client
const queryClient = new QueryClient();

// Root App Wrapper to handle theme globally
function RootApp() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={MainRouter} context={{ theme, setTheme }} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default RootApp;

// Render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
