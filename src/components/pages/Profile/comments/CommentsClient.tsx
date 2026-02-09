'use client';

import { Typography } from '@mui/material';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import CommentsList from './components/CommentsList';
import type { CommentItem, CommentStatusLabels } from './types/comments';
import {
  CustomerProductCommentDto,
  fetchCustomerComments,
} from '@/services/customerCommentsService';

interface CommentsClientProps {
  statusLabels: CommentStatusLabels;
}

const DEFAULT_AVATAR = '/images/home/tempAvatar.jpg';
const DEFAULT_PRODUCT_IMAGE = '/images/tempproduct.png';

export default function CommentsClient({ statusLabels }: CommentsClientProps) {
  const locale = useLocale();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCustomerComments();
        if (cancelled) {
          return;
        }

        setComments(data.map((item) => mapToCommentItem(item, locale)));
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(err);
        setError(
          locale.startsWith('fa')
            ? 'بارگذاری دیدگاه‌ها با خطا مواجه شد.'
            : 'Unable to load comments.'
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadComments();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (isLoading) {
    return (
      <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
        {locale.startsWith('fa') ? 'در حال بارگذاری نظرات...' : 'Loading comments...'}
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography sx={{ fontSize: 14, color: 'error.main' }}>
        {error}
      </Typography>
    );
  }

  if (comments.length === 0) {
    return (
      <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
        {locale.startsWith('fa') ? 'هنوز نظری ثبت نشده است.' : 'No comments yet.'}
      </Typography>
    );
  }

  return <CommentsList comments={comments} statusLabels={statusLabels} />;
}

function mapToCommentItem(raw: CustomerProductCommentDto, locale: string): CommentItem {
  const createdAt = new Date(raw.createdAtUtc);
  const formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(createdAt);
  const priceLabel = formatPrice(raw.product.priceRial, locale);

  return {
    id: raw.id,
    userName: raw.displayName || (locale.startsWith('fa') ? 'کاربر' : 'Customer'),
    avatarSrc: raw.avatarUrl ?? DEFAULT_AVATAR,
    avatarAlt: raw.displayName ?? (locale.startsWith('fa') ? 'آواتار کاربر' : 'User avatar'),
    status: raw.status,
    date: formattedDate,
    comment: raw.message,
    productName: raw.product.name,
    productImage: raw.product.mainImageUrl ?? DEFAULT_PRODUCT_IMAGE,
    productPrice: priceLabel,
  };
}

function formatPrice(value: number, locale: string): string {
  const suffix = locale.startsWith('fa') ? 'ریال' : 'IRR';
  const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  return `${formatter.format(value)} ${suffix}`;
}
