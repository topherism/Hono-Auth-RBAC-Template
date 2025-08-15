import { useState, useEffect } from "react";
import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const expandedWidth = 220;
  const collapsedWidth = 70;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useState(true);

  // Auto-collapse on mobile, restore on desktop
  useEffect(() => {
    if (isMobile) {
      setOpened(false);
    } else {
      setOpened(true);
    }
  }, [isMobile]);

  return (
    <AppShell
      padding={0}
      layout="default"
      navbar={{
        width: opened ? expandedWidth : collapsedWidth,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      header={{ height: 60 }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Header opened={opened} toggle={() => setOpened(o => !o)} />
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar>
        <Sidebar opened={opened} />
      </AppShell.Navbar>

      {/* MAIN */}
      <AppShell.Main style={{ background: "#f0f0f0" }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
