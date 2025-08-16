import {IconSearch } from "@tabler/icons-react";
import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
type InputProps = React.ComponentProps<typeof TextInput>;

export default function SearchInputWithButton(props: InputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="lg"
      size="md"
      placeholder="Search questions"
      rightSectionWidth={42}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          <IconSearch size={18} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}
