import { FieldCheckGroup, FieldRadioGroup } from "../types";
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import { useInput } from "../useInput";
import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setFieldValue } from "../quizSlice";
import RemoveIcon from "@mui/icons-material/Remove";
// import { SortableContainer, SortableElement } from "react-sortable-hoc";
// import { DragHandle } from "../Quiz";

export let required = Yup.string().required("Нужно заполнить");

function InputOption(p: { handleChange: any; value: string; onBlur: any }) {
  function handleDelete() {
    p.handleChange({ target: { value: "" } });
  }
  return (
    <TextField
      variant={"standard"}
      label={"Значение"}
      name={"value"}
      value={p.value}
      onChange={p.handleChange}
      onBlur={p.onBlur}
      fullWidth
      // InputProps={{
      //   startAdornment: (
      //     <InputAdornment position="start">
      //       <IconButton
      //         // aria-label="toggle password visibility"
      //         onClick={handleDelete}
      //         // onMouseDown={handleMouseDownPassword}
      //       >
      //         {p.value ? <RemoveIcon /> : <></>}
      //       </IconButton>
      //     </InputAdornment>
      //   ),
      // }}
    />
  );
}

const Options = (p: {
  options: string[];
  setOpt: any;
  field: Partial<FieldRadioGroup | FieldCheckGroup>;
  idx: number;
}) => {
  const dispatch = useAppDispatch();
  function onBlur() {
    const _options = p.options
      .filter((o) => o !== "")
      .map((o) => ({ value: o, label: o }));
    dispatch(
      setFieldValue({
        path: `/${p.idx}/options`,
        value: _options,
      })
    );
  }
  return (
    <Stack direction={"column"} spacing={0.5}>
      {p.options.map((f, idx) => {
        function handleChange(t: { target: { value: string } }) {
          const newOpts = [...p.options];
          newOpts[idx] = t.target.value;
          if (t.target.value === "") {
            newOpts.splice(idx, 1);
          }
          if (newOpts[newOpts.length - 1] !== "") {
            newOpts.push("");
          }
          p.setOpt(newOpts);
        }

        return (
          <InputOption
            handleChange={handleChange}
            value={f}
            key={idx}
            onBlur={onBlur}
          />
        );
      })}
    </Stack>
  );
};

export default function InputRadio(p: {
  idx: number;
  field: Partial<FieldRadioGroup | FieldCheckGroup>;
}) {
  const name = useInput({
    field: p.field,
    idx: p.idx,
    name: "label",
    validate: required,
  });
  const [opts, setOpts] = useState<string[]>([""]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} flexDirection={"row"} display={"flex"}>
        <TextField
          variant={"standard"}
          label={"Введите вопрос"}
          fullWidth
          {...name}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={"h5"} marginTop={2} marginBottom={1}>
          Варианты ответа:
        </Typography>
        <Options options={opts} setOpt={setOpts} field={p.field} idx={p.idx} />
      </Grid>
    </Grid>
  );
}
