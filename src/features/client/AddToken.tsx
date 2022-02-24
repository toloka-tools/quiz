import { ApiType, useClient } from "./client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { MenuItem } from "@mui/material";

const options = [
  <MenuItem key={ApiType.sandbox} value={ApiType.sandbox}>
    Песочница
  </MenuItem>,
  <MenuItem key={ApiType.prom} value={ApiType.prom}>
    Боевой
  </MenuItem>,
];

export default function AddToken({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const { newClient, client } = useClient();
  const [token, setToken] = useState("");
  const [type, setType] = useState(ApiType.sandbox);
  const handleClose = () => {
    setOpen(false);
  };

  function handleToken() {
    alert("пока не реализовано");
    // newClient(type, token);
    // client
    //   .get("/projects")
    //   .then((r) => {
    //     alert(JSON.stringify(r.data, null, 2));
    //     handleClose();
    //   })
    //   .catch((e) => {
    //     alert("ошибка");
    //     // console.log(e);
    //   });
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>Скопируйте токен из толоки</DialogContentText>
        <TextField
          margin="dense"
          id="type"
          label="Контур"
          // type="token"
          fullWidth
          variant="standard"
          select
          children={options}
          value={type}
          onChange={(t) => setType(t.target.value as ApiType)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="token"
          label="Токен"
          // type="token"
          fullWidth
          variant="standard"
          value={token}
          onChange={(t) => setToken(t.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleToken}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}
