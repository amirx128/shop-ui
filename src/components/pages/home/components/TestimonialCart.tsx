import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import type { HomeTestimonial } from '../types';

interface TestimonialCartProps {
  testimonial: HomeTestimonial;
}

const stars = Array.from({ length: 5 });

export default function TestimonialCart({ testimonial }: TestimonialCartProps) {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: '16px',
        p: '24px',
        backgroundColor: alpha(theme.palette.secondary.main, 0.05),
      })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Box
          sx={{
            width: 74,
            height: 74,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={74}
            height={74}
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            gap: 0.75,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {testimonial.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {stars.map((_, index) => (
              <StarOutlinedIcon
                key={index}
                sx={{ color: '#f5a524', fontSize: 20 }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          textAlign: 'right',
          color: 'text.secondary',
        }}
      >
        “{testimonial.comment}”
      </Typography>
    </Box>
  );
}
