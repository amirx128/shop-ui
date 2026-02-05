'use client';

import { Radio, RadioProps } from '@mui/material';

export default function RadioInput(props: RadioProps) {
  return (
    <Radio
      {...props}
      color="secondary"
      size="small"
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 18,
        },
        ...props.sx,
      }}
    />
  );
}
