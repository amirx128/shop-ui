'use client';

import { useState } from 'react';
import { Box, Container } from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Image
            src={images[selectedIndex]}
            alt="Product image"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />

          <Box
            onClick={handleNext}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronLeftOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>

          <Box
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronRightOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            paddingBottom: 1,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => setSelectedIndex(index)}
              sx={{
                position: 'relative',
                flex: '0 0 calc(25% - 6px)',
                aspectRatio: '1',
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="25vw"
                style={{
                  objectFit: 'cover',
                }}
              />
              {selectedIndex === index && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
