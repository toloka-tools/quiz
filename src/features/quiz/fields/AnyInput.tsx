import { AnyField, FieldTypes } from "../types";
import UndefinedInput from "./UndefinedField";
import InputTextField from "./InputTextField";
import InputRadio from "./InputRadio";

const map = {
  [FieldTypes.undefined]: UndefinedInput,
  // [FieldTypes.text]: 'Короткий текст',
  // [FieldTypes.textArea]: 'Длинный текст',
  // [FieldTypes.radioGroup]: 'Выбрать один вариант',
  // [FieldTypes.checkGroup]: 'Выбрать несколько вариантов',
  // [FieldTypes.viewImage]: 'Изображение',
};

export default function AnyInput(p: { idx: number; field: Partial<AnyField> }) {
  switch (p.field.type) {
    case FieldTypes.checkGroup:
    case FieldTypes.radioGroup:
      return <InputRadio idx={p.idx} field={p.field} />;
    case FieldTypes.textArea:
    case FieldTypes.text:
      // @ts-ignore
      return <InputTextField {...p} />;
    default:
      return <></>;
  }
}
