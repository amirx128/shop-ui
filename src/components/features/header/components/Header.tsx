'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { Search, NotificationsNoneOutlined } from '@mui/icons-material';
import TextInput from '@/components/ui/TextInput';
import type { HeaderProps } from '../types';

const Header = ({ onSearch, onNotificationClick }: HeaderProps) => {
  const t = useTranslations('general.header');
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const handleNotificationClick = useCallback(() => {
    onNotificationClick?.();
  }, [onNotificationClick]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 2,
        position: 'sticky',
        top: 24,
        zIndex: 999,
        backgroundColor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <TextInput
        fullWidth
        placeholder={t('search')}
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <Search
              sx={{
                color: theme.customColors.caption,
                mr: 1,
              }}
            />
          ),
        }}
      />
      <IconButton
        onClick={handleNotificationClick}
        sx={{
          width: 44,
          height: 44,
          border: 1,
          borderColor: 'divider',
          borderRadius: '50%',
          p: 1,
          color: theme.customColors.caption,
        }}
      >
        <NotificationsNoneOutlined />
      </IconButton>
    </Box>
  );
};

export default Header;
