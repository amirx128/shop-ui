import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { CommentItem, CommentStatusLabels } from '../types/comments';

interface ComponentCardProps {
  comment: CommentItem;
  statusLabels: CommentStatusLabels;
}

type StatusPresentation = {
  label: string;
  icon: typeof CheckCircleOutlineOutlinedIcon;
  color: 'success.main' | 'error.main' | 'warning.main';
  borderColor: string;
  backgroundColor: string;
};

export default function ComponentCard({ comment, statusLabels }: ComponentCardProps) {
  const statusPresentation: StatusPresentation =
    comment.status === 'approved'
      ? {
        label: statusLabels.approved,
        icon: CheckCircleOutlineOutlinedIcon,
        color: 'success.main',
        borderColor: 'rgba(46, 125, 50, 0.3)',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
      }
      : comment.status === 'rejected'
        ? {
          label: statusLabels.rejected,
          icon: CancelOutlinedIcon,
          color: 'error.main',
          borderColor: 'rgba(211, 47, 47, 0.3)',
          backgroundColor: 'rgba(211, 47, 47, 0.1)',
        }
        : {
          label: statusLabels.pending,
          icon: DonutLargeOutlinedIcon,
          color: 'warning.main',
          borderColor: 'rgba(237, 108, 2, 0.3)',
          backgroundColor: 'rgba(237, 108, 2, 0.1)',
        };

  const StatusIcon = statusPresentation.icon;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        p: 1.5,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 47,
              height: 47,
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <Image
              src={comment.avatarSrc}
              alt={comment.avatarAlt}
              fill
              sizes="47px"
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}>
              {comment.userName}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              {Array.from({ length: 5 }, (_, index) =>
                index < comment.rating ? (
                  <StarRoundedIcon
                    key={`${comment.id}-filled-star-${index + 1}`}
                    sx={{ fontSize: 16, color: '#F5A524' }}
                  />
                ) : (
                  <StarBorderRoundedIcon
                    key={`${comment.id}-empty-star-${index + 1}`}
                    sx={{ fontSize: 16, color: '#F5A524' }}
                  />
                ),
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.75 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: statusPresentation.borderColor,
              backgroundColor: statusPresentation.backgroundColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <StatusIcon sx={{ fontSize: 16, color: statusPresentation.color }} />
            <Typography
              sx={{
                fontSize: '10px !important',
                fontWeight: 500,
                color: statusPresentation.color,
                lineHeight: 1,
              }}
            >
              {statusPresentation.label}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{comment.date}</Typography>
        </Box>
      </Box>

      <Typography sx={{ fontSize: 14, lineHeight: 1.8, color: 'text.primary' }}>
        {comment.comment}
      </Typography>
    </Box>
  );
}
