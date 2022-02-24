import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAppSelector } from "../../app/hooks";
import ReactJson from "react-json-view";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const state = useAppSelector((state) => ({
    view: {
      type: "view.list",
      items: state.quiz.fields,
    },
    plugins: [
      {
        type: "plugin.toloka",
        layout: {
          kind: "scroll",
          taskWidth: 500,
        },
      },
    ],
  }));
  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(state, null, 2));
  }
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button color="inherit" onClick={handleCopy}>
              Скопировать
            </Button>
          </Toolbar>
        </AppBar>
        <Box margin={2}>
          <ReactJson src={state} name={null} />
        </Box>
      </Dialog>
    </div>
  );
}
