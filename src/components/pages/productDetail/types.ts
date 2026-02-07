import { DefaultSkuInfo } from '@/types/defaultSku';

export interface ProductColorInfo {
  id: string;
  name: string;
  colorCode: string;
}

export interface ProductPropertyValueEntry {
  id: string;
  title: string;
}

export interface ProductPropertyEntry {
  id: string;
  title: string;
  sortOrder: number;
  values: ProductPropertyValueEntry[];
}

export interface ProductDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightGrams: number;
}

export interface ProductPricing {
  salePriceRial: number;
  discountPercent: number;
  discountAmountRial: number;
  finalPriceRial: number;
  changedAtUtc: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  isMain: boolean;
  alt: string;
  caption: string;
  titleAttribute: string;
  structuredData: string;
  surroundingText: string;
}

export interface ProductDetailsDto {
  id: string;
  name: string;
  slug: string;
  priceRial: number;
  pricing?: ProductPricing | null;
  categoryId: string;
  description: string;
  usageGuide: string;
  brand: string;
  genderId: string;
  colorIds: string[];
  ageRangeIds: string[];
  properties: ProductPropertyEntry[];
  unitOfMeasure: string;
  dimensions?: ProductDimensions | null;
  lowStockWarningThreshold: number;
  lowStockMessageThreshold: number;
  similarProductIds: string[];
  complementaryProductIds: string[];
  similarProducts: ProductRelationSummary[];
  complementaryProducts: ProductRelationSummary[];
  isFeaturedTop: boolean;
  isFeaturedBottom: boolean;
  featuredImageUrl?: string | null;
  mainImageUrl?: string | null;
  images: ProductImage[];
  defaultSku?: DefaultSkuInfo | null;
  colors: ProductColorInfo[];
}

export interface ProductRelationSummary {
  id: string;
  slug: string;
  name: string;
  priceRial: number;
  categoryName: string;
  mainImageUrl?: string | null;
  colorCodes: string[];
  unitOfMeasure?: string;
  defaultSku?: DefaultSkuInfo | null;
}

export interface CategorySummaryDto {
  id: string;
  name: string;
  parentId?: string | null;
  isFinal: boolean;
}

export interface CategoryFilterResponse {
  filters: CategoryPropertyFilterDto[];
  categories: CategorySummaryDto[];
}

export interface CategoryPropertyFilterDto {
  id: string;
  title: string;
  usageCount: number;
  sortOrderWeight: number;
  values: CategoryPropertyFilterValueDto[];
}

export interface CategoryPropertyFilterValueDto {
  id: string;
  title: string;
  usageCount: number;
}

export interface ProductVariableSelection {
  colorId?: string;
  ageRangeId?: string;
  propertyValueIds: string[];
}
