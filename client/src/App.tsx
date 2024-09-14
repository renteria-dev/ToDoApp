import Box from "@mui/material/Box";
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import MainPage from "./pages/MainPage";
import "./App.css";
import { Button, CssBaseline } from "@mui/material";
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
        bgcolor: "background.darker",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        minHeight: "56px",
      }}
    >
      <MainPage />
      <Box position={"fixed"} bottom={0} right={"5%"}>
        <Button
          color="inherit"
          variant="contained"
          sx={{ borderRadius: "8px 8px 0 0", boxShadow: "none", float: "left" }}
          onClick={() => setMode(mode == "light" ? "dark" : "light")}
        >
          <InvertColors />
        </Button>
      </Box>
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
