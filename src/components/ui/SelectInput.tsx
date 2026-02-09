import { forwardRef } from 'react';
import { MenuItem, TextField, TextFieldProps, Typography } from '@mui/material';

export interface SelectInputOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface SelectInputProps
  extends Omit<TextFieldProps, 'select' | 'value' | 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: SelectInputOption[];
  placeholder?: string;
  emptyValue?: string;
}

const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder,
      emptyValue = '',
      SelectProps,
      sx,
      ...props
    },
    ref,
  ) => {
    const defaultRenderValue = (selectedValue: unknown) => {
      const selected = String(selectedValue ?? '');

      if (selected === emptyValue) {
        return (
          <Typography sx={{ color: 'text.disabled', fontSize: 14 }}>
            {placeholder ?? ''}
          </Typography>
        );
      }

      const selectedOption = options.find((option) => option.value === selected);

      return selectedOption?.label ?? selected;
    };

    return (
      <TextField
        ref={ref}
        select
        value={value}
        onChange={onChange}
        SelectProps={{
          displayEmpty: true,
          renderValue: SelectProps?.renderValue ?? defaultRenderValue,
          ...SelectProps,
        }}
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '22px',
            padding: '12px',
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'divider',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '0 !important',
            textAlign: 'left',
          },
          '& .MuiSelect-select': {
            paddingLeft: '28px !important',
            paddingRight: '0 !important',
          },
          '& .MuiSelect-icon': {
            left: 12,
            right: 'auto',
            color: 'text.secondary',
          },
          '& .MuiInputLabel-root': {
            textAlign: 'left',
            left: 14,
            right: 'auto',
            transformOrigin: 'top left',
            px: 1,
          },
          '[dir="rtl"] & .MuiOutlinedInput-input': {
            textAlign: 'right',
          },
          '[dir="rtl"] & .MuiInputLabel-root': {
            textAlign: 'right',
            right: 14,
            left: 'auto',
            transformOrigin: 'top right',
            px: 2,
          },
          ...sx,
        }}
      >
        {placeholder ? (
          <MenuItem value={emptyValue}>
            <Typography sx={{ color: 'text.disabled' }}>{placeholder}</Typography>
          </MenuItem>
        ) : null}

        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  },
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
