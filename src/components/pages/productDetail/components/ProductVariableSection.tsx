'use client';

import { useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ColorItem from './ColorItem';
import PatternItem from './PatternItem';

interface ProductVariableSectionProps {
  translations: {
    color: string;
    pattern: string;
    black: string;
    gray: string;
    pink: string;
    orange: string;
    catPattern: string;
    carPattern: string;
  };
}

export default function ProductVariableSection({
  translations,
}: ProductVariableSectionProps) {
  const [selectedColor, setSelectedColor] = useState(translations.black);
  const [selectedPattern, setSelectedPattern] = useState(
    translations.catPattern
  );

  const colors = [
    { name: translations.black, code: '#000000' },
    { name: translations.gray, code: '#808080' },
    { name: translations.pink, code: '#FFC0CB' },
    { name: translations.orange, code: '#FFA500' },
  ];

  const patterns = [translations.catPattern, translations.carPattern];

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              fontSize: '14px',
            }}
          >
            {translations.color}: {selectedColor}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {colors.map((color) => (
              <ColorItem
                key={color.name}
                colorName={color.name}
                colorCode={color.code}
                isSelected={selectedColor === color.name}
                onClick={() => setSelectedColor(color.name)}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              fontSize: '14px',
            }}
          >
            {translations.pattern}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            {patterns.map((pattern) => (
              <PatternItem
                key={pattern}
                patternName={pattern}
                isSelected={selectedPattern === pattern}
                onClick={() => setSelectedPattern(pattern)}
              />
            ))}
          </Box>
        </Box>

        <Divider />
      </Box>
    </Container>
  );
}
