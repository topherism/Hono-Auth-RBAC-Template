import {
  Group,
  Burger,
  Menu,
  Avatar,
  Text,
  Image,
  Box,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo/logo-3.png";
import { useMediaQuery } from "@mantine/hooks";
import SearchInputWithButton from "../components/SearchInputWithButton";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      align="center"
      justify="space-between"
      px="md"
      h="100%"
      style={{ position: "relative" }}
    >
      {/* Left section: Burger + Search */}
      <Flex align="center" gap="sm" style={{ flex: "0 0 auto" }}>
        <Burger opened={opened} onClick={toggle} size="sm" />
        {!isMobile && <SearchInputWithButton />}
      </Flex>

      {/* Center Logo - absolutely centered */}
      <Box
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Image
          src={logo}
          alt="TrackKIT Logo"
          height={40}
          fit="contain"
          style={{ cursor: "pointer" }}
        />
      </Box>

      {/* Right section: Profile menu */}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Group gap="xs" style={{ cursor: "pointer" }}>
            <Avatar radius="xl" size={30} />
            {!isMobile && <Text fw={500}>John Doe</Text>}
          </Group>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} to="/profile">
            Profile
          </Menu.Item>
          <Menu.Item component={Link} to="/" color="red">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
