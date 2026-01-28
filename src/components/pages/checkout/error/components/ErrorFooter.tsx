import { Box, Button, Container } from '@mui/material';
import Link from 'next/link';

interface ErrorFooterProps {
  actionLabel: string;
  actionHref: string;
}

export default function ErrorFooter({
  actionLabel,
  actionHref,
}: ErrorFooterProps) {
  return (
    <Box
      sx={{
        mt: 'auto',
        py: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <Container>
        <Button
          component={Link}
          href={actionHref}
          fullWidth
          variant="contained"
          color="error"
          sx={{
            py: 1.4,
            fontWeight: 600,
            color: 'common.white',
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          {actionLabel}
        </Button>
      </Container>
    </Box>
  );
}