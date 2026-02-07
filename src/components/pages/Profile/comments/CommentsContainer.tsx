import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import CommentsHeader from './components/CommentsHeader';
import CommentsList from './components/CommentsList';
import type { CommentItem, CommentStatus, CommentStatusLabels } from './types/comments';
import { ROUTES } from '@/lib/routes';

interface RawComment {
  id: string;
  status: CommentStatus;
  rating: number;
  dateFa: string;
  dateEn: string;
  commentFa: string;
  commentEn: string;
}

export default async function CommentsContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const isFaLocale = locale.startsWith('fa');
  const userName = isFaLocale ? 'باران اکببری' : 'Baran Akbari';
  const avatarAlt = isFaLocale ? 'آواتار کاربر' : 'User avatar';

  const statusLabels: CommentStatusLabels = isFaLocale
    ? {
      approved: 'تایید شده',
      rejected: 'تایید نشده',
      pending: 'در حال بررسی',
    }
    : {
      approved: 'Approved',
      rejected: 'Not approved',
      pending: 'Under review',
    };

  const rawComments: RawComment[] = [
    {
      id: 'profile-comment-1',
      status: 'approved',
      rating: 5,
      dateFa: '۵ مهر ۱۴۰۴',
      dateEn: 'Sep 27, 2025',
      commentFa:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است و برای نمایش تجربه خرید این بخش نوشته شده است.',
      commentEn:
        'Lorem ipsum is placeholder text used to present a sample customer comment for this screen.',
    },
    {
      id: 'profile-comment-2',
      status: 'pending',
      rating: 4,
      dateFa: '۷ مهر ۱۴۰۴',
      dateEn: 'Sep 29, 2025',
      commentFa:
        'لورم ایپسوم متن ساختگی با هدف نمایش ساختار دیدگاه کاربر در این کارت استفاده شده است تا فرم کلی مشخص باشد.',
      commentEn:
        'Lorem ipsum placeholder text is used to show the pending review state in this card.',
    },
    {
      id: 'profile-comment-3',
      status: 'rejected',
      rating: 3,
      dateFa: '۹ مهر ۱۴۰۴',
      dateEn: 'Oct 1, 2025',
      commentFa:
        'لورم ایپسوم متن ساختگی جهت پر کردن فضای توضیحات کامنت قرار گرفته تا نمای نهایی صفحه بهتر دیده شود.',
      commentEn:
        'Lorem ipsum sample content fills the review body so the final layout is visible.',
    },
    {
      id: 'profile-comment-4',
      status: 'approved',
      rating: 5,
      dateFa: '۱۱ مهر ۱۴۰۴',
      dateEn: 'Oct 3, 2025',
      commentFa:
        'لورم ایپسوم متن ساختگی است و در این نمونه صرفا برای نمایش طول مناسب نظر کاربر در رابط استفاده می شود.',
      commentEn:
        'Lorem ipsum text appears here only to represent a realistic approved comment length.',
    },
    {
      id: 'profile-comment-5',
      status: 'pending',
      rating: 4,
      dateFa: '۱۳ مهر ۱۴۰۴',
      dateEn: 'Oct 5, 2025',
      commentFa:
        'لورم ایپسوم به عنوان متن نمونه درج شده تا وضعیت در حال بررسی همراه با محتوای نظر به خوبی نمایش داده شود.',
      commentEn:
        'Lorem ipsum text is included to display the under-review state together with comment content.',
    },
    {
      id: 'profile-comment-6',
      status: 'rejected',
      rating: 2,
      dateFa: '۱۵ مهر ۱۴۰۴',
      dateEn: 'Oct 7, 2025',
      commentFa:
        'لورم ایپسوم متن آزمایشی برای این کارت است و صرفا نقش پرکننده جهت تست چیدمان محتوای دیدگاه را دارد.',
      commentEn:
        'Lorem ipsum is test content used to validate spacing and composition in this rejected card.',
    },
    {
      id: 'profile-comment-7',
      status: 'approved',
      rating: 5,
      dateFa: '۱۷ مهر ۱۴۰۴',
      dateEn: 'Oct 9, 2025',
      commentFa:
        'لورم ایپسوم متن ساختگی چاپ و حروفچینی است و اینجا به عنوان نمونه دیدگاه مثبت کاربر قرار گرفته است.',
      commentEn:
        'Lorem ipsum text is placed here as a positive sample comment for the approved state.',
    },
    {
      id: 'profile-comment-8',
      status: 'pending',
      rating: 4,
      dateFa: '۱۹ مهر ۱۴۰۴',
      dateEn: 'Oct 11, 2025',
      commentFa:
        'لورم ایپسوم متنی برای پر کردن جای توضیحات این کارت است تا رندر وضعیت بررسی در لیست کامل دیده شود.',
      commentEn:
        'Lorem ipsum placeholder fills this card so the pending status rendering is visible in list view.',
    },
    {
      id: 'profile-comment-9',
      status: 'rejected',
      rating: 3,
      dateFa: '۲۱ مهر ۱۴۰۴',
      dateEn: 'Oct 13, 2025',
      commentFa:
        'لورم ایپسوم به صورت نمونه درج شده تا سبک نمایش متن، تاریخ و وضعیت رد شده در این کارت مشخص باشد.',
      commentEn:
        'Lorem ipsum content demonstrates the rejected status with date and body text in one card.',
    },
    {
      id: 'profile-comment-10',
      status: 'approved',
      rating: 5,
      dateFa: '۲۳ مهر ۱۴۰۴',
      dateEn: 'Oct 15, 2025',
      commentFa:
        'لورم ایپسوم متن ساختگی برای طراحی صفحه است و با هدف نمایش حالت نهایی لیست نظرات استفاده شده است.',
      commentEn:
        'Lorem ipsum placeholder is used to present the final card style of the comments list.',
    },
  ];

  const comments: CommentItem[] = rawComments.map((item) => ({
    id: item.id,
    userName,
    avatarSrc: '/images/home/tempAvatar.jpg',
    avatarAlt,
    rating: item.rating,
    status: item.status,
    date: isFaLocale ? item.dateFa : item.dateEn,
    comment: isFaLocale ? item.commentFa : item.commentEn,
  }));

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <CommentsHeader title={t('items.comments')} backHref={ROUTES.profile.BASE} />

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <Container sx={{ py: 2 }}>
          <CommentsList comments={comments} statusLabels={statusLabels} />
        </Container>
      </Box>
    </Box>
  );
}

