import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Box, Container, Typography } from '@mui/material';

interface NotificationsBodyProps {
  emptyStateDescription: string;
}

export default function NotificationsBody({ emptyStateDescription }: NotificationsBodyProps) {
  return (
    <Container sx={{ py: 2, height: '100%' }}>
      <Box
        sx={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          textAlign: 'center',
        }}
      >
        <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 33, color: 'text.secondary' }} />
        <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 2 }}>
          {emptyStateDescription}
        </Typography>
      </Box>
    </Container>
  );
}
