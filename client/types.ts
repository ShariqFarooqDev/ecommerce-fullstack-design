
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  orders: number;
  shipping: string;
  image: string;
  category: string;
  stock: number;
  features: string[];
  brand: string;
  condition: 'New' | 'Used' | 'Refurbished';
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
