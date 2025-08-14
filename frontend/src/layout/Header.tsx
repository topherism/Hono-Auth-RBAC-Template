import { Group, Burger, Menu, Avatar, Text, Image, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo/logo-3.png";
// import { SearchInputWithButton } from "../components/SearchInputWithButton";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Box display='flex'>
        <Burger opened={opened} onClick={toggle} size="sm" />

      </Box>

      {/* Centered Logo */}
      <Box>
        <Image src={logo} alt="TrackKIT Logo" height={40} fit="contain" />
      </Box>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Group gap="xs" style={{ cursor: "pointer" }}>
            <Avatar radius="xl" size={30} />
            <Text fw={500}>John Doe</Text>
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
