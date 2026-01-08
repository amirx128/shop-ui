'use client';

import { Box, Slider, SliderProps, Typography } from '@mui/material';

interface RangeInputProps extends Omit<SliderProps, 'value' | 'onChange'> {
  value: number[];
  onChange: (value: number[]) => void;
  minLabel?: string;
  maxLabel?: string;
}

export default function RangeInput({
  value,
  onChange,
  min = 0,
  max = 100,
  minLabel,
  maxLabel,
  ...props
}: RangeInputProps) {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue as number[]);
  };

  return (
    <Box sx={{ px: 2 }}>
      <Slider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        sx={{
          color: 'secondary.main',
          '& .MuiSlider-thumb': {
            backgroundColor: 'secondary.main',
          },
          '& .MuiSlider-track': {
            backgroundColor: 'secondary.main',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'divider',
          },
        }}
        {...props}
      />
      {(minLabel || maxLabel) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {minLabel}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {maxLabel}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
