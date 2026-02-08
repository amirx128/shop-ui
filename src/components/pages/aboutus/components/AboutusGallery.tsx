import Image from 'next/image';
import { Box } from '@mui/material';
import type { AboutusGalleryImage } from '../types';

interface AboutusGalleryProps {
  images: AboutusGalleryImage[];
}

export default function AboutusGallery({ images }: AboutusGalleryProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(6, clamp(64px, 18vw, 96px))',
        gap: '4px',
      }}
    >
      {images.map((image) => (
        <Box
          key={image.src}
          sx={{
            position: 'relative',
            gridColumn: image.gridColumn,
            gridRow: image.gridRow,
            borderRadius: 1.5,
            overflow: 'hidden',
            backgroundColor: 'grey.100',
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={image.sizes}
            style={{ objectFit: 'cover' }}
          />
        </Box>
      ))}
    </Box>
  );
}
