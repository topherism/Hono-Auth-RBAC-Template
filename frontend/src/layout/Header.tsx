import {
  Group,
  Burger,
  Menu,
  Avatar,
  Text,
  Image,
  Box,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo/logo-3.png";
import { useMediaQuery } from "@mantine/hooks";
import SearchInputWithButton from "../components/SearchInputWithButton";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Group h="100%" px="md" justify="space-between">
      {/* Left section: Burger + Search (search only if desktop) */}
      <Flex align="center" gap="sm">
        <Burger opened={opened} onClick={toggle} size="sm" />
        {!isMobile && <SearchInputWithButton />}
      </Flex>

      {/* Centered Logo */}
      <Box style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Image
          src={logo}
          alt="TrackKIT Logo"
          height={40}
          fit="contain"
          style={{ cursor: "pointer" }}
        />
      </Box>

      {/* Right section: Profile menu */}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Group gap="xs" style={{ cursor: "pointer" }}>
            <Avatar radius="xl" size={30} />
            {!isMobile && <Text fw={500}>John Doe</Text>}
          </Group>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} to="/profile">
            Profile
          </Menu.Item>
          <Menu.Item component={Link} to="/logout" color="red">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
