import { getLocale, getTranslations } from 'next-intl/server';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import TopSellingSectionClient from './components/TopSellingSectionClient';
import FeatureSection from './components/FeatureSection';
import DiscountSectionClient from './components/DiscountSectionClient';
import SlidersSection from './components/SlidersSection';
import FavoriteBrandsSectionClient from './components/FavoriteBrandsSectionClient';
import BlogSectionClient from './components/BlogSectionClient';
import TestimonialsSectionClient from './components/TestimonialsSectionClient';
import FooterSection from './components/FooterSection';
import { ROUTES } from '@/lib/routes';

export default async function HomeContainer() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('home')]);

  const heroTranslations = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    cta: t('hero.cta'),
    imageAlt: t('hero.imageAlt'),
  };

  const categoryTranslations = {
    transport: t('categories.transport'),
    hygiene: t('categories.hygiene'),
    stationery: t('categories.stationery'),
    clothing: t('categories.clothing'),
    room: t('categories.room'),
    toys: t('categories.toys'),
  };

  const topSellingTranslations = {
    title: t('topSelling.title'),
    subtitle: t('topSelling.subtitle'),
    tabs: {
      all: t('topSelling.tabs.all'),
      newest: t('topSelling.tabs.newest'),
      bestSelling: t('topSelling.tabs.bestSelling'),
      discounted: t('topSelling.tabs.discounted'),
    },
    viewMore: t('topSelling.viewMore'),
    addToCart: t('topSelling.addToCart'),
  };

  const topSellingCategory = t('topSelling.productCategory');
  const topSellingName = t('topSelling.productName');

  const topSellingProducts = Array.from({ length: 10 }, (_, index) => ({
    id: `top-selling-${index + 1}`,
    image: '/tempproduct.png',
    colors: ['#52525B', '#898BFA', '#FF4C8B', '#E16203', '#27272A'],
    category: topSellingCategory,
    name: topSellingName,
    price: 1000000,
    originalPrice: 1850000,
  }));

  const featureTranslations = {
    organizations: {
      title: t('features.organizations.title'),
      subtitle: t('features.organizations.subtitle'),
    },
    support: {
      title: t('features.support.title'),
      subtitle: t('features.support.subtitle'),
    },
    authenticity: {
      title: t('features.authenticity.title'),
      subtitle: t('features.authenticity.subtitle'),
    },
    pricing: {
      title: t('features.pricing.title'),
      subtitle: t('features.pricing.subtitle'),
    },
  };

  const discountTranslations = {
    badge: t('discount.badge'),
    titlePrimary: t('discount.title.primary'),
    titleAccent: t('discount.title.accent'),
    description: t('discount.description'),
    timer: {
      days: t('discount.timer.days'),
      hours: t('discount.timer.hours'),
      minutes: t('discount.timer.minutes'),
      seconds: t('discount.timer.seconds'),
    },
    imageAlt: t('discount.imageAlt'),
    viewAll: t('discount.viewAll'),
  };

  const sliderTranslations = {
    subtitle: t('sliders.subtitle'),
    cta: t('sliders.cta'),
    slides: {
      slide1: {
        title: t('sliders.slide1.title'),
      },
      slide2: {
        title: t('sliders.slide2.title'),
      },
      slide3: {
        title: t('sliders.slide3.title'),
      },
    },
  };

  const favoriteBrandsTranslations = {
    title: t('favoriteBrands.title'),
    subtitle: t('favoriteBrands.subtitle'),
    brands: t.raw('favoriteBrands.brands') as string[],
  };

  const blogTranslations = {
    title: t('blog.title'),
    subtitle: t('blog.subtitle'),
    tag: t('blog.tag'),
    timeAgo: t('blog.timeAgo'),
    cardTitle: t('blog.cardTitle'),
    cardDescription: t('blog.cardDescription'),
    cardCta: t('blog.cardCta'),
    viewAll: t('blog.viewAll'),
  };

  const blogPosts = Array.from({ length: 4 }, (_, index) => ({
    id: `blog-${index + 1}`,
    image: '/tempProduct.png',
    tag: blogTranslations.tag,
    timeAgo: blogTranslations.timeAgo,
    title: blogTranslations.cardTitle,
    description: blogTranslations.cardDescription,
  }));

  const testimonialsTranslations = {
    title: t('testimonials.title'),
    subtitle: t('testimonials.subtitle'),
    userName: t('testimonials.userName'),
    comment: t('testimonials.comment'),
  };

  const testimonials = Array.from({ length: 10 }, (_, index) => ({
    id: `testimonial-${index + 1}`,
    name: testimonialsTranslations.userName,
    comment: testimonialsTranslations.comment,
    avatar: '/images/home/tempAvatar.jpg',
  }));

  const footerTranslations = {
    logoAlt: t('footer.logoAlt'),
    description: t('footer.description'),
    quickAccessTitle: t('footer.quickAccess.title'),
    quickAccessLinks: t.raw('footer.quickAccess.links') as string[],
    customerServicesTitle: t('footer.customerServices.title'),
    customerServicesLinks: t.raw('footer.customerServices.links') as string[],
    contactTitle: t('footer.contact.title'),
    phoneNumbers: t.raw('footer.contact.phoneNumbers') as {
      display: string;
      value: string;
    }[],
    email: t('footer.contact.email'),
    address: t('footer.contact.address'),
    copyrightText: t('footer.copyright.text'),
    brandName: t('footer.copyright.brandName'),
    copyrightSuffix: t('footer.copyright.suffix'),
  };

  const shopHref = `/${locale}/mobile${ROUTES.SHOP}`;

  return (
    <div>
      <HeroSection translations={heroTranslations} shopHref={shopHref} />
      <CategorySection translations={categoryTranslations} />
      <TopSellingSectionClient
        translations={topSellingTranslations}
        products={topSellingProducts}
      />
      <FeatureSection translations={featureTranslations} />
      <DiscountSectionClient
        translations={discountTranslations}
        locale={locale}
        initialSeconds={30 * 24 * 60 * 60}
      />
      <SlidersSection translations={sliderTranslations} />
      <FavoriteBrandsSectionClient translations={favoriteBrandsTranslations} />
      <BlogSectionClient translations={blogTranslations} posts={blogPosts} />
      <TestimonialsSectionClient
        translations={testimonialsTranslations}
        testimonials={testimonials}
      />
      <FooterSection translations={footerTranslations} />
    </div>
  );
}
