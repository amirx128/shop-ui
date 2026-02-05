'use client';

import { Box } from '@mui/material';
import CheckboxInput from '../CheckboxInput';
import Divider from '../Divider';

type FilterOptionId = string | number;

interface SelectOption {
  id: FilterOptionId;
  title?: string;
  titleEn?: string;
  titleFa?: string;
}

interface SelectFilterProps {
  options: SelectOption[];
  selectedIds: FilterOptionId[];
  onChange: (selectedIds: FilterOptionId[]) => void;
  locale: string;
}

const getOptionLabel = (option: SelectOption, locale: string) => {
  if (locale === 'fa') {
    return option.titleFa ?? option.title ?? option.titleEn ?? '';
  }

  return option.titleEn ?? option.title ?? option.titleFa ?? '';
};

export default function SelectFilter({
  options,
  selectedIds,
  onChange,
  locale,
}: SelectFilterProps) {
  const handleChange = (id: FilterOptionId) => {
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
            label={getOptionLabel(option, locale)}
            checked={selectedIds.includes(option.id)}
            onChange={() => handleChange(option.id)}
          />
          {index < options.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
