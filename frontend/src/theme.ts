import { colorsTuple, type MantineThemeOverride } from "@mantine/core";

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
    background: colorsTuple("#ffebefff"),
  },
  other: {
    gradients: {
      login_background: "linear-gradient(135deg, rgba(180,40,40,0.25) 0%, rgba(80,0,0,1) 100%)",
      ocean: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
      sunset: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    },
  },
  primaryColor: "brand",
  primaryShade: { light: 5, dark: 5 },
  fontFamily: 'Poppins, Quicksand, "Century Gothic", Arial, sans-serif',
};
