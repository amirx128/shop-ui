export interface CartAddressDto {
  addressId?: string | null;
  provinceId: number;
  cityId: number;
  street: string;
  address: string;
  alley: string;
  plaque: string;
  unit: string;
  location?: string | null;
  title: string;
}

export interface ShoppingCartDetailItem {
  productId: string;
  skuId?: string | null;
  name?: string | null;
  slug?: string | null;
  imageUrl?: string | null;
  colorName?: string | null;
  colorHex: string;
  quantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  discountPerUnit: number;
  rowPrice: number;
  skus: { skuId: string; quantity: number }[];
}

export interface ShoppingCartDetail {
  cartId: string;
  customerId: string;
  cartCode?: string | null;
  customerAddress?: CartAddressDto | null;
  createdAtUtc: string;
  modifiedAtUtc?: string | null;
  isPaid: boolean;
  paidAtUtc?: string | null;
  itemsTotal: number;
  shippingAmount?: number | null;
  paymentAmount?: number | null;
  customerDisplayName?: string | null;
  customerPhoneNumber?: string | null;
  postId?: string | null;
  items: ShoppingCartDetailItem[];
}
