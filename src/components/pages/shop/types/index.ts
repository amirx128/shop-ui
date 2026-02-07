import { DefaultSkuInfo } from '@/types/defaultSku';

export interface ShopHeaderItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  disableHover?: boolean;
  onClick?: () => void;
}

export interface ShopHeaderProps {
  items: ShopHeaderItemProps[];
}

export interface ShopBodyProps {
  children: React.ReactNode;
}

export interface CategoryPropertyFilterValue {
  id: string;
  title: string;
  usageCount: number;
}

export interface CategoryPropertyFilter {
  id: string;
  title: string;
  usageCount: number;
  sortOrderWeight: number;
  values: CategoryPropertyFilterValue[];
}

export const COLOR_FILTER_ID = 'dbc8eba7-38f6-4807-1064-882150587ba6';
export const AGE_RANGE_FILTER_ID = '3e7ba19f-43c6-cc5d-5800-481f7aba8bc7';

export interface ProductPropertyFilterPayload {
  propertyId: string;
  valueIds: string[];
}

export interface SelectedFiltersPayload {
  colorIds: string[];
  ageRangeIds: string[];
  propertyFilters: ProductPropertyFilterPayload[];
}

export interface CatalogProductSummaryDto {
  id: string;
  name: string;
  slug: string;
  priceRial: number;
  mainImageUrl?: string | null;
  categoryId: string;
  unitOfMeasure?: string;
  usageGuide?: string;
  defaultSku?: DefaultSkuInfo | null;
}

export interface CategorySummary {
  id: string;
  name: string;
  parentId?: string | null;
  isFinal: boolean;
}
