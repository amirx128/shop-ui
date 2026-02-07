'use client';

import { TextField } from '@mui/material';

interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export default function TextAreaInput({
  value,
  onChange,
  placeholder,
  label,
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
      label={label}
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
        '& .MuiInputLabel-root': {
          textAlign: 'left',
          left: 14,
          right: 'auto',
          transformOrigin: 'top left',
          px: 1,
        },
        '[dir="rtl"] & .MuiInputLabel-root': {
          textAlign: 'right',
          right: 14,
          left: 'auto',
          transformOrigin: 'top right',
          px: 2,
        },
      }}
    />
  );
}
