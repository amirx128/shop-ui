'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { Search, NotificationsNoneOutlined } from '@mui/icons-material';
import TextInput from '@/components/ui/TextInput';
import type { HeaderProps } from '../types';

const Header = ({
  onSearch,
  onNotificationClick,
  mode = 'primary',
}: HeaderProps) => {
  const t = useTranslations('general.header');
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  const handleNotificationClick = useCallback(() => {
    onNotificationClick?.();
  }, [onNotificationClick]);

  const isSecondary = mode === 'secondary';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 2,
        position: mode === 'secondary' ? 'fixed' : 'sticky',
        top: 24,
        zIndex: 999,
        backgroundColor:
          mode === 'secondary' ? 'transparent' : 'background.default',
        borderBottom: mode === 'secondary' ? 'none' : 1,
        borderColor: 'divider',
        width: '100%',
      }}
    >
      <TextInput
        fullWidth
        placeholder={t('search')}
        value={searchValue}
        onChange={handleSearchChange}
        sx={
          isSecondary
            ? {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'common.white',
                  py: 1,
                  borderRadius: 10,
                },
              }
            : undefined
        }
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
          backgroundColor: isSecondary ? 'common.white' : 'transparent',
          '&:hover': {
            backgroundColor: isSecondary ? 'common.white' : 'action.hover',
          },
        }}
      >
        <NotificationsNoneOutlined />
      </IconButton>
    </Box>
  );
};

export default Header;
