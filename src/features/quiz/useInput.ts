import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCallback, useState } from "react";
import { setFieldValue } from "./quizSlice";
import { AnyField } from "./types";
import { Schema } from "yup";
const pointer = require("json-pointer");

export type UseInputProps = {
  name: string;
  field: Partial<AnyField>;
  idx: number;
  path?: string;
  validate?: Schema;
};

export function useInput({ field, name, validate, path, idx }: UseInputProps) {
  const dispatch = useAppDispatch();
  const p = path ? `/${idx}/${path}` : `/${idx}/${name}`;
  const defaultValue = useAppSelector((state) => {
    try {
      return pointer(state.quiz.fields).get(p);
    } catch (e) {
      return "";
    }
  });
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value);
      if (!validate) return;
      validate
        .validate(e.target.value)
        .then(() => setError(""))
        .catch((e: any) => {
          setError(e.message);
        });
    },
    [validate]
  );

  const onBlur = useCallback(
    (e) => {
      dispatch(
        setFieldValue({
          path: p,
          value: e.target.value,
        })
      );
    },
    [dispatch, p]
  );

  return {
    name,
    onChange,
    onBlur,
    value,
    error: Boolean(error),
    helperText: error,
  };
}
