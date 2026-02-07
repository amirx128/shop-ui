'use client';

import { useEffect, useState } from 'react';
import { Box, Container, IconButton, Modal, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { alpha } from '@mui/material/styles';
import Button from '@/components/ui/Button';
import type { ProcessingOrderModalLabels } from '../types/orderDetail';

interface ProcessingOrderSuccessModalProps {
  labels: ProcessingOrderModalLabels;
}

export default function ProcessingOrderSuccessModal({
  labels,
}: ProcessingOrderSuccessModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
        <Box sx={{ py: 2 }}>
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
                {labels.title}
              </Typography>
              <IconButton
                onClick={handleClose}
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
                    alpha(theme.palette.success.main, 0.2),
                  boxShadow: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: 'success.main' }} />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {labels.description}
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            py: 2,
          }}
        >
          <Container>
            <Button
              variant="bordered"
              fullWidth
              radius="md"
              onClick={handleClose}
              sx={{
                color: 'text.primary',
                borderColor: 'text.primary',
              }}
            >
              {labels.action}
            </Button>
          </Container>
        </Box>
      </Box>
    </Modal>
  );
}
