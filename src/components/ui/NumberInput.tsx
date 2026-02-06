import {
  TextField,
  Box,
  Typography,
  TextFieldProps,
  InputAdornment,
} from '@mui/material';
import { forwardRef } from 'react';

interface NumberInputProps
  extends Omit<TextFieldProps, 'firstContent' | 'endContent'> {
  label?: string;
  error?: boolean;
  errorMessage?: React.ReactNode;
  centerText?: boolean;
  firstContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      error,
      errorMessage,
      centerText = false,
      firstContent,
      endContent,
      InputProps,
      sx,
      ...props
    },
    ref,
  ) => {
    return (
      <Box sx={{ width: '100%' }}>
        {label && (
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: 'text.primary',
              fontSize: '0.875rem',
            }}
          >
            {label}
          </Typography>
        )}
        <TextField
          ref={ref}
          error={error}
          type="tel"
          inputMode="numeric"
          InputProps={{
            startAdornment: firstContent ? (
              <InputAdornment position="start">{firstContent}</InputAdornment>
            ) : undefined,
            endAdornment: endContent ? (
              <InputAdornment position="end">{endContent}</InputAdornment>
            ) : undefined,
            ...InputProps,
          }}
          inputProps={{
            pattern: '[0-9]*',
            ...props.inputProps,
          }}
          {...props}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              borderRadius: '22px',
              padding: '12px',
              '& fieldset': {
                borderColor: error ? 'error.main' : 'divider',
              },
              '&:hover fieldset': {
                borderColor: error ? 'error.main' : 'divider',
              },
              '&.Mui-focused fieldset': {
                borderColor: error ? 'error.main' : 'primary.main',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '0 !important',
              textAlign: centerText ? 'center' : 'inherit',
              fontSize: '1rem',
            },
            ...sx,
          }}
        />
        {error && errorMessage && (
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              color: 'error.main',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
