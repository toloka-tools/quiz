import { MenuItem, TextField } from "@mui/material";
import {
  DataType,
  fieldDescriptions,
  fieldLabels,
  fieldNames,
  FieldTypes,
  UndefinedField,
} from "../types";
import { useAppDispatch } from "../../../app/hooks";
import { addField } from "../quizSlice";
import React, { useCallback, useState } from "react";

const options = Object.entries(fieldDescriptions).map(([k, v]) => {
  return (
    <MenuItem key={k} value={k} disabled={k === FieldTypes.undefined}>
      {v}
    </MenuItem>
  );
});

function UndefinedInput(p: UndefinedField) {
  const dispatch = useAppDispatch();
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  const handleAdd = useCallback(
    (t: { target: { value: FieldTypes } }) => {
      // @ts-ignore
      const fieldName: string = fieldNames[t.target.value];
      // @ts-ignore
      const labelName: string = fieldLabels[t.target.value];
      const idx = counters[fieldName] || 0;
      setCounters({ ...counters, [fieldName]: idx + 1 });
      dispatch(
        addField({
          type: t.target.value,
          // label: `${labelName} ${idx + 1}`,
          label: ``,
          data: { type: DataType.output, path: `${fieldName}_${idx + 1}` },
        })
      );
    },
    [counters, dispatch]
  );
  return (
    <TextField
      value={FieldTypes.undefined}
      label={p.label}
      children={options}
      select
      fullWidth
      // @ts-ignore
      onChange={handleAdd}
    />
  );
}

export default React.memo(UndefinedInput);
