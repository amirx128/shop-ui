'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import TextAreaInput from '@/components/ui/TextAreaInput';
import type { DeliveredReviewModalLabels } from '../types/orderDetail';

const reviewSchema = z.object({
  rating: z.number().min(1),
  comment: z.string().trim().min(1),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface DeliveredOrderReviewActionProps {
  labels: DeliveredReviewModalLabels;
}

export default function DeliveredOrderReviewAction({
  labels,
}: DeliveredOrderReviewActionProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
    mode: 'onChange',
  });

  const selectedRating = watch('rating');

  const closeModal = () => {
    setOpen(false);
    setSubmitting(false);
    setSubmitted(false);
    reset();
  };

  const openModal = () => {
    setOpen(true);
    setSubmitting(false);
    setSubmitted(false);
    reset();
  };

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <Button
        variant="bordered"
        radius="md"
        fullWidth
        onClick={openModal}
        sx={{
          color: 'secondary.main',
          borderColor: 'secondary.main',
        }}
      >
        {labels.action}
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
                  {submitted ? labels.successTitle : labels.rateTitle}
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
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                >
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                    {labels.rateDescription}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const isFilled = rating <= selectedRating;

                      return (
                        <Box
                          key={rating}
                          component="button"
                          type="button"
                          onClick={() =>
                            setValue('rating', rating, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            })
                          }
                          sx={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: 'text.primary',
                            p: 0,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {isFilled ? (
                            <StarOutlinedIcon
                              sx={{ fontSize: 40, color: 'secondary.main' }}
                            />
                          ) : (
                            <StarBorderOutlinedIcon
                              sx={{ fontSize: 40, color: 'text.primary' }}
                            />
                          )}
                        </Box>
                      );
                    })}
                  </Box>

                  <Controller
                    control={control}
                    name="comment"
                    render={({ field, fieldState }) => (
                      <TextAreaInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={labels.commentPlaceholder}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />

                  <Box sx={{ display: 'flex', gap: '4px' }}>
                    <Button
                      fullWidth
                      radius="md"
                      onClick={handleSubmit(onSubmit)}
                      disabled={!isValid || submitting}
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
                      {labels.cancel}
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
