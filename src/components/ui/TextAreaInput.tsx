'use client';

import { TextField } from '@mui/material';

interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: boolean;
  helperText?: string;
}

export default function TextAreaInput({
  value,
  onChange,
  placeholder,
  error,
  helperText,
}: TextAreaInputProps) {
  return (
    <TextField
      multiline
      rows={4}
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#d4d4d8',
          },
          '&:hover fieldset': {
            borderColor: '#326bde',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#223A78',
          },
        },
      }}
    />
  );
}
