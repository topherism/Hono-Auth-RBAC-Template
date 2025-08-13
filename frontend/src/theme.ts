import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colors: {
    brand: [
      "#fff0f0",
      "#ffdcdc",
      "#ffb8b8",
      "#ff9494",
      "#ff7070",
      "#ff4c4c",
      "#d93b3b",
      "#b32e2e",
      "#8f2414",
      "#6b1a0f",
    ],
  },
  primaryColor: "brand",
  primaryShade: { light: 5, dark: 5 },
  fontFamily: 'Poppins, Quicksand, "Century Gothic", Arial, sans-serif',
};
