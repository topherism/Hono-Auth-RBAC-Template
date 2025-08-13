import { Group, Burger, Menu, Avatar, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Burger opened={opened} onClick={toggle} size="sm" />

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
