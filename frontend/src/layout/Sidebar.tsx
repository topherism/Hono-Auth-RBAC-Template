import { ScrollArea, NavLink, rem, Box } from "@mantine/core";
import {
  IconDashboard,
  IconBox,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import SearchInputWithButton from "../components/SearchInputWithButton";
import { useMediaQuery } from "@mantine/hooks";

interface SidebarProps {
  opened: boolean;
}

export default function Sidebar({ opened }: SidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: IconDashboard },
    { label: "Inventory", path: "/inventory", icon: IconBox },
    { label: "Reports", path: "/reports", icon: IconReportAnalytics },
    { label: "Settings", path: "/settings", icon: IconSettings },
  ];

  return (
    <ScrollArea p="md">
      {isMobile && (
        <Box mb="md" style={{ width: "100%" }}>
          <SearchInputWithButton size="sm" style={{ width: "100%" }} />
        </Box>
      )}

      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={opened ? item.label : undefined}
            leftSection={<Icon size={18} />}
            active={location.pathname === item.path}
            style={{
              borderRadius: rem(6),
              marginBottom: rem(4),
              justifyContent: opened ? "flex-start" : "center",
            }}
          />
        );
      })}
    </ScrollArea>
  );
}
