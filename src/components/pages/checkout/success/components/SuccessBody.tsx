import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Image from 'next/image';

interface SuccessBodyProps {
  title: string;
  description: string;
}

export default function SuccessBody({ title, description }: SuccessBodyProps) {
  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3,
          py: 6,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={(theme) => ({
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.success.main, 0.2),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            })}
          >
            <CheckCircleOutlineOutlinedIcon
              sx={{ color: 'success.main', position: 'relative', zIndex: 1 }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{ color: 'success.main', fontWeight: 700 }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            maxWidth: 320,
            lineHeight: 1.8,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Container>
  );
}
