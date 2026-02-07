export type CommentStatus = 'approved' | 'rejected' | 'pending';

export interface CommentStatusLabels {
  approved: string;
  rejected: string;
  pending: string;
}

export interface CommentItem {
  id: string;
  userName: string;
  avatarSrc: string;
  avatarAlt: string;
  rating: number;
  status: CommentStatus;
  date: string;
  comment: string;
}

