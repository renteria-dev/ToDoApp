import * as React from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import MainPage from "./pages/MainPage";
import "./App.css";
import { Button, CssBaseline, IconButton } from "@mui/material";
import { InvertColors } from "@mui/icons-material";
function MyApp() {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      sx={{
        display: "inherit",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        minHeight: "56px",
      }}
    >
      <IconButton onClick={() => setMode(mode == "light" ? "dark" : "light")}>
        <InvertColors />
      </IconButton>
      <MainPage />
    </Box>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <MyApp />
      </CssBaseline>
    </ThemeProvider>
  );
}
