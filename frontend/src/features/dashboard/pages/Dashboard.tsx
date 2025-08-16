// src/features/auth/pages/LoginPage.tsx
import {
  Paper,
  Title,
  Container,
} from "@mantine/core";

export default function LoginPage() {

  return (
    <Container bg="brand">
      <Paper radius="md" p="xl" withBorder style={{ justifyContent: "center" }}>
        <Title order={2} ta="center" mb="sm">
          TrackKIT Dashboard
        </Title>
      </Paper>
    </Container>
  );
}
