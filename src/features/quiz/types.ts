export enum ValidationTypes {
  required = "condition.required",
}

export type Validation = {
  type: ValidationTypes;
  hint: string;
};

export const ValRadioRequired: Validation = {
  type: ValidationTypes.required,
  hint: "выберите один из вариантов",
};

export const ValTextRequired: Validation = {
  type: ValidationTypes.required,
  hint: "Обязательное поле",
};

export enum FieldTypes {
  radioGroup = "field.radio-group",
  checkGroup = "field.checkbox-group",
  text = "field.text",
  textArea = "field.textarea",
  viewImage = "view.image",
  undefined = "undefined",
}

export enum DataType {
  output = "data.output",
}

export type DataSpec = {
  type: DataType;
  path: string;
};

export type Field = {
  type: FieldTypes;
  data?: DataSpec;
  label?: string;
  validation?: Validation;
};

export type UndefinedField = Field & {
  type: FieldTypes.undefined;
};

export type FieldText = Field & {
  type: FieldTypes.text;
};

export type FieldTextArea = Field & {
  type: FieldTypes.textArea;
};

export type FieldViewImage = Field & {
  type: FieldTypes.viewImage;
};

export type Option = {
  label: string;
  value: string;
  hint?: string;
};

export type FieldRadioGroup = Field & {
  type: FieldTypes.radioGroup;
  options: Option[];
};

export type FieldCheckGroup = Field & {
  type: FieldTypes.checkGroup;
  options: Option[];
};

export type AnyField =
  | FieldText
  | FieldTextArea
  | FieldRadioGroup
  | FieldCheckGroup
  | FieldViewImage
  | UndefinedField;

export const fieldDescriptions = {
  [FieldTypes.undefined]: "Добавить поле",
  [FieldTypes.text]: "Короткий текст",
  [FieldTypes.textArea]: "Длинный текст",
  [FieldTypes.radioGroup]: "Выбрать один вариант",
  [FieldTypes.checkGroup]: "Выбрать несколько вариантов",
  [FieldTypes.viewImage]: "Изображение",
};

export const fieldNames = {
  [FieldTypes.undefined]: "undef",
  [FieldTypes.text]: "text",
  [FieldTypes.textArea]: "text_area",
  [FieldTypes.radioGroup]: "radio",
  [FieldTypes.checkGroup]: "radio_check",
  [FieldTypes.viewImage]: "image",
};

export const fieldLabels = {
  [FieldTypes.undefined]: "undef",
  [FieldTypes.text]: "Текстовое поле",
  [FieldTypes.textArea]: "Длинный текст",
  [FieldTypes.radioGroup]: "Выбор ответа",
  [FieldTypes.checkGroup]: "Выбор нескольких ответов",
  [FieldTypes.viewImage]: "Изображение",
};
