// src/features/auth/pages/LoginPage.tsx
import { Paper, Title, Container } from "@mantine/core";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function LoginPage() {
  const { user } = useAuthStore();

  return (
    <Container bg="brand">
      <Paper radius="md" p="xl" withBorder style={{ justifyContent: "center" }}>
        <Title order={2} ta="center" mb="sm">
          TrackKIT Dashboard
          {user?.email || "asdasd"}
        </Title>
      </Paper>
    </Container>
  );
}
