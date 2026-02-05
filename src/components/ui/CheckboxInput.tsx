'use client';

import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';

interface CheckboxInputProps
  extends Omit<FormControlLabelProps, 'control' | 'onChange'> {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxInput({
  checked,
  onChange,
  label,
  ...props
}: CheckboxInputProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="6" fill="currentColor" />
            </svg>
          }
          checkedIcon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="6" fill="currentColor" />
              <path
                d="M5 10L8.5 13.5L15 6.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          sx={{
            color: 'divider',
            '&.Mui-checked': {
              color: 'secondary.main',
            },
          }}
        />
      }
      label={label}
      {...props}
    />
  );
}
