'use client';

import { Box, Switch, SwitchProps, Typography } from '@mui/material';

interface SwitchInputProps extends Omit<SwitchProps, 'onChange'> {
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  label: string;
}

export default function SwitchInput({
  checked,
  onChange,
  label,
  ...props
}: SwitchInputProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography>{label}</Typography>
      <Switch
        checked={checked}
        onChange={onChange}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: 'secondary.main',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'secondary.main',
          },
        }}
        {...props}
      />
    </Box>
  );
}
