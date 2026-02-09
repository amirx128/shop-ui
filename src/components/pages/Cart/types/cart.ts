export interface CartVariant {
  label: string;
  value: string;
  color?: string;
}

export interface CartProduct {
  id: string;
  image: string;
  quantity: number;
  skuId?: string | null;
  category: string;
  name: string;
  price: number;
  variants: CartVariant[];
}
