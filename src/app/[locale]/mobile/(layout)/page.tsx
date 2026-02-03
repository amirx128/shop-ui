import { getTranslations } from 'next-intl/server';
import Header from '@/components/features/header';
import HomeContainer from '@/components/pages/home/HomeContainer';

export async function generateMetadata() {
  const t = await getTranslations('home');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

const MainPage = () => {
  return (
    <div className="pb-18! relative!">
      <Header mode="secondary" />
      <HomeContainer />
    </div>
  );
};

export default MainPage;
