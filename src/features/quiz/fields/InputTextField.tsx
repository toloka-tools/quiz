import { AnyField, FieldText } from "../types";
import { Grid, TextField } from "@mui/material";

import * as Yup from "yup";
import { Schema } from "yup";
import { useInput } from "../useInput";

export type UseInputProps = {
  name: string;
  field: AnyField;
  idx: number;
  path?: string;
  validate?: Schema;
};
export let required = Yup.string().required("Нужно заполнить");

export default function InputTextField(p: { idx: number; field: FieldText }) {
  const name = useInput({
    field: p.field,
    idx: p.idx,
    name: "label",
    validate: required,
  });

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
    </Grid>
  );
}
