import { Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/dashboard/pages/Dashboard";
// import Home from "../pages/Home.jsx";
// import Login from "../pages/Login.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />
    </Routes>
  );
}
