// src/features/auth/pages/LoginPage.tsx
import { Center, Paper, Title, Text, useMantineTheme } from "@mantine/core";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const theme = useMantineTheme();

  return (
    <Center
      style={{ height: "100vh", background: theme.other.gradients.login_background }}
    >
      <Paper radius="md" p="xl" withBorder style={{ width: 360 }}>
        <Title order={2} ta="center" mb="sm">
          TrackKIT
        </Title>
        <Text size="sm" ta="center" c="dimmed" mb="lg">
          Kit Inventory Tracker <br /> Sign in to manage and monitor your
          inventory
        </Text>
        <LoginForm />
      </Paper>
    </Center>
  );
}
