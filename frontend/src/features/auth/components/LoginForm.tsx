// src/features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { TextInput, PasswordInput, Checkbox, Button, Stack } from '@mantine/core';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call login API or auth store
    console.log('Login', { email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.currentTarget.checked)}
        />
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
