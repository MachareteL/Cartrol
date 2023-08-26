import { TextField } from "@mui/material";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
export default function Textinput({
  placeholder,
  onChange,
  className,
  helperText,
  lineCount,
  multiline,
  required,
  ...attr
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { helperText?: string; multiline?: boolean; lineCount?: number }) {
  return (
    <TextField
      label={placeholder}
      required={required}
      variant="outlined"
      className={className}
      onChange={onChange}
      maxRows={lineCount}
      multiline={multiline}
      helperText={helperText}
      inputProps={{ className: `disabled:bg-gray-300 cursor disabled:border disabled:border-slate-200 disabled:cursor-not-allowed`, ...attr }}
    ></TextField>
  );
}
