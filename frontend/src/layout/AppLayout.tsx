import { useState, useEffect } from "react";
import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TruckLoader from "@/components/TruckLoader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const expandedWidth = 220;
  const collapsedWidth = 70;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOpened(!isMobile); // collapsed on mobile, expanded on desktop
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5500); // simulate
    return () => clearTimeout(timer);
  }, []);

  return (
    // AppLayout.tsx
    <AppShell
      padding={0}
      layout="default"
      navbar={{
        width: isMobile
          ? opened
            ? "100%"
            : 0 // mobile: full overlay vs hidden
          : opened
          ? expandedWidth
          : collapsedWidth, // desktop: 220 ↔ 70
        breakpoint: "sm",
      }}
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Header opened={opened} toggle={() => setOpened((o) => !o)} />
      </AppShell.Header>

      <AppShell.Navbar
        p={0}
        style={{
          // animate width on desktop; mobile uses show/hide
          transition: "width 0.3s ease-in-out",
          width: isMobile
            ? opened
              ? "100%"
              : 0
            : opened
            ? expandedWidth
            : collapsedWidth,
        }}
      >
        <Sidebar opened={opened} onToggle={setOpened} />
      </AppShell.Navbar>

      <AppShell.Main style={{ background: "#f0f0f0", position: "relative" }}>
        {loading ? (
          <div
            style={{
              position: "relative",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f0f0f0",
              zIndex: 5,
            }}
          >
            <TruckLoader scale={1.2} />
          </div>
        ) : (
          children
        )}
      </AppShell.Main>
    </AppShell>
  );
}