import { getTranslations, getLocale } from 'next-intl/server';
import ProductDetailHeader from './components/ProductDetailHeader';
import ProductDetailFooter from './components/ProductDetailFooter';
import ProductGallery from './components/ProductGallery';
import ProductTitleSection from './components/ProductTitleSection';
import ProductVariableSection from './components/ProductVariableSection';
import ProductDescriptionSection from './components/ProductDescriptionSection';
import ProductFeatureSection from './components/ProductFeatureSection';
import ProductCommentSection from './components/ProductCommentSection';
import { Box, Container } from '@mui/material';
import ProductGudeSection from './components/ProductGudeSection';
import SimilarProductSection from './components/SimilarProductSection';
import SuggestionProductSection from './components/SuggestionProductSection';

export default async function ProductDetailContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('product'),
  ]);

  const translations = {
    addToCart: t('addToCart'),
    shareSuccess: t('shareSuccess'),
    shareError: t('shareError'),
    copySuccess: t('copySuccess'),
    copyError: t('copyError'),
    color: t('color'),
    pattern: t('pattern'),
    black: t('black'),
    gray: t('gray'),
    pink: t('pink'),
    orange: t('orange'),
    catPattern: t('catPattern'),
    carPattern: t('carPattern'),
    productDescription: t('productDescription'),
    descriptionTitle: t('descriptionTitle'),
    descriptionText: t('descriptionText'),
    fullDescriptionTitle: t('fullDescriptionTitle'),
    fullDescriptionText: t('fullDescriptionText'),
    productFeatures: t('productFeatures'),
    material: t('material'),
    ageGroup: t('ageGroup'),
    quality: t('quality'),
    colorFeature: t('colorFeature'),
    materialValue: t('materialValue'),
    colorValue: t('colorValue'),
    genderValue: t('genderValue'),
    ageGroupValue: t('ageGroupValue'),
    gender: t('gender'),
    reviews: t('reviews'),
    rating: t('rating'),
    averageRating: t('averageRating'),
    reviewScores: t('reviewScores'),
    submitReview: t('submitReview'),
    cancel: t('cancel'),
    submit: t('submit'),
    pleaseRate: t('pleaseRate'),
    rateToHelp: t('rateToHelp'),
    writeComment: t('writeComment'),
    userName: t('userName'),
    commentText: t('commentText'),
  };

  const productName = 'لوازم خواب کودک / تخت نوزاد چوبی مدل رویا';
  const productCategory = 'تخت و گهواره';
  const price = 4500000;
  const productImages = [
    '/images/product/1.png',
    '/images/product/2.png',
    '/images/product/3.jpg',
    '/images/product/4.png',
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <ProductDetailHeader productName={productName} />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '80px',
        }}
      >
        <ProductGallery images={productImages} />

        <ProductTitleSection
          category={productCategory}
          productName={productName}
          toastTranslations={{
            shareSuccess: translations.shareSuccess,
            shareError: translations.shareError,
            copySuccess: translations.copySuccess,
            copyError: translations.copyError,
          }}
        />

        <ProductVariableSection
          translations={{
            color: translations.color,
            pattern: translations.pattern,
            black: translations.black,
            gray: translations.gray,
            pink: translations.pink,
            orange: translations.orange,
            catPattern: translations.catPattern,
            carPattern: translations.carPattern,
          }}
        />

        <ProductDescriptionSection
          translations={{
            productDescription: translations.productDescription,
            descriptionTitle: translations.descriptionTitle,
            descriptionText: translations.descriptionText,
            fullDescriptionTitle: translations.fullDescriptionTitle,
            fullDescriptionText: translations.fullDescriptionText,
          }}
        />

        <ProductFeatureSection
          translations={{
            productFeatures: translations.productFeatures,
            material: translations.material,
            ageGroup: translations.ageGroup,
            quality: translations.quality,
            colorFeature: translations.colorFeature,
            materialValue: translations.materialValue,
            colorValue: translations.colorValue,
            genderValue: translations.genderValue,
            ageGroupValue: translations.ageGroupValue,
            gender: translations.gender,
          }}
        />

        <ProductCommentSection
          translations={{
            reviews: translations.reviews,
            rating: translations.rating,
            averageRating: translations.averageRating,
            reviewScores: translations.reviewScores,
            submitReview: translations.submitReview,
            cancel: translations.cancel,
            submit: translations.submit,
            pleaseRate: translations.pleaseRate,
            rateToHelp: translations.rateToHelp,
            writeComment: translations.writeComment,
            userName: translations.userName,
            commentText: translations.commentText,
          }}
        />
        <ProductGudeSection />
        <SimilarProductSection addToCartText={translations.addToCart} />
        <SuggestionProductSection addToCartText={translations.addToCart} />
      </Box>

      <ProductDetailFooter
        price={price}
        addToCartText={translations.addToCart}
      />
    </Box>
  );
}
