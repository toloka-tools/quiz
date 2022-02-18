import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import Quiz from "./features/quiz/Quiz";

function App() {
  return (
    <Box width={"100"} margin={5}>
      <Quiz />
    </Box>
  );
}

export default App;
