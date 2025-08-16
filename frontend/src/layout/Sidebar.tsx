import {
  ScrollArea,
  NavLink,
  rem,
  Box,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconDashboard,
  IconBox,
  IconReportAnalytics,
  IconSettings,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import SearchInputWithButton from "../components/SearchInputWithButton";
import { useMediaQuery } from "@mantine/hooks";

interface SidebarProps {
  opened: boolean;
  onToggle?: (val: boolean) => void;
}

export default function Sidebar({ opened, onToggle }: SidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: IconDashboard },
    { label: "Inventory", path: "/inventory", icon: IconBox },
    { label: "Reports", path: "/reports", icon: IconReportAnalytics },
    { label: "Settings", path: "/settings", icon: IconSettings },
  ];

  return (
    <>
      <ScrollArea p="md">
        {isMobile && (
          <Box mb="md" style={{ width: "100%" }}>
            <SearchInputWithButton size="sm" style={{ width: "100%" }} />
          </Box>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;

          // MOBILE or EXPANDED desktop
          if (isMobile || opened) {
            return (
              <NavLink
                key={item.path}
                component={Link}
                to={item.path}
                label={item.label}
                leftSection={<Icon size={18} />}
                active={location.pathname === item.path}
                style={{
                  borderRadius: rem(6),
                  marginBottom: rem(4),
                  justifyContent: "flex-start",
                }}
              />
            );
          }

          // COLLAPSED desktop
          return (
            <Box
              key={item.path}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: rem(4),
              }}
            >
              <Tooltip
                label={item.label}
                position="right"
                withArrow
                openDelay={200}
              >
                <ActionIcon
                  component={Link}
                  to={item.path}
                  size={36}
                  radius="md"
                  variant={location.pathname === item.path ? "light" : "subtle"}
                  aria-label={item.label}
                >
                  <Icon
                    size={18}
                    color={location.pathname === item.path ? "red" : "black"}
                  />
                </ActionIcon>
              </Tooltip>
            </Box>
          );
        })}
      </ScrollArea>
      {!isMobile && (
        <ActionIcon
          onClick={() => onToggle?.(!opened)}
          variant="light"
          bg="brand"
          size="sm"
          radius="xl"
          style={{
            position: "absolute",
            top: "50%",
            right: -12,
            transform: "translateY(-50%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          {opened ? (
            <IconArrowLeft color="white" size={32} />
          ) : (
            <IconArrowRight color="white" size={32} />
          )}
        </ActionIcon>
      )}
    </>
  );
}
