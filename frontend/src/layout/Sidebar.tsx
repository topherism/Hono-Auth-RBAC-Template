import { ScrollArea, NavLink, rem } from "@mantine/core";
import {
  IconDashboard,
  IconBox,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  opened: boolean;
}

export default function Sidebar({ opened }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <IconDashboard size={18} /> },
    { label: "Inventory", path: "/inventory", icon: <IconBox size={18} /> },
    { label: "Reports", path: "/reports", icon: <IconReportAnalytics size={18} /> },
    { label: "Settings", path: "/settings", icon: <IconSettings size={18} /> },
  ];

  return (
    <ScrollArea style={{ flex: 1 }}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          component={Link}
          to={item.path}
          label={opened ? item.label : null}
          leftSection={item.icon}
          active={location.pathname === item.path}
          style={{ borderRadius: rem(6), marginBottom: rem(4) }}
        />
      ))}
    </ScrollArea>
  );
}
