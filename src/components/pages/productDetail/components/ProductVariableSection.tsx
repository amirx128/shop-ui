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
  colors?: string[];
  patterns?: string[];
}

const DEFAULT_COLOR_CODES: Record<string, string> = {
  black: '#000000',
  gray: '#808080',
  pink: '#FFC0CB',
  orange: '#FFA500',
};

export default function ProductVariableSection({
  translations,
  colors = [],
  patterns = [],
}: ProductVariableSectionProps) {
  const fallbackColors = [
    translations.black,
    translations.gray,
    translations.pink,
    translations.orange,
  ];
  const colorOptions = (colors.length > 0 ? colors : fallbackColors).map(
    (color) => ({
      name: color,
      code:
        DEFAULT_COLOR_CODES[
          color === translations.black
            ? 'black'
            : color === translations.gray
            ? 'gray'
            : color === translations.pink
            ? 'pink'
            : color === translations.orange
            ? 'orange'
            : 'black'
        ] ?? '#BDBDBD',
    })
  );

  const patternOptions =
    patterns.length > 0
      ? patterns
      : [translations.catPattern, translations.carPattern];

  const [selectedColor, setSelectedColor] = useState(
    colorOptions[0]?.name ?? translations.black
  );
  const [selectedPattern, setSelectedPattern] = useState<string | undefined>(
    patternOptions[0]
  );

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
            {colorOptions.map((color, index) => (
              <ColorItem
                key={`${color.name}-${index}`}
                colorName={color.name}
                colorCode={color.code}
                isSelected={selectedColor === color.name}
                onClick={() => setSelectedColor(color.name)}
              />
            ))}
          </Box>
        </Box>

        {patternOptions.length > 0 && (
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
              {patternOptions.map((pattern) => (
                <PatternItem
                  key={pattern}
                  patternName={pattern}
                  isSelected={selectedPattern === pattern}
                  onClick={() => setSelectedPattern(pattern)}
                />
              ))}
            </Box>
          </Box>
        )}

        <Divider />
      </Box>
    </Container>
  );
}
