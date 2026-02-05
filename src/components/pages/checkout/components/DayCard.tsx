'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface DayCardProps {
  dayLabel: string;
  dateLabel: string;
  selected: boolean;
  onSelect: () => void;
}

export default function DayCard({
  dayLabel,
  dateLabel,
  selected,
  onSelect,
}: DayCardProps) {
  const theme = useTheme();
  const selectedBackground = alpha(theme.palette.secondary.main, 0.15);

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      sx={{
        width: 80,
        height: 70,
        border: '1px solid',
        borderColor: selected ? 'secondary.main' : 'divider',
        backgroundColor: selected ? selectedBackground : 'transparent',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        cursor: 'pointer',
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        {dayLabel}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {dateLabel}
      </Typography>
    </Box>
  );
}
