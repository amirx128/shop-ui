export interface CompareProduct {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  originalPrice?: number;
  color: string;
  features: string[];
}
