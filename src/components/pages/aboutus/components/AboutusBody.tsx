import { Box, Container, Typography } from '@mui/material';
import AboutusGallery from './AboutusGallery';
import AboutusSection from './AboutusSection';
import type { AboutusGalleryImage, AboutusSection as AboutusSectionType } from '../types';

interface AboutusBodyProps {
  introParagraphs: string[];
  galleryImages: AboutusGalleryImage[];
  sections: AboutusSectionType[];
}

export default function AboutusBody({
  introParagraphs,
  galleryImages,
  sections,
}: AboutusBodyProps) {
  const [firstIntro = '', secondIntro = ''] = introParagraphs;

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
      }}
    >
      <Container
        sx={{
          py: 3,
          pb: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.95 }}>
            {firstIntro}
          </Typography>

          <AboutusGallery images={galleryImages} />

          <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.95 }}>
            {secondIntro}
          </Typography>

          {sections.map((section) => (
            <AboutusSection key={section.title} section={section} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
