import { Theme } from "@mui/material";
import { FieldInputProps, FieldMetaState } from "react-final-form";
import { FormApi, ValidationErrors } from "final-form";

export type StyledParams = { theme: Theme };

export type FieldRenderParams<T> = {
  input: FieldInputProps<T>;
  meta: FieldMetaState<T>;
};

export type FormRenderParams<T> = {
  values: T;
  hasValidationErrors: boolean;
  form: FormApi<T, Partial<T>>;
  errors: ValidationErrors;
};
