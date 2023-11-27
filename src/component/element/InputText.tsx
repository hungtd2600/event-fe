import { FC, ReactNode, ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import { StyledParams } from "@/type/common";

export type InputProps = {
  value: string;
  type?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: () => void;
};

export type RequiredInputProps = InputProps & { required: true };

type InputTextProps = {
  title?: string;
  disabled?: boolean;
  note?: string;
  inputProps: InputProps | RequiredInputProps | OutlinedInputProps;
  inputError?: string;
  required?: boolean;
  placeholder?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  errorWithoutText?: boolean;
};

/**
 * @returns Element InputText
 */
export const InputText: FC<InputTextProps> = ({
  required = false,
  title,
  inputProps,
  inputError,
  placeholder,
  startAdornment,
  endAdornment,
  errorWithoutText = false,
}) => {
  return (
    <FormControl fullWidth error={!!inputError} required={required}>
      {title && (
        <FormLabel>
          <Typography>{title}</Typography>
        </FormLabel>
      )}
      <InputStyled
        {...inputProps}
        autoComplete={"off"}
        endAdornment={endAdornment}
        placeholder={placeholder}
        startAdornment={startAdornment}
      />
      {inputError && !errorWithoutText && (
        <FormHelperText error={!!inputError} sx={{ ml: 0, pt: 0.5 }}>
          {inputError}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const InputStyled = styled(OutlinedInput)(({ theme }: StyledParams) => ({
  height: 48,
  width: 300,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5),
  },
  ".MuiOutlinedInput-notchedOutline": {
    boxShadow: "inset 0 5px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  },
}));
