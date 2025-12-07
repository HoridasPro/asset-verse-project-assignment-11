import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import JoinAsEmployee from "../Pages/JoinAsEmployee/JoinAsEmployee";
import JoinAsHRManager from "../Pages/JoinAsHRManager/JoinAsHRManager";
import RegisterAsHRManager from "../Pages/RegisterAsHRManager/RegisterAsHRManager";

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
    ],
  },
]);
export default router;
