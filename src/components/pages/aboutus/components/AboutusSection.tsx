import { Box, Typography } from '@mui/material';
import type { AboutusSection as AboutusSectionType } from '../types';

interface AboutusSectionProps {
  section: AboutusSectionType;
}

export default function AboutusSection({ section }: AboutusSectionProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'text.primary' }}>
        {section.title}
      </Typography>
      {section.paragraphs.map((paragraph) => (
        <Typography
          key={paragraph}
          sx={{
            fontSize: 14,
            color: 'text.secondary',
            lineHeight: 1.95,
          }}
        >
          {paragraph}
        </Typography>
      ))}
    </Box>
  );
}
