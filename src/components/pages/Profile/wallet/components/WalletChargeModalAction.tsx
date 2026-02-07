'use client';

import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box, CircularProgress, Container, Divider, IconButton, Modal, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import type {
  WalletChargeModalLabels,
  WalletChargePresetOption,
} from '../types/wallet';

interface WalletChargeModalActionProps {
  labels: WalletChargeModalLabels;
  balanceText: string;
  presets: WalletChargePresetOption[];
}

export default function WalletChargeModalAction({
  labels,
  balanceText,
  presets,
}: WalletChargeModalActionProps) {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetState = () => {
    setSelectedPreset(null);
    setCustomAmount('');
    setSubmitting(false);
    setSubmitted(false);
  };

  const openModal = () => {
    setOpen(true);
    resetState();
  };

  const closeModal = () => {
    setOpen(false);
    resetState();
  };

  const handlePresetSelect = (value: number) => {
    setSelectedPreset(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const digitsOnly = event.target.value.replace(/\D/g, '');
    setCustomAmount(digitsOnly);
    if (digitsOnly.length > 0) {
      setSelectedPreset(null);
    }
  };

  const canSubmit = selectedPreset !== null || Number(customAmount) > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <Button
        variant="solid"
        startIcon={<AddOutlinedIcon sx={{ fontSize: 18 }} />}
        onClick={openModal}
        sx={{
          backgroundColor: 'secondary.main',
          color: 'common.white',
          borderRadius: 1.5,
          '&:hover': {
            backgroundColor: 'secondary.dark',
          },
        }}
      >
        {labels.trigger}
      </Button>

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
            backgroundColor: 'background.default',
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
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
                <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
                  {labels.title}
                </Typography>
                <IconButton onClick={closeModal} size="small" sx={{ color: 'text.primary' }}>
                  <CancelOutlinedIcon />
                </IconButton>
              </Box>
            </Container>
          </Box>

          {submitted ? (
            <>
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
                      sx={(theme) => ({
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.success.main, 0.2),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      })}
                    >
                      <CheckCircleOutlineOutlinedIcon sx={{ color: 'success.main' }} />
                    </Box>
                    <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
                      {labels.successDescription}
                    </Typography>
                  </Box>
                </Container>
              </Box>

              <Box sx={{ py: 2 }}>
                <Container>
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
                    {labels.acknowledge}
                  </Button>
                </Container>
              </Box>
            </>
          ) : (
            <Box sx={{ py: 2 }}>
              <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                      {labels.balanceLabel}
                    </Typography>
                    <Typography sx={{ fontSize: 24, fontWeight: 700, color: 'text.primary' }}>
                      {balanceText}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
                      {labels.selectAmountLabel}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {presets.map((preset) => {
                        const isSelected = selectedPreset === preset.value;

                        return (
                          <Box
                            key={preset.value}
                            component="button"
                            type="button"
                            onClick={() => handlePresetSelect(preset.value)}
                            sx={{
                              width: 108,
                              height: 40,
                              borderRadius: '8px',
                              border: 1,
                              borderColor: isSelected ? 'secondary.main' : 'divider',
                              backgroundColor: isSelected ? 'secondary.main' : 'transparent',
                              color: isSelected ? 'common.white' : 'text.primary',
                              cursor: 'pointer',
                              font: 'inherit',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              px: 0.5,
                              textAlign: 'center',
                              lineHeight: 1.2,
                              fontSize: 12,
                            }}
                          >
                            {preset.label}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
                      {labels.customAmountLabel}
                    </Typography>
                    <NumberInput
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder={labels.customAmountPlaceholder}
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        },
                        '& .MuiOutlinedInput-input': {
                          textAlign: 'right',
                        },
                        '& .MuiOutlinedInput-input::placeholder': {
                          textAlign: 'right',
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>

                  <Divider />

                  <Button
                    fullWidth
                    radius="md"
                    onClick={handleSubmit}
                    disabled={!canSubmit || submitting}
                    sx={{
                      backgroundColor: 'secondary.main',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    {submitting ? (
                      <CircularProgress size={18} sx={{ color: 'common.white' }} />
                    ) : (
                      labels.submit
                    )}
                  </Button>
                </Box>
              </Container>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
