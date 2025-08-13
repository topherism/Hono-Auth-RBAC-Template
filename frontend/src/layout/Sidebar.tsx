// Sidebar.tsx
import { NavLink } from '@mantine/core';
import { IconHome, IconPackage, IconSettings } from '@tabler/icons-react';

const menuItems = [
  { label: 'Dashboard', icon: IconHome, link: '/' },
  { label: 'Inventory', icon: IconPackage, link: '/inventory' },
  { label: 'Settings', icon: IconSettings, link: '/settings' },
];

export default function Sidebar() {
  return (
    <>
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          label={item.label}
          leftSection={<item.icon size={16} />}
          href={item.link}
        />
      ))}
    </>
  );
}
