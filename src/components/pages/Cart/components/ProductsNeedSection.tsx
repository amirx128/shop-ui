'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { toast } from 'react-toastify';
import ProductCard from '@/components/ui/ProductCard';
import Title from '@/components/ui/Title';
import {
  addProductToCartWithDefaultSku,
  checkoutCart,
  fetchCartComplementaryProducts,
} from '@/services/cartService';

const FALLBACK_PRODUCT_IMAGE = '/images/tempproduct.png';

interface ProductsNeedSectionProps {
  title: string;
  addToCartText: string;
}

type RecommendedProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  colors: string[];
};

export default function ProductsNeedSection({
  title,
  addToCartText,
}: ProductsNeedSectionProps) {
  const [processingProductId, setProcessingProductId] = useState<string | null>(
    null
  );
  const [products, setProducts] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCartComplementaryProducts();
        if (!isActive) {
          return;
        }

        const mapped = data.map((item) => {
          const colors = (item.colorCodes ?? []).filter(Boolean);
          return {
            id: item.productId,
            name: item.name,
            category: item.categoryName ?? 'کالا',
            price: item.priceRial,
            image: item.imageUrl ?? FALLBACK_PRODUCT_IMAGE,
            colors: colors.length > 0 ? colors : ['#E5E7EB', '#CBD5F5'],
          };
        });

        setProducts(mapped);
      } catch (err) {
        if (!isActive) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : 'خطا در بارگذاری کالاهای پیشنهادی.'
        );
        setProducts([]);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const handleAddToCart = async (product: RecommendedProduct) => {
    setProcessingProductId(product.id);
    try {
      await addProductToCartWithDefaultSku({
        productId: product.id,
        quantity: 1,
        unitOfMeasure: 'unit',
        unitPrice: product.price,
        discountPerUnit: 0,
        rowPrice: product.price,
      });
      await checkoutCart();
      toast.success(`${product.name} به سبد اضافه شد.`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'خطا در افزودن کالا به سبد خرید.'
      );
    } finally {
      setProcessingProductId((current) =>
        current === product.id ? null : current
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 3,
      }}
    >
      <Title text={title} />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography align="center" color="error">
          {error}
        </Typography>
      ) : products.length === 0 ? (
        <Typography align="center" color="text.secondary">
          کالایی برای نمایش وجود ندارد.
        </Typography>
      ) : (
        <Swiper slidesPerView="auto" spaceBetween={16} style={{ width: '100%' }}>
          {products.map((product) => (
            <SwiperSlide key={product.id} style={{ width: 260 }}>
              <ProductCard
                image={product.image}
                colors={product.colors}
                category={product.category}
                name={product.name}
                price={product.price}
                addToCartText={addToCartText}
                size="md"
                productId={product.id}
                onAddToCart={() => handleAddToCart(product)}
                isAddToCartLoading={processingProductId === product.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
}
