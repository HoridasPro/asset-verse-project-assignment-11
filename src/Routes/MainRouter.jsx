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
import UpgradePackage from "../Pages/HrDashboard/UpgradePackage";
import PaymentHistory from "../Pages/HrDashboard/PaymentHistory";
import Payment from "../Pages/HrDashboard/Payment";
import PaymentSuccess from "../Pages/HrDashboard/PaymentSuccess";
import PaymentCancelled from "../Pages/HrDashboard/PaymentCancelled";
import UserManagement from "./../Pages/HrDashboard/UserManagement";
import Private from "../Private/Private";
import AdminRoute from "./AdminRoute";
import DashboardHome from "../Pages/EmDashboard/DashboardHome/DashboardHome";
import HrProfile from "../Pages/Profile/HrProfile";
import EmProfile from "../Pages/Profile/EmProfile";
import AdminDashboardHome from "../Pages/HrDashboard/DashboardHome/AdminDashboardHome";
import EmployeeDashboardHome from "../Pages/EmDashboard/DashboardHome/EmployeeDashboardHome";
import DownloadAssignedList from "../Components/DownloadAssignedList/DownloadAssignedList";
import HrDashboardHome from "../Pages/HrDashboard/DashboardHome/HrDashboardHome";

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
        path: "joinAsEmployee",
        element: <JoinAsEmployee />,
      },
      {
        path: "joinAsHRManager",
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
      {
        path: "emProfile",
        element: <EmProfile />,
      },
      {
        path: "hrProfile",
        element: <HrProfile />,
      },
      {
        path: "/profileUpdate",
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },
  // HR dashboard
  {
    path: "hr-dashboard",
    element: (
      <Private>
        <HrDashboardLayout />
      </Private>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminRoute>
            <AdminDashboardHome>
              <HrDashboardHome></HrDashboardHome>
            </AdminDashboardHome>
          </AdminRoute>
        ),
      },
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "asset-list",
        element: <AssetList />,
      },
      {
        path: "all-requests",
        element: <AllRequests />,
      },
      {
        path: "my-employee",
        element: <MyEmployeeList />,
      },
      {
        path: "upgrade-pakage",
        element: <UpgradePackage />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "payment/:employeeId",
        element: <Payment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancelled />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },

  // employee dashboard
  {
    path: "em-dashboard",
    element: (
      <Private>
        <EmDashboardLayout />
      </Private>
    ),
    children: [
      {
        index: true,
        element: (
          <EmployeeDashboardHome>
            <DashboardHome></DashboardHome>
          </EmployeeDashboardHome>
        ),
      },
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
      {
        path: "downloadAssignedList",
        element: <DownloadAssignedList />,
      },
    ],
  },
]);
export default router;
