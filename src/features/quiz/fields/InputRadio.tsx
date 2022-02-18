import { FieldCheckGroup, FieldRadioGroup } from "../types";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";

import * as Yup from "yup";
import { useInput } from "../useInput";
import React, { useState } from "react";
// import { SortableContainer, SortableElement } from "react-sortable-hoc";
// import { DragHandle } from "../Quiz";

export let required = Yup.string().required("Нужно заполнить");

function InputOption(p: { handleChange: any; value: string }) {
  return (
    <Box display={"flex"}>
      {/*<DragHandle />*/}
      <TextField
        label={"название"}
        name={"option"}
        fullWidth
        value={p.value}
        onChange={p.handleChange}
      />
    </Box>
  );
}

const Options = (p: { options: string[]; setOpt: any }) => (
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
      return <InputOption handleChange={handleChange} value={f} />;
    })}
  </Stack>
);

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
        <Options options={opts} setOpt={setOpts} />
      </Grid>
    </Grid>
  );
}
