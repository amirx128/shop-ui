'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ProductFullModal from './ProductFullModal';
import { getBaseCatalogUrl } from '@/lib/catalog';
import type { ProductDetailsDto } from '../types';

interface ProductDescriptionSectionProps {
  translations: {
    productDescription: string;
    descriptionTitle: string;
    descriptionText: string;
    fullDescriptionTitle: string;
    fullDescriptionText: string;
  };
  description: string;
  fullDescription?: string;
}

type DescriptionSegment =
  | { type: 'html'; content: string; key: string }
  | { type: 'products'; ids: string[]; key: string };

const PLACEHOLDER_PATTERN = /startOfProductInTextIds-([0-9a-fA-F-]+(?:,[0-9a-fA-F-]+)*)-endOfProductInTextIds/g;

const formatInlinePrice = (value?: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '—';
  }
  return `${value.toLocaleString('fa-IR')} تومان`;
};

type InlineProductGroupProps = {
  ids: string[];
  products: Record<string, ProductDetailsDto>;
};

function InlineProductGroup({ ids, products }: InlineProductGroupProps) {
  return (
    <Box className="product-in-text-inline-grid">
      {ids.map((id) => {
        const product = products[id];
        const imageUrl =
          product?.featuredImageUrl ||
          product?.mainImageUrl ||
          product?.images?.[0]?.url ||
          '/images/tempproduct.png';
        return (
          <Box key={id} className="product-in-text-inline-card">
            <Box className="product-in-text-inline-card-media">
              <img src={imageUrl} alt={product?.name ?? id} />
            </Box>
            <Box className="product-in-text-inline-card-body">
              <Typography variant="subtitle2" component="div">
                {product?.name ?? id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatInlinePrice(product?.priceRial)}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default function ProductDescriptionSection({
  translations,
  description,
  fullDescription,
}: ProductDescriptionSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inlineProducts, setInlineProducts] = useState<Record<string, ProductDetailsDto>>({});
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [isInlineLoading, setIsInlineLoading] = useState(false);

  const segments = useMemo<DescriptionSegment[]>(() => {
    if (!description) {
      return [
        {
          type: 'html',
          content: '',
          key: 'html-empty',
        },
      ];
    }
    const result: DescriptionSegment[] = [];
    const pattern = new RegExp(PLACEHOLDER_PATTERN);
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(description))) {
      if (match.index > lastIndex) {
        result.push({
          type: 'html',
          content: description.slice(lastIndex, match.index),
          key: `html-${lastIndex}`,
        });
      }
      const ids = match[1]
        .split(',')
        .map((value) => value.trim())
        .filter((value) => value.length);
      result.push({ type: 'products', ids, key: `products-${match.index}` });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < description.length) {
      result.push({
        type: 'html',
        content: description.slice(lastIndex),
        key: `html-${lastIndex}`,
      });
    }

    if (!result.length) {
      result.push({ type: 'html', content: description, key: 'html-full' });
    }

    return result;
  }, [description]);

  const inlineProductIds = useMemo(() => {
    const ids = new Set<string>();
    for (const segment of segments) {
      if (segment.type === 'products') {
        for (const id of segment.ids) {
          ids.add(id);
        }
      }
    }
    return Array.from(ids);
  }, [segments]);

  useEffect(() => {
    if (!inlineProductIds.length) {
      setInlineProducts({});
      setInlineError(null);
      setIsInlineLoading(false);
      return;
    }

    let isActive = true;
    setIsInlineLoading(true);
    setInlineError(null);
    const baseUrl = getBaseCatalogUrl();

    const loadProducts = async () => {
      const entries = await Promise.all(
        inlineProductIds.map(async (id) => {
          const response = await fetch(`${baseUrl}/api/catalog/products/${id}`, {
            cache: 'no-store',
          });
          if (!response.ok) {
            throw new Error(`Unable to load product ${id}`);
          }
          const product = (await response.json()) as ProductDetailsDto;
          return [id, product] as const;
        })
      );
      return Object.fromEntries(entries);
    };

    loadProducts()
      .then((loaded) => {
        if (!isActive) {
          return;
        }
        setInlineProducts(loaded);
      })
      .catch(() => {
        if (!isActive) {
          return;
        }
        setInlineProducts({});
        setInlineError('در بارگذاری کالاهای مرتبط مشکلی پیش آمد.');
      })
      .finally(() => {
        if (isActive) {
          setIsInlineLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [inlineProductIds]);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            py: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <ReceiptOutlinedIcon />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {translations.productDescription}
              </Typography>
            </Box>

            <ChevronLeftOutlinedIcon
              onClick={() => setIsModalOpen(true)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                mb: 1,
              }}
            >
              {translations.descriptionTitle}
            </Typography>

            {isInlineLoading ? (
              <Typography variant="body2" color="text.secondary">
                در حال بارگذاری کالاهای مرتبط...
              </Typography>
            ) : null}
            {inlineError ? (
              <Typography variant="body2" color="error">
                {inlineError}
              </Typography>
            ) : null}

            {segments.map((segment) =>
              segment.type === 'html' ? (
                <Box
                  key={segment.key}
                  component="div"
                  dangerouslySetInnerHTML={{ __html: segment.content }}
                  sx={{ lineHeight: 1.8, color: 'text.secondary', mt: 1 }}
                />
              ) : (
                <InlineProductGroup
                  key={segment.key}
                  ids={segment.ids}
                  products={inlineProducts}
                />
              )
            )}
          </Box>

          <Divider />
        </Box>
      </Container>

      <ProductFullModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={translations.productDescription}
        content={`${translations.fullDescriptionTitle}\n\n${fullDescription ?? description}`}
      />
    </>
  );
}
