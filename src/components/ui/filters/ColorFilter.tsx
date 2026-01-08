'use client';

import { Box, Typography } from '@mui/material';
import { ProductColor, COLOR_CONFIG } from '@/enums/colors';

interface ColorFilterProps {
  selectedColors: ProductColor[];
  onChange: (selectedColors: ProductColor[]) => void;
  locale: string;
}

export default function ColorFilter({
  selectedColors,
  onChange,
  locale,
}: ColorFilterProps) {
  const handleColorClick = (color: ProductColor) => {
    if (selectedColors.includes(color)) {
      onChange(selectedColors.filter((c) => c !== color));
    } else {
      onChange([...selectedColors, color]);
    }
  };

  const colors = Object.values(ProductColor);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        py: 2,
      }}
    >
      {colors.map((color) => {
        const config = COLOR_CONFIG[color];
        const isSelected = selectedColors.includes(color);

        return (
          <Box
            key={color}
            onClick={() => handleColorClick(color)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1',
                padding: '8px',
                border: 1,
                borderColor: isSelected ? 'secondary.main' : 'divider',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  border: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  overflow: 'hidden',
                }}
              >
                {config.colors.map((bgColor, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      backgroundColor: bgColor,
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: isSelected ? 'secondary.main' : 'text.primary',
                fontWeight: isSelected ? 600 : 400,
              }}
            >
              {locale === 'fa' ? config.labelFa : config.labelEn}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
