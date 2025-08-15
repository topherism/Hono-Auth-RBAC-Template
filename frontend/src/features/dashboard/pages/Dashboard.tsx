// src/features/auth/pages/LoginPage.tsx
import {
  Paper,
  Title,
  Text,
  useMantineTheme,
  Container,
} from "@mantine/core";

export default function LoginPage() {
  const theme = useMantineTheme();

  return (
    <Container bg="brand">
      <Paper radius="md" p="xl" withBorder style={{ justifyContent: "center" }}>
        <Title order={2} ta="center" mb="sm">
          TrackKIT
        </Title>
        <Text size="sm" ta="center" c="dimmed" mb="lg">
          Kit Inventory Tracker <br /> Sign in to manage and monitor your
          inventory
        </Text>
      </Paper>
    </Container>
  );
}
