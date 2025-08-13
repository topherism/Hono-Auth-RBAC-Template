import { useState } from "react";
import { AppShell } from "@mantine/core";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(true);

  return (
    <AppShell
      navbar={{
        width: opened ? 220 : 70,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={() => setOpened((o) => !o)} />
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <Sidebar opened={opened} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
