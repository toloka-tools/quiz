import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyField } from "./types";
import { arrayMoveMutable } from "array-move";
const pointer = require("json-pointer");

export interface QuizState {
  fields: Partial<AnyField>[];
  currentId: 0;
}

const initialState: QuizState = {
  fields: [],
  currentId: 0,
};

export const quizSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addField: (state, action: PayloadAction<Partial<AnyField>>) => {
      state.fields.push(action.payload);
      state.currentId++;
    },
    changeField: (
      state,
      action: PayloadAction<{ id: number; value: AnyField }>
    ) => {
      state.fields = state.fields.map((f, idx) => {
        if (idx === action.payload.id) return f;
        else return action.payload.value;
      });
    },
    nextId: (state) => {
      state.currentId++;
    },
    setFieldValue: (
      state,
      action: PayloadAction<{ path: string; value: any }>
    ) => {
      pointer(state.fields).set(action.payload.path, action.payload.value);
    },
    reorder: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      arrayMoveMutable(
        state.fields,
        action.payload.oldIndex,
        action.payload.newIndex
      );
    },
    remove: (state, action: PayloadAction<number>) => {
      state.fields.splice(action.payload, 1);
    },
  },
});

export const { changeField, addField, setFieldValue, reorder, remove } =
  quizSlice.actions;

export default quizSlice.reducer;
