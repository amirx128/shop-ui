'use client';

import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  Theme,
} from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  radius?: 'full' | 'md';
}

export default function Button({
  children,
  sx,
  variant = 'solid',
  radius = 'full',
  ...props
}: ButtonProps) {
  const getBorderRadius = () => {
    switch (radius) {
      case 'md':
        return '12px';
      case 'full':
      default:
        return '4px';
    }
  };

  const solidSx: SxProps<Theme> = {
    borderRadius: getBorderRadius(),
    paddingX: 3,
    paddingY: 1,
    backgroundColor: 'secondary.main',
    color: 'common.white',
    textTransform: 'none',
    gap: 1,
    '@media (max-width: 768px)': {
      fontSize: '0.65rem',
    },
    '&:hover': {
      backgroundColor: 'secondary.dark',
    },
    '&:disabled': {
      backgroundColor: '#d4d4d8',
      color: 'text.disabled',
    },
  };

  const outlineSx: SxProps<Theme> = {
    borderRadius: getBorderRadius(),
    paddingX: 3,
    paddingY: 1,
    backgroundColor: 'transparent',
    color: 'secondary.main',
    textTransform: 'none',
    gap: 1,
    border: 'none',
    '@media (max-width: 768px)': {
      fontSize: '0.65rem',
    },
    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 0.8,
    },
  };

  const buttonSx: SxProps<Theme> = {
    ...(variant === 'solid' ? solidSx : outlineSx),
    ...sx,
  };

  return (
    <MuiButton sx={buttonSx} {...props}>
      {children}
    </MuiButton>
  );
}
