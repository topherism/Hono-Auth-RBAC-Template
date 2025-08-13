import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home.jsx";
// import Login from "../pages/Login.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Button color="brand">Custom Brand Button</Button>
          </>
        }
      />
      {/* <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      /> */}
    </Routes>
  );
}
