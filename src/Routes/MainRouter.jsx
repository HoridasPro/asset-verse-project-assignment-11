import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import JoinAsEmployee from "../Pages/JoinAsEmployee/JoinAsEmployee";
import JoinAsHRManager from "../Pages/JoinAsHRManager/JoinAsHRManager";
import RegisterAsHRManager from "../Pages/RegisterAsHRManager/RegisterAsHRManager";
import RegisterAsEmployee from "../Pages/RegisterAsEmployee/RegisterAsEmployee";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "JoinAsEmployee",
        element: <JoinAsEmployee />,
      },
      {
        path: "JoinAsHRManager",
        element: <JoinAsHRManager />,
      },
      {
        path: "registerAsHRManager",
        element: <RegisterAsHRManager />,
      },
      {
        path: "registerAsEmployee",
        element: <RegisterAsEmployee />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
