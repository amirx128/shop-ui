'use client';

import { Box, Container, IconButton, Modal, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { alpha } from '@mui/material/styles';
import Button from '@/components/ui/Button';
import useCancelOrderModal from '../hooks/useCancelOrderModal';
import type { CancelOrderLabels } from '../types/orderDetail';

interface CancelOrderActionProps {
  labels: CancelOrderLabels;
}

export default function CancelOrderAction({ labels }: CancelOrderActionProps) {
  const { open, openModal, closeModal } = useCancelOrderModal();

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={openModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          border: 'none',
          background: 'none',
          color: 'error.main',
          cursor: 'pointer',
          padding: 0,
          font: 'inherit',
        }}
      >
        <CancelOutlinedIcon fontSize="small" />
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'error.main' }}>
          {labels.action}
        </Typography>
      </Box>

      <Modal
        open={open}
        onClose={closeModal}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxHeight: '80vh',
            backgroundColor: 'background.default',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              py: 2,
            }}
          >
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {labels.modalTitle}
                </Typography>
                <IconButton
                  onClick={closeModal}
                  size="small"
                  sx={{ color: 'text.primary' }}
                >
                  <CancelOutlinedIcon />
                </IconButton>
              </Box>
            </Container>
          </Box>

          <Box sx={{ py: 3 }}>
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: (theme) =>
                      alpha(theme.palette.error.main, 0.2),
                    boxShadow: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CancelOutlinedIcon sx={{ color: 'error.main' }} />
                </Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                  {labels.modalQuestion}
                </Typography>
              </Box>
            </Container>
          </Box>

          <Box
            sx={{
              borderTop: 1,
              borderColor: 'divider',
              py: 2,
            }}
          >
            <Container>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  fullWidth
                  radius="md"
                  onClick={closeModal}
                  sx={{
                    backgroundColor: 'error.main',
                    '&:hover': {
                      backgroundColor: 'error.dark',
                    },
                  }}
                >
                  {labels.confirm}
                </Button>
                <Button
                  variant="bordered"
                  fullWidth
                  radius="md"
                  onClick={closeModal}
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                  }}
                >
                  {labels.dismiss}
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
