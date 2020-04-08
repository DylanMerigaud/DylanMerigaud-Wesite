import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import cyan from "@material-ui/core/colors/cyan";
import { BrowserRouter as Router } from "react-router-dom";

import Slides from "./Slides";
import EasterEggs from "./EasterEggs";

const theme = createMuiTheme({
  palette: {
    primary: { main: teal[300] },
    secondary: { main: cyan[100] },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          width: "100%",
        },
        body: {
          overflow: "auto",
          width: "100%",
          backgroundColor: "#fafafa",
        },
        "body::-webkit-scrollbar-track": {
          border: "1px solid black",
          backgroundColor: "#f5f5f5",
        },

        "body::-webkit-scrollbar": {
          width: 10,
          backgroundColor: "#f5f5f5",
        },

        "body::-webkit-scrollbar-thumb": {
          backgroundColor: "#000000",
        },
        "#root": {
          width: "100%",
        },
      },
    },
  },
});

if (process.env.NODE_ENV === "development")
  console.log("Looking for the Material-UI theme ? Here you go !", theme);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Slides />
        <EasterEggs />
      </Router>
    </ThemeProvider>
  );
};

export default App;
