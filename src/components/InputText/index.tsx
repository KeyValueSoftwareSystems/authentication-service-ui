import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export interface FormInputProps {
  name: string;
  label: string;
  type: string;
  setValue?: any;
  className?: any;
  inputHeight?: number;
}

const FormInputText = ({
  name,
  label,
  type,
  className,
  inputHeight,
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          type={type}
          label={label}
          variant="outlined"
          className={className}
          required
          inputProps={{ sx: { height: inputHeight } }}
        />
      )}
    />
  );
};

export default FormInputText;
