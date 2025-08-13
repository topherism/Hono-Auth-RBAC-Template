import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { colorsTuple, createTheme } from "@mantine/core";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="light"
      theme={{
        colors: {
          brand: [
            "#fff0f0",
            "#ffdcdc",
            "#ffb8b8",
            "#ff9494",
            "#ff7070",
            "#ff4c4c",
            "#d93b3b",
            "#b32e2e",
            "#8f2414",
            "#6b1a0f",
          ],
        },
        primaryColor: "brand",
        primaryShade: { light: 5, dark: 5 },
        fontFamily: 'Poppins, Quicksand, "Century Gothic", Arial, sans-serif',
      }}
    >
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
