'use client';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import type { SxProps, Theme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import {
  enUS as enUSPickers,
  faIR as faIRPickers,
} from '@mui/x-date-pickers/locales';
import { enUS as enUSDateFns } from 'date-fns/locale/en-US';
import { faIR as faIRDateFnsJalali } from 'date-fns-jalali/locale/fa-IR';

interface DateInputProps {
  value: Date | null;
  locale: string;
  onChange: (value: Date | null) => void;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  sx?: SxProps<Theme>;
}

export default function DateInput({
  value,
  onChange,
  locale,
  placeholder,
  fullWidth,
  disabled,
  error,
  sx,
}: DateInputProps) {
  const isFaLocale = locale.startsWith('fa');

  const picker = (
    <DatePicker
      value={value}
      onChange={onChange}
      format="yyyy/MM/dd"
      disabled={disabled}
      slots={{ openPickerIcon: CalendarMonthOutlinedIcon }}
      slotProps={{
        openPickerButton: {
          size: 'small',
          sx: { color: 'text.secondary' },
        },
        textField: {
          fullWidth,
          placeholder,
          error,
          sx: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
            '& .MuiOutlinedInput-input': {
              py: 1.25,
              fontSize: 13,
            },
            ...sx,
          },
        },
      }}
    />
  );

  if (isFaLocale) {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDateFnsJalali}
        adapterLocale={faIRDateFnsJalali}
        localeText={
          faIRPickers.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        {picker}
      </LocalizationProvider>
    );
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={enUSDateFns}
      localeText={
        enUSPickers.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {picker}
    </LocalizationProvider>
  );
}
