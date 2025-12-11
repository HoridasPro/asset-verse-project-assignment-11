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
import AllRequests from "../Pages/HrDashboard/AllRequests";
import MyAssets from "../Pages/EmDashboard/MyAssets";
import ProfilePage from "../Pages/EmDashboard/ProfilePage";
import MyTeam from "../Pages/EmDashboard/MyTeam";
import MyEmployeeList from "../Pages/HrDashboard/MyEmployeeList";
import UpgradePakage from "../Pages/HrDashboard/UpgradePakage";

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
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "asset-List",
        element: <AssetList />,
      },
      {
        path: "all-requests",
        element: <AllRequests />,
      },
      {
        path: "My-employee",
        element: <MyEmployeeList />,
      },
      {
        path: "upgrade-pakage",
        element: <UpgradePakage />,
      },
    ],
  },
  // employee dashboard
  {
    path: "em-dashboard",
    element: <EmDashboardLayout />,
    children: [
      {
        path: "my-assets",
        element: <MyAssets />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      {
        path: "my-team",
        element: <MyTeam />,
      },
      {
        path: "profile-page",
        element: <ProfilePage />,
      },
    ],
  },
]);
export default router;
