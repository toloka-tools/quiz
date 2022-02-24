import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import FullScreenDialog from "./FullScreenDialog";
import AddToken from "../client/AddToken";

export default function MainAppBar() {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Конструктор опроса
          </Typography>
          <Button color="inherit" onClick={() => setOpen(true)}>
            Получить разметку
          </Button>
          <Button color="inherit" onClick={() => setOpenLogin(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <FullScreenDialog open={open} setOpen={setOpen} />
      <AddToken open={openLogin} setOpen={setOpenLogin} />
    </Box>
  );
}
