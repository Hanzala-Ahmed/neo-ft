import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFF",
      dark: "#5D5D5B",
    },
    secondary: {
      main: "#000000",
    },
    typography: {
      color: "#000000",
    },
    buttonColor: {
      color: "#7A52F4",
    },
    tokenHoverColor: {
      color: "#D9D9D9",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },

    boxShadow: {
      appBar: "0px 3px 4px 0px rgba(153, 155, 168, 0.25)",
    },
    typography: {
      main: "#5D5D5B",
    },
    borderColor: {
      main: "#5D5D5B",
    },
  },
});

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
      dark: "#5D5D5B",
    },
    secondary: {
      main: "#FFFFFF",
    },
    typography: {
      color: "#FFFFFF",
    },
    background: {
      orange: "#FFA500",
    },
    boxShadow: {
      appBar: "0px 3px 4px 0px rgba(153, 155, 168, 0.25)",
    },
  },
});
