import { Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import LoginPage from "../features/auth/pages/LoginPage";
// import Home from "../pages/Home.jsx";
// import Login from "../pages/Login.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <h1>Dashboard</h1>
          </AppLayout>
        }
      />
    </Routes>
  );
}
