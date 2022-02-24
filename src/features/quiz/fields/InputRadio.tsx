import { FieldCheckGroup, FieldRadioGroup } from "../types";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";

import * as Yup from "yup";
import { useInput } from "../useInput";
import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setFieldValue } from "../quizSlice";
// import { SortableContainer, SortableElement } from "react-sortable-hoc";
// import { DragHandle } from "../Quiz";

export let required = Yup.string().required("Нужно заполнить");

function InputOption(p: { handleChange: any; value: string; onBlur: any }) {
  return (
    <TextField
      label={"Значение"}
      name={"value"}
      value={p.value}
      onChange={p.handleChange}
      onBlur={p.onBlur}
      fullWidth
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
  const id = useInput({
    field: p.field,
    idx: p.idx,
    name: "path",
    path: "data/path",
    validate: required,
  });
  const [opts, setOpts] = useState<string[]>([""]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} flexDirection={"row"} display={"flex"}>
        <TextField label={"Название поля"} fullWidth {...name} />
      </Grid>
      <Grid item xs={6}>
        <TextField label={"ID Поля"} fullWidth {...id} />
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
