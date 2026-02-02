'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@/components/ui/Button';
import type { HomeBlogPost } from '../types';

interface BlogCardProps {
  post: HomeBlogPost;
  ctaLabel: string;
  href: string;
}

const limitWords = (text: string, maxWords: number) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(' ')}...`;
};

export default function BlogCard({ post, ctaLabel, href }: BlogCardProps) {
  const shortDescription = limitWords(post.description, 100);

  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: 'common.white',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 256 }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 600px) 100vw, 320px"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'right',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            sx={{
              borderRadius: '999px',
              backgroundColor: '#DDEBFC',
              px: '12px',
              py: '4px',
            }}
          >
            <Typography variant="caption">{post.tag}</Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'primary.main' }}>
            {post.timeAgo}
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {shortDescription}
        </Typography>

        <Button
          component="span"
          variant="outline"
          endIcon={<ArrowBackIcon />}
          sx={{ color: 'primary.main', px: 0 }}
        >
          {ctaLabel}
        </Button>
      </Box>
    </Box>
  );
}
