'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import TextInput from '../TextInput';
import RangeInput from '../RangeInput';

interface RangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  fromLabel: string;
  toLabel: string;
  currencyLabel: string;
  minLabel?: string;
  maxLabel?: string;
}

export default function RangeFilter({
  min,
  max,
  value,
  onChange,
  fromLabel,
  toLabel,
  currencyLabel,
  minLabel,
  maxLabel,
}: RangeFilterProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  const handleSliderChange = (newValue: number[]) => {
    const rangeValue: [number, number] = [newValue[1], newValue[0]];
    setLocalValue(rangeValue);
    onChange(rangeValue);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value.replace(/\D/g, '')) || min;
    const newValue: [number, number] = [
      Math.min(numValue, localValue[1]),
      localValue[1],
    ];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value.replace(/\D/g, '')) || max;
    const newValue: [number, number] = [
      localValue[0],
      Math.max(numValue, localValue[0]),
    ];
    setLocalValue(newValue);
    onChange(newValue);
  };

  console.log('RangeFilter render - localValue:', localValue);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextInput
          firstContent={<Typography variant="body2">{fromLabel}</Typography>}
          endContent={<Typography variant="body2">{currencyLabel}</Typography>}
          value={localValue[1].toLocaleString()}
          onChange={handleMinInputChange}
          fullWidth
          centerText
        />
        <TextInput
          firstContent={<Typography variant="body2">{toLabel}</Typography>}
          endContent={<Typography variant="body2">{currencyLabel}</Typography>}
          value={localValue[0].toLocaleString()}
          onChange={handleMaxInputChange}
          fullWidth
          centerText
        />
      </Box>
      <RangeInput
        value={[localValue[0], localValue[1]]}
        onChange={handleSliderChange}
        min={min}
        max={max}
        minLabel={minLabel}
        maxLabel={maxLabel}
      />
    </Box>
  );
}
