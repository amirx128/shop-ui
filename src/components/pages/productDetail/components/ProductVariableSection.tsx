'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ColorItem from './ColorItem';
import PropertyOptionItem from './PropertyOptionItem';
import {
  CategoryPropertyFilterValueDto,
  ProductColorInfo,
  ProductPropertyEntry,
  ProductVariableSelection,
} from '../types';

interface ProductVariableSectionProps {
  translations: {
    color: string;
    black: string;
    gray: string;
    pink: string;
    orange: string;
    ageGroup: string;
  };
  colors: ProductColorInfo[];
  properties?: ProductPropertyEntry[];
  ageRanges?: CategoryPropertyFilterValueDto[];
  onSelectionChange?: (selection: ProductVariableSelection) => void;
}

export default function ProductVariableSection({
  translations,
  colors = [],
  properties = [],
  ageRanges = [],
  onSelectionChange,
}: ProductVariableSectionProps) {
  const fallbackColors = [
    { id: 'fallback-black', name: translations.black, colorCode: '#000000' },
    { id: 'fallback-gray', name: translations.gray, colorCode: '#808080' },
    { id: 'fallback-pink', name: translations.pink, colorCode: '#FFC0CB' },
    { id: 'fallback-orange', name: translations.orange, colorCode: '#FFA500' },
  ];

  const colorOptions = colors.length > 0 ? colors : fallbackColors;
  const [selectedColorId, setSelectedColorId] = useState(
    colorOptions[0]?.id ?? fallbackColors[0].id
  );

  const selectedColor = colorOptions.find(
    (color) => color.id === selectedColorId
  );

  const propertyGroups =
    properties.filter((property) => property.values.length > 0) ?? [];
  const ageRangeOptions = ageRanges.filter((value) =>
    Boolean(value && value.title && value.id)
  );

  const [selectedAgeRangeId, setSelectedAgeRangeId] = useState<
    string | undefined
  >(ageRangeOptions[0]?.id);

  const selectedAgeRange = ageRangeOptions.find(
    (range) => range.id === selectedAgeRangeId
  );

  const [selectedPropertyValues, setSelectedPropertyValues] = useState<
    Record<string, string>
  >(() => {
    const selections: Record<string, string> = {};
    for (const property of propertyGroups) {
      const firstValue = property.values[0];
      if (firstValue) {
        selections[property.id] = firstValue.id;
      }
    }
    return selections;
  });

  const handlePropertySelect = (propertyId: string, valueId: string) => {
    setSelectedPropertyValues((prev) => ({
      ...prev,
      [propertyId]: valueId,
    }));
  };

  const propertyValueIds = useMemo(
    () => Object.values(selectedPropertyValues),
    [selectedPropertyValues]
  );

  useEffect(() => {
    onSelectionChange?.({
      colorId: selectedColorId,
      ageRangeId: selectedAgeRangeId,
      propertyValueIds,
    });
  }, [onSelectionChange, selectedColorId, selectedAgeRangeId, propertyValueIds]);

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
            {translations.color}: {selectedColor?.name ?? translations.black}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {colorOptions.map((color) => (
              <ColorItem
                key={color.id}
                colorId={color.id}
                colorName={color.name}
                colorCode={color.colorCode}
                isSelected={selectedColorId === color.id}
                onClick={() => setSelectedColorId(color.id)}
              />
            ))}
          </Box>
        </Box>
        {ageRangeOptions.length > 0 && (
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
              {translations.ageGroup}
              {selectedAgeRange ? ` : ${selectedAgeRange.title}` : ''}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {ageRangeOptions.map((value) => (
                <PropertyOptionItem
                  key={value.id}
                  label={value.title}
                  isSelected={selectedAgeRangeId === value.id}
                  onClick={() => setSelectedAgeRangeId(value.id)}
                />
              ))}
            </Box>
          </Box>
        )}

        {propertyGroups.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {propertyGroups.map((property) => {
              const selectedValueId = selectedPropertyValues[property.id];
              const selectedValue =
                property.values.find((value) => value.id === selectedValueId) ??
                property.values[0];
              return (
                <Box
                  key={property.id}
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
                    {property.title}
                    {selectedValue ? ` : ${selectedValue.title}` : ''}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    {property.values.map((value) => (
                      <PropertyOptionItem
                        key={value.id}
                        label={value.title}
                        isSelected={selectedValueId === value.id}
                        onClick={() => handlePropertySelect(property.id, value.id)}
                      />
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        <Divider />
      </Box>
    </Container>
  );
}
