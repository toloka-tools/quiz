import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import AnyInput from "./fields/AnyInput";
import UndefinedInput from "./fields/UndefinedField";
import { AnyField, FieldTypes, ValTextRequired } from "./types";
import React from "react";
import { remove, reorder, setFieldValue } from "./quizSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SortableContainerMaker } from "../SortableItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useInput } from "./useInput";
import { required } from "./fields/InputTextField";

// export const DragHandle = SortableHandle(() => (
//   <Tooltip title={"Нажмите, чтобы перенести"}>
//     <IconButton sx={{ width: 40, height: 40 }}>
//       <DragHandleIcon />
//     </IconButton>
//   </Tooltip>
// ));

const MainCard = (p: Partial<AnyField> & { id: number }) => {
  const dispatch = useAppDispatch();
  function handleRequired(e: { target: { checked: any } }) {
    dispatch(
      setFieldValue({
        path: `/${p.id}/validation`,
        value: e.target.checked ? ValTextRequired : undefined,
      })
    );
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = useInput({
    field: p,
    idx: p.id,
    name: "path",
    path: "data/path",
    validate: required,
  });
  return (
    <Grid item xs={12} key={p.id}>
      <Card sx={{ padding: 2 }}>
        <Box flexDirection={"row"} display={"flex"}>
          <Box
            flexDirection={"row"}
            display={"flex"}
            marginTop={2}
            // marginBottom={"auto"}
            paddingRight={2}
          >
            {/*<DragHandle />*/}
            <IconButton onClick={handleClick} sx={{ width: 40, height: 40 }}>
              <MoreVertIcon />
            </IconButton>
            <Popover
              // id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack spacing={1} margin={2} marginRight={3}>
                <TextField
                  variant={"standard"}
                  label={"ID Поля"}
                  sx={{
                    marginLeft: 1.5,
                    // marginRight: 1.5,
                  }}
                  {...id}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ width: 40, height: 40 }}
                      onChange={handleRequired}
                      defaultChecked={false}
                    />
                  }
                  label="Обязательное поле"
                />
                <FormControlLabel
                  control={
                    <IconButton
                      sx={{ width: 40, height: 40 }}
                      onClick={() => dispatch(remove(p.id))}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  }
                  label="Удалить"
                />
              </Stack>
            </Popover>
          </Box>
          <AnyInput key={p.id} idx={p.id} field={p} />
        </Box>
      </Card>
    </Grid>
  );
};

const MainCardsContainer = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Grid container spacing={2}>
      {children}
      <Grid item xs={12}>
        <Card sx={{ padding: 2 }}>
          <UndefinedInput label="Добавить поле" type={FieldTypes.undefined} />
        </Card>
      </Grid>
    </Grid>
  );
};

const MainCardsSortable = SortableContainerMaker(MainCard, MainCardsContainer);

export default function Quiz(p: {}) {
  const inputs = useAppSelector((state) => state.quiz.fields);
  const dispatch = useAppDispatch();
  function handleMove({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    dispatch(reorder({ oldIndex, newIndex }));
  }
  return (
    <MainCardsContainer>
      {inputs.map((i, id) => (
        <MainCard id={id} {...i} />
      ))}
    </MainCardsContainer>
  );
}
