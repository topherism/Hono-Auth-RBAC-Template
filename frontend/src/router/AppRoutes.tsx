import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
// import Home from "../pages/Home.jsx";
// import Login from "../pages/Login.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <Button>login</Button>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Button></Button>
          </AppLayout>
        }
      />
    </Routes>
  );
}
