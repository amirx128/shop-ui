import { getTranslations, getLocale } from 'next-intl/server';
import ShopContainerClient from './components/ShopContainerClient';

export default async function ShopContainer() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('shop')]);

  const translations = {
    filter: t('filter'),
    mostDiscounted: t('mostDiscounted'),
    mostViewed: t('mostViewed'),
    newest: t('newest'),
    bestSelling: t('bestSelling'),
    cheapest: t('cheapest'),
    mostExpensive: t('mostExpensive'),
    addToCart: t('addToCart'),
    viewProducts: t('viewProducts'),
    clearFilters: t('clearFilters'),
    from: t('from'),
    to: t('to'),
    currency: t('currency'),
    cheapestPrice: t('cheapestPrice'),
    mostExpensivePrice: t('mostExpensivePrice'),
  };

  return <ShopContainerClient translations={translations} locale={locale} />;
}
