import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import Quiz from "./features/quiz/Quiz";
import MainAppBar from "./features/app/MainAppBar";

function App() {
  return (
    <Box>
      <MainAppBar />
      <Box width={"100"} margin={2}>
        <Quiz />
      </Box>
    </Box>
  );
}

export default App;
