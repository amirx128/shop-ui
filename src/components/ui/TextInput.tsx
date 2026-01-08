import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { forwardRef } from 'react';

interface TextInputProps
  extends Omit<TextFieldProps, 'firstContent' | 'endContent'> {
  firstContent?: React.ReactNode;
  endContent?: React.ReactNode;
  centerText?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { firstContent, endContent, InputProps, sx, centerText = false, ...props },
    ref
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
            textAlign: centerText ? 'center' : 'inherit',
          },
          ...sx,
        }}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
