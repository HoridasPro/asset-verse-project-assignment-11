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
    ],
  },
  // HR dashboard
  {
    path: "hr-dashboard",
    element: (
      <Private>
        <AdminRoute>
          <HrDashboardLayout />
        </AdminRoute>
      </Private>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminDashboardHome>
            <DashboardHome />
          </AdminDashboardHome>
        ),
      },
      {
        path: "add-asset",
        element: (
          <AdminRoute>
            <AddAsset />
          </AdminRoute>
        ),
      },
      {
        path: "asset-List",
        element: (
          <AdminRoute>
            <AssetList />
          </AdminRoute>
        ),
      },
      {
        path: "all-requests",
        element: (
          <AdminRoute>
            <AllRequests />
          </AdminRoute>
        ),
      },
      {
        path: "My-employee",
        element: (
          <AdminRoute>
            <MyEmployeeList />
          </AdminRoute>
        ),
      },
      {
        path: "upgrade-pakage",
        element: (
          <AdminRoute>
            <UpgradePackage />
          </AdminRoute>
        ),
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
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
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
        element: <DashboardHome />,
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
    ],
  },
]);
export default router;
