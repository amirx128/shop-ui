'use client';

import { Box, Typography, LinearProgress, Divider } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface CommentScoresProps {
  translations: {
    reviewScores: string;
  };
}

export default function CommentScores({ translations }: CommentScoresProps) {
  const scoreData = [
    { stars: 5, percentage: 40, color: '#12a150' },
    { stars: 4, percentage: 30, color: '#45d483' },
    { stars: 3, percentage: 20, color: '#f5a524' },
    { stars: 2, percentage: 8, color: '#ff7543' },
    { stars: 1, percentage: 2, color: '#f31260' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        padding: 3,
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
          }}
        >
          {translations.reviewScores}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StarOutlinedIcon
            sx={{
              color: '#45d483',
            }}
          />
          <Typography variant="body2">4.3</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {scoreData.map((item) => (
          <Box
            key={item.stars}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: 12,
                borderRadius: '6px',
                backgroundColor: 'divider',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${item.percentage}%`,
                  height: '100%',
                  backgroundColor: item.color,
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <StarOutlinedIcon
                sx={{
                  fontSize: 16,
                  color: item.color,
                }}
              />
              <Typography variant="body2">{item.stars}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
