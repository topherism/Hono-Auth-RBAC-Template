import { Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { useLogin } from "../hooks/useLogin";
import { zodResolver } from "mantine-form-zod-resolver";
// 1️⃣ Zod schema
const schema = z.object({
  emailOrUsername: z.union([z.string().email(), z.string().min(3)]),
  password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const { login, error } = useLogin();

  const handleSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Emaisl"
          placeholder="you@example.com"
          withAsterisk
          required
          {...form.getInputProps("emailOrUsername")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          required
          {...form.getInputProps("password")}
        />
        {error?.response?.data?.message && (
          <p style={{ color: "red" }}>{error.response.data.message}</p>
        )}
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
