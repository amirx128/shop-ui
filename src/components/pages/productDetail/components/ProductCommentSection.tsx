'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Container, Typography, Divider, Modal } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CommentCard from './CommentCard';
import CommentScores from './CommentScores';
import TextAreaInput from '@/components/ui/TextAreaInput';
import ProductFullModal from './ProductFullModal';
import Button from '@/components/ui/Button';
import { useTheme } from '@mui/material/styles';
import {
  fetchProductComments,
  type ProductCommentDto,
} from '@/services/productComment.service';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ProductCommentSectionProps {
  translations: {
    reviews: string;
    rating: string;
    averageRating: string;
    reviewScores: string;
    submitReview: string;
    cancel: string;
    submit: string;
    pleaseRate: string;
    rateToHelp: string;
    writeComment: string;
    userName: string;
    commentText: string;
    loadingComments: string;
    noComments: string;
  };
  productId: string;
}

export default function ProductCommentSection({
  translations,
  productId,
}: ProductCommentSectionProps) {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comments, setComments] = useState<ProductCommentDto[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const {
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  useEffect(() => {
    let isMounted = true;
    setIsLoadingComments(true);
    fetchProductComments(productId)
      .then((data) => {
        if (!isMounted) {
          return;
        }
        setComments(data);
        setCommentsError(null);
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        setComments([]);
        setCommentsError(error.message);
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }
        setIsLoadingComments(false);
      });
    return () => {
      isMounted = false;
    };
  }, [productId]);

  const comment = watch('comment');


  const isFormValid = selectedRating > 0 && comment.length >= 10;

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmitReview = () => {
    reset();
    setSelectedRating(0);
    setIsReviewModalOpen(false);
    setIsModalOpen(false);
  };

  const handleCancelReview = () => {
    reset();
    setSelectedRating(0);
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            py: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <ChatBubbleOutlineOutlinedIcon />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {translations.reviews}
              </Typography>
            </Box>

            <ChevronLeftOutlinedIcon
              onClick={() => setIsModalOpen(true)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              {translations.rating}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <StarOutlinedIcon
                sx={{
                  color: '#45d483',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {translations.averageRating}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              pb: 1,
              gap: 2,
            }}
          >
            {isLoadingComments ? (
              <Typography variant="body2" color="text.secondary">
                {translations.loadingComments}
              </Typography>
            ) : commentsError ? (
              <Typography variant="body2" color="error">
                {commentsError}
              </Typography>
            ) : comments.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {translations.noComments}
              </Typography>
            ) : (
              comments.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    flexShrink: 0,
                  }}
                >
                  <CommentCard
                    userName={item.displayName || translations.userName}
                    comment={item.message || translations.commentText}
                    avatar={item.avatarUrl ?? '/images/product/avatar.png'}
                  />
                </Box>
              ))
            )}
          </Box>

          <Divider />
        </Box>
      </Container>

      <ProductFullModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={translations.reviews}
        footer={
          <Button
            fullWidth
            variant="solid"
            onClick={() => setIsReviewModalOpen(true)}
          >
            {translations.submitReview}
          </Button>
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CommentScores translations={translations} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {isLoadingComments ? (
              <Typography variant="body2" color="text.secondary">
                {translations.loadingComments}
              </Typography>
            ) : commentsError ? (
              <Typography variant="body2" color="error">
                {commentsError}
              </Typography>
            ) : comments.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {translations.noComments}
              </Typography>
            ) : (
              comments.map((item) => (
                <CommentCard
                  key={item.id}
                  userName={item.displayName || translations.userName}
                  comment={item.message || translations.commentText}
                  avatar={item.avatarUrl ?? '/images/product/avatar.png'}
                  fullWidth
                />
              ))
            )}
          </Box>
        </Box>
      </ProductFullModal>

      <Modal
        open={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxHeight: '50vh',
            backgroundColor: 'background.default',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              padding: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {translations.pleaseRate}
              </Typography>

              <HighlightOffOutlinedIcon
                onClick={handleCancelReview}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
              }}
            >
              {translations.rateToHelp}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              {[...Array(5)].map((_, index) => {
                const rating = index + 1;
                const isFilled = rating <= (hoveredRating || selectedRating);

                return (
                  <Box
                    key={index}
                    onMouseEnter={() => handleStarHover(rating)}
                    onMouseLeave={handleStarLeave}
                    onClick={() => handleStarClick(rating)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {isFilled ? (
                      <StarOutlinedIcon
                        sx={{
                          fontSize: 32,
                          color: '#f5a524',
                        }}
                      />
                    ) : (
                      <StarBorderOutlinedIcon
                        sx={{
                          fontSize: 32,
                          color: '#f5a524',
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>

            <TextAreaInput
              value={comment}
              onChange={(value) => {
                // This would be handled by react-hook-form in a real implementation
              }}
              placeholder={translations.writeComment}
              error={!!errors.comment}
              helperText={errors.comment?.message}
            />

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="solid"
                onClick={handleSubmitReview}
                disabled={!isFormValid}
                sx={{ flex: 1 }}
              >
                {translations.submit}
              </Button>

              <Button
                variant="outline"
                onClick={handleCancelReview}
                sx={{ flex: 1 }}
              >
                {translations.cancel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
