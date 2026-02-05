import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';

  const isMobile =
    /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  const { locale } = await params;

  if (isMobile) {
    redirect(`/${locale}/mobile`);
  } else {
    redirect(`/${locale}/desktop`);
  }
}
