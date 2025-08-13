// Header.tsx
import { Group, Text, ActionIcon, Menu, Avatar, rem } from '@mantine/core';
import { IconBell, IconLogout, IconUser, IconSettings } from '@tabler/icons-react';

export default function Header() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  };

  return (
    <Group justify="space-between" px="md" h="100%">
      {/* App Logo / Title */}
      <Text fw={700} size="lg" c="white">
        TrackKIT
      </Text>

      {/* Right side icons */}
      <Group gap="sm">
        {/* Notifications */}
        <ActionIcon variant="subtle" c="white">
          <IconBell size={20} />
        </ActionIcon>

        {/* User menu */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar src={user.avatar} alt={user.name} radius="xl" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Signed in as</Menu.Label>
            <Menu.Item leftSection={<IconUser size={14} />}>
              {user.name}
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings size={14} />}>
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
