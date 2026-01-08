'use client';

import { Box } from '@mui/material';
import CheckboxInput from '../CheckboxInput';
import Divider from '../Divider';

interface SelectOption {
  id: number;
  titleEn: string;
  titleFa: string;
}

interface SelectFilterProps {
  options: SelectOption[];
  selectedIds: number[];
  onChange: (selectedIds: number[]) => void;
  locale: string;
}

export default function SelectFilter({
  options,
  selectedIds,
  onChange,
  locale,
}: SelectFilterProps) {
  const handleChange = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <Box>
      {options.map((option, index) => (
        <Box key={option.id}>
          <CheckboxInput
            label={locale === 'fa' ? option.titleFa : option.titleEn}
            checked={selectedIds.includes(option.id)}
            onChange={() => handleChange(option.id)}
          />
          {index < options.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
