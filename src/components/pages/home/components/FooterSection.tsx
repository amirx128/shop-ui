'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import type { HomeFooterTranslations } from '../types';

interface FooterSectionProps {
  translations: HomeFooterTranslations;
}

const socialItems = [
  { key: 'dribbble', color: '#FF4C8B', icon: SportsBasketballOutlinedIcon },
  { key: 'linkedin', color: '#036DC4', icon: LinkedInIcon },
  { key: 'twitter', color: '#00B2F3', icon: TwitterIcon },
  { key: 'facebook', color: '#004DA8', icon: FacebookIcon },
] as const;

export default function FooterSection({ translations }: FooterSectionProps) {
  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/logo.svg"
              alt={translations.logoAlt}
              width={111}
              height={41}
              priority={false}
            />
          </Box>

          <Typography variant="body2" sx={{ textAlign: 'right' }}>
            {translations.description}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, textAlign: 'right' }}
            >
              {translations.quickAccessTitle}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {translations.quickAccessLinks.map((label) => (
                <Box key={label} component="li">
                  <Typography
                    component={Link}
                    href="#"
                    sx={{ textDecoration: 'none', color: 'text.primary' }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, textAlign: 'right' }}
            >
              {translations.customerServicesTitle}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {translations.customerServicesLinks.map((label) => (
                <Box key={label} component="li">
                  <Typography
                    component={Link}
                    href="#"
                    sx={{ textDecoration: 'none', color: 'text.primary' }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, textAlign: 'right' }}
            >
              {translations.contactTitle}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <CallOutlinedIcon sx={{ color: 'text.primary' }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: 1,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {translations.phoneNumbers.map((phone) => (
                  <Typography
                    key={phone.display}
                    component={Link}
                    href={`tel:${phone.value}`}
                    sx={{ textDecoration: 'none', color: 'text.primary' }}
                  >
                    {phone.display}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <EmailOutlinedIcon sx={{ color: 'text.primary' }} />
              <Typography
                component={Link}
                href={`mailto:${translations.email}`}
                sx={{ textDecoration: 'none', color: 'text.primary' }}
              >
                {translations.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <LocationOnOutlinedIcon sx={{ color: 'text.primary' }} />
              <Typography sx={{ textAlign: 'right' }}>
                {translations.address}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <Box
                  key={item.key}
                  component={Link}
                  href="#"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: 'border',
                    backgroundColor: item.color,
                    color: 'common.white',
                    textDecoration: 'none',
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </Box>
              );
            })}
          </Box>

          <Box
            sx={(theme) => ({
              borderTop: '1px dashed',
              borderColor: alpha(theme.palette.divider, 0.8),
            })}
          />

          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {translations.copyrightText}{' '}
            <Typography
              component={Link}
              href="/"
              sx={{ color: 'secondary.main', textDecoration: 'none' }}
            >
              {translations.brandName}
            </Typography>
            {translations.copyrightSuffix
              ? ` ${translations.copyrightSuffix}`
              : null}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
