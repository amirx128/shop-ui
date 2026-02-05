import { getTranslations } from 'next-intl/server';
import CheckoutContainer from '@/components/pages/checkout/CheckoutContainer';

export const dynamic = 'force-dynamic';

interface CheckoutPageProps {
  searchParams?: Promise<{
    step?: string | string[];
  }>;
}

export async function generateMetadata() {
  const t = await getTranslations('checkout');
  const title = t('metadata.title');
  return {
    title,
    description: title,
  };
}

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const stepParam = Array.isArray(resolvedParams?.step)
    ? resolvedParams?.step[0]
    : resolvedParams?.step;
  const parsedStep = Number(stepParam);
  const step =
    Number.isInteger(parsedStep) && parsedStep >= 1 && parsedStep <= 3
      ? parsedStep
      : 1;

  return <CheckoutContainer step={step} />;
}
