import { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
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
      <AppShell.Main style={{ background: theme.other.gradients.sunset }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
