import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { ROUTES } from '@/lib/routes';
import AboutusBody from './components/AboutusBody';
import AboutusHeader from './components/AboutusHeader';
import type { AboutusGalleryImage, AboutusSection, AboutusTexts } from './types';

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function getSections(value: unknown): AboutusSection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const section = item as { title?: unknown; paragraphs?: unknown };

      if (typeof section.title !== 'string') {
        return null;
      }

      return {
        title: section.title,
        paragraphs: getStringArray(section.paragraphs),
      };
    })
    .filter((item): item is AboutusSection => item !== null);
}

export default async function AboutusContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('aboutus'),
  ]);

  const texts: AboutusTexts = {
    header: {
      title: t('header.title'),
      backLabel: t('header.backLabel'),
    },
    content: {
      introParagraphs: getStringArray(t.raw('content.introParagraphs')),
      galleryAlts: getStringArray(t.raw('content.galleryAlts')),
      sections: getSections(t.raw('content.sections')),
    },
  };

  const galleryImages: AboutusGalleryImage[] = [
    {
      src: '/images/aboutus/1.png',
      alt: texts.content.galleryAlts[0] ?? texts.header.title,
      gridColumn: '1 / 2',
      gridRow: '1 / 3',
      sizes: '(max-width: 600px) calc((100vw - 44px) / 2), 280px',
    },
    {
      src: '/images/aboutus/2.png',
      alt: texts.content.galleryAlts[1] ?? texts.header.title,
      gridColumn: '2 / 3',
      gridRow: '1 / 2',
      sizes: '(max-width: 600px) calc((100vw - 44px) / 2), 280px',
    },
    {
      src: '/images/aboutus/3.png',
      alt: texts.content.galleryAlts[2] ?? texts.header.title,
      gridColumn: '2 / 3',
      gridRow: '2 / 3',
      sizes: '(max-width: 600px) calc((100vw - 44px) / 2), 280px',
    },
    {
      src: '/images/aboutus/4.png',
      alt: texts.content.galleryAlts[3] ?? texts.header.title,
      gridColumn: '1 / 3',
      gridRow: '3 / 5',
      sizes: '(max-width: 600px) calc(100vw - 40px), 560px',
    },
    {
      src: '/images/aboutus/5.png',
      alt: texts.content.galleryAlts[4] ?? texts.header.title,
      gridColumn: '1 / 2',
      gridRow: '5 / 7',
      sizes: '(max-width: 600px) calc((100vw - 44px) / 2), 280px',
    },
    {
      src: '/images/aboutus/6.png',
      alt: texts.content.galleryAlts[5] ?? texts.header.title,
      gridColumn: '2 / 3',
      gridRow: '5 / 7',
      sizes: '(max-width: 600px) calc((100vw - 44px) / 2), 280px',
    },
  ];

  const backHref = `/${locale}/mobile${ROUTES.profile.BASE}`;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100dvh - 72px)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <Container>
          <AboutusHeader
            title={texts.header.title}
            backHref={backHref}
            backLabel={texts.header.backLabel}
          />
        </Container>
      </Box>

      <AboutusBody
        introParagraphs={texts.content.introParagraphs}
        galleryImages={galleryImages}
        sections={texts.content.sections}
      />
    </Box>
  );
}
