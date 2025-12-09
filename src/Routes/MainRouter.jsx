import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import JoinAsEmployee from "../Pages/JoinAsEmployee/JoinAsEmployee";
import JoinAsHRManager from "../Pages/JoinAsHRManager/JoinAsHRManager";
import RegisterAsHRManager from "../Pages/RegisterAsHRManager/RegisterAsHRManager";
import RegisterAsEmployee from "../Pages/RegisterAsEmployee/RegisterAsEmployee";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Error/ErrorPage";
import HrDashboardLayout from "../Layout/HrDashboardLayout";
import AddAsset from "../Pages/HrDashboard/AddAsset";
import AssetList from "../Pages/HrDashboard/AssetList";
import EmDashboardLayout from "../Layout/EmDashboardLayout";
import RequestAsset from "../Pages/EmDashboard/RequestAsset";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
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
  // HR dashboard
  {
    path: "hr-dashboard",
    element: <HrDashboardLayout />,
    children: [
      {
        path: "addasset",
        element: <AddAsset />,
      },
      {
        path: "assetList",
        element: <AssetList />,
      },
    ],
  },
  // employee dashboard
  {
    path: "em-dashboard",
    element: <EmDashboardLayout />,
    children: [
      {
        path: "request-asset",
        element:<RequestAsset/>,
      },
    ],
  },
]);
export default router;
