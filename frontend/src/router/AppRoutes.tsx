import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
// import Home from "../pages/Home.jsx";
// import Login from "../pages/Login.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            asd
          </Layout>
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
