import { Box } from '@mui/material';
import ComponentCard from './ComponentCard';
import type { CommentItem, CommentStatusLabels } from '../types/comments';

interface CommentsListProps {
  comments: CommentItem[];
  statusLabels: CommentStatusLabels;
}

export default function CommentsList({ comments, statusLabels }: CommentsListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {comments.map((comment) => (
        <ComponentCard
          key={comment.id}
          comment={comment}
          statusLabels={statusLabels}
        />
      ))}
    </Box>
  );
}

