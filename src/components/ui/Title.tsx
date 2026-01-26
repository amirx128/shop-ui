import { Box, Typography } from '@mui/material';

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <Box sx={{ width: 'max-content' }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          borderBottom: '1px solid',
          borderBottomColor: 'secondary.main',
          pb: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
