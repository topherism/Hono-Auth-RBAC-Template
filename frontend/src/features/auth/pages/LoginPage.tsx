// src/features/auth/pages/LoginPage.tsx
import { Center, Paper, Title, Text } from '@mantine/core';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <Center style={{ height: '100vh' }}>
      <Paper radius="md" p="xl" withBorder style={{ width: 360 }}>
        <Title order={2} ta="center" mb="sm">
          TrackKIT
        </Title>
        <Text size="sm" ta="center" c="dimmed" mb="lg">
          Kit Inventory Tracker <br /> Sign in to manage and monitor your inventory
        </Text>
        <LoginForm />
      </Paper>
    </Center>
  );
}
