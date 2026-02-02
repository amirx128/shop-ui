'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import Button from '@/components/ui/Button';
import type { HomeDiscountTranslations } from '../types';

interface DiscountSectionClientProps {
  translations: HomeDiscountTranslations;
  initialSeconds: number;
  locale: string;
}

export default function DiscountSectionClient({
  translations,
  initialSeconds,
  locale,
}: DiscountSectionClientProps) {
  const [remainingSeconds, setRemainingSeconds] =
    useState<number>(initialSeconds);

  useEffect(() => {
    if (remainingSeconds <= 0) return undefined;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const days = Math.floor(remainingSeconds / 86400);
  const hours = Math.floor((remainingSeconds % 86400) / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const formatValue = (value: number, minDigits = 2) =>
    value.toLocaleString(locale, {
      minimumIntegerDigits: minDigits,
      useGrouping: false,
    });

  const timerItems = [
    {
      key: 'days',
      label: translations.timer.days,
      value: formatValue(days, 2),
    },
    {
      key: 'hours',
      label: translations.timer.hours,
      value: formatValue(hours, 2),
    },
    {
      key: 'minutes',
      label: translations.timer.minutes,
      value: formatValue(minutes, 2),
    },
    {
      key: 'seconds',
      label: translations.timer.seconds,
      value: formatValue(seconds, 2),
    },
  ];

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.08),
        py: 4,
      })}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Box
            sx={(theme) => ({
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: '999px',
              px: '8px',
              py: '6px',
              backgroundColor: alpha(theme.palette.secondary.main, 0.12),
              color: theme.palette.secondary.main,
            })}
          >
            <LocalFireDepartmentOutlinedIcon
              sx={{ color: 'secondary.main', fontSize: 20 }}
            />
            <Typography variant="caption" sx={{ color: 'secondary.main' }}>
              {translations.badge}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              textAlign: 'right',
              fontWeight: 600,
            }}
          >
            <Box component="span" sx={{ color: 'primary.main' }}>
              {translations.titlePrimary}
            </Box>{' '}
            <Box
              component="span"
              sx={(theme) => ({ color: theme.palette.action.hover })}
            >
              {translations.titleAccent}
            </Box>
          </Typography>

          <Typography variant="body2" sx={{ textAlign: 'right' }}>
            {translations.description}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: 360,
              }}
            >
              {timerItems.map((item, index) => (
                <Box
                  key={item.key}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      width: 58,
                      height: 58,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.error.main, 0.08),
                      color: theme.palette.error.main,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: 0.25,
                    })}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: 'error.main' }}
                    >
                      {item.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      {item.label}
                    </Typography>
                  </Box>
                  {index < timerItems.length - 1 ? (
                    <Box
                      sx={{
                        minWidth: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: 'error.main', fontWeight: 600 }}
                      >
                        :
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ width: '100%', height: 210, position: 'relative' }}>
            <Image
              src="/images/home/discountBg.png"
              alt={translations.imageAlt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Button
            fullWidth
            variant="solid"
            sx={{
              borderRadius: '999px',
              py: 1.25,
              textTransform: 'none',
              backgroundColor: 'secondary.main',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            {translations.viewAll}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
