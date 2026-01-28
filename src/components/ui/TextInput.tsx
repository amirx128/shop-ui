import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { forwardRef } from 'react';

interface TextInputProps extends Omit<
  TextFieldProps,
  'firstContent' | 'endContent'
> {
  firstContent?: React.ReactNode;
  endContent?: React.ReactNode;
  centerText?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { firstContent, endContent, InputProps, sx, centerText = false, ...props },
    ref,
  ) => {
    return (
      <TextField
        ref={ref}
        {...props}
        InputProps={{
          startAdornment: firstContent ? (
            <InputAdornment position="start">{firstContent}</InputAdornment>
          ) : undefined,
          endAdornment: endContent ? (
            <InputAdornment position="end">{endContent}</InputAdornment>
          ) : undefined,
          ...InputProps,
        }}
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
            textAlign: centerText ? 'center' : 'left',
          },
          '& .MuiOutlinedInput-input::placeholder': {
            textAlign: centerText ? 'center' : 'left',
          },
          '& .MuiInputLabel-root': {
            textAlign: 'left',
            left: 14,
            right: 'auto',
            transformOrigin: 'top left',
            px: 1,
          },
          '[dir="rtl"] & .MuiOutlinedInput-input': {
            textAlign: centerText ? 'center' : 'right',
          },
          '[dir="rtl"] & .MuiOutlinedInput-input::placeholder': {
            textAlign: centerText ? 'center' : 'right',
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
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
